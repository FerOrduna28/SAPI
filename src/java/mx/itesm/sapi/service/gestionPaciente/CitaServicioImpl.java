/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.itesm.sapi.service.gestionPaciente;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import mx.itesm.sapi.bean.gestionPaciente.Cita;
import mx.itesm.sapi.util.Conexion;

/**
 *
 * @author Oscar Miranda
 */
public class CitaServicioImpl implements CitaServicio {

    @Override
    public Cita mostrarCita(int idCita) {
        Connection conn;
        CallableStatement cstmt;
        ResultSet rs;
        String stProcedure = "CALL mostrarCita";
        Cita cita = null;

        try {
            conn = Conexion.getConnection();
            cita = new Cita();
            cstmt = conn.prepareCall(stProcedure);
            cstmt.setInt(1, idCita);

            rs = cstmt.executeQuery();
            rs.next();

            cita.setIdCita(rs.getInt("idCita"));
            cita.setIdTipoCita(rs.getInt("idTipoCita"));
            cita.setIdPaciente(rs.getInt("idPaciente"));
            cita.setIdEstadoCita(rs.getInt("idEstadoCita"));
            cita.setIdImportanciaCita(rs.getInt("idImportanciaCita"));
            cita.setIdTipoTratamiento(rs.getInt("idTipoTratamiento"));
            cita.setIdEstudio(rs.getInt("idEstudio"));
            cita.setIdMotivoConsulta(rs.getInt("MotivoConsulta"));
            cita.setFechaProgramada((rs.getTimestamp("fechaProgramada")).toString());
            cita.setFechaReal((rs.getTimestamp("fechaReal")).toString());
            cita.setArchivo(rs.getBytes("archivo"));
            cita.setHospitalProcedencia(rs.getString("hospitalProcedencia"));
            cita.setFechaSolicitud((rs.getTimestamp("fechaSolicitud")).toString());

            conn.close();
            cstmt.close();
            rs.close();

        } catch (SQLException ex) {
            System.out.println(this.getClass().toString().concat(Thread.currentThread().getStackTrace()[1].getMethodName())
                    .concat(ex.getMessage()));
            cita = null;
        }
        return cita;
    }

    @Override
    public List<Cita> mostrarCita() {
        Connection conn;
        CallableStatement cstmt;
        ResultSet rs;
        String stProcedure = "CALL mostrarCita";
        List<Cita> citas = null;
        Cita cita;

        try {
            conn = Conexion.getConnection();
            cstmt = conn.prepareCall(stProcedure);
            rs = cstmt.executeQuery();
            citas = new ArrayList<>();

            while (rs.next()) {
                cita = new Cita();
                cita.setIdCita(rs.getInt("idCita"));
                cita.setIdTipoCita(rs.getInt("idTipoCita"));
                cita.setIdPaciente(rs.getInt("idPaciente"));
                cita.setIdEstadoCita(rs.getInt("idEstadoCita"));
                cita.setIdImportanciaCita(rs.getInt("idImportanciaCita"));
                cita.setIdTipoTratamiento(rs.getInt("idTipoTratamiento"));
                cita.setIdEstudio(rs.getInt("idEstudio"));
                cita.setIdMotivoConsulta(rs.getInt("MotivoConsulta"));
                cita.setFechaProgramada((rs.getTimestamp("fechaProgramada")).toString());
                cita.setFechaReal((rs.getTimestamp("fechaReal")).toString());
                cita.setArchivo(rs.getBytes("archivo"));
                cita.setHospitalProcedencia(rs.getString("hospitalProcedencia"));
                cita.setFechaSolicitud((rs.getTimestamp("fechaSolicitud")).toString());

                citas.add(cita);
            }

            conn.close();
            cstmt.close();
            rs.close();

        } catch (SQLException ex) {
            System.out.println(this.getClass().toString().concat(Thread.currentThread().getStackTrace()[1].getMethodName())
                    .concat(ex.getMessage()));
            citas = null;
        }
        return citas;
    }

    @Override
    public int agregarCita(Cita cita) {
        Connection conn;
        CallableStatement cstmt;
        ResultSet rs;
        String stProcedure = "CALL agregarCita";
        int id = -1;

        try {
            conn = Conexion.getConnection();
            cstmt = conn.prepareCall(stProcedure);

            cstmt.setInt(1, cita.getIdTipoCita());
            cstmt.setInt(2, cita.getIdPaciente());
            cstmt.setInt(3, cita.getIdEstadoCita());
            cstmt.setInt(4, cita.getIdImportanciaCita());
            cstmt.setInt(5, cita.getIdTipoTratamiento());
            cstmt.setInt(6, cita.getIdEstudio());
            cstmt.setInt(7, cita.getIdMotivoConsulta());

            try {
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.SSS");
                Date parsedDate = dateFormat.parse(cita.getFechaProgramada());
                Timestamp fechaProgramada = new java.sql.Timestamp(parsedDate.getTime());
                cstmt.setTimestamp(8, fechaProgramada);
            } catch (Exception e) { //this generic but you can control nother types of exception
                // look the origin of excption 
            }

            try {
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.SSS");
                Date parsedDate = dateFormat.parse(cita.getFechaReal());
                Timestamp fechaReal = new java.sql.Timestamp(parsedDate.getTime());
                cstmt.setTimestamp(9, fechaReal);
            } catch (Exception e) { //this generic but you can control nother types of exception
                // look the origin of excption 
            }

            cstmt.setBytes(10, cita.getArchivo());
            cstmt.setString(11, cita.getHospitalProcedencia());

            try {
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.SSS");
                Date parsedDate = dateFormat.parse(cita.getFechaSolicitud());
                Timestamp fechaSolicitud = new java.sql.Timestamp(parsedDate.getTime());
                cstmt.setTimestamp(12, fechaSolicitud);
            } catch (Exception e) { //this generic but you can control nother types of exception
                // look the origin of excption 
            }

            rs = cstmt.executeQuery();
            rs.next();

            id = rs.getInt(1);

            conn.close();
            cstmt.close();
            rs.close();

        } catch (SQLException ex) {
            System.out.println(this.getClass().toString().concat(Thread.currentThread().getStackTrace()[1].getMethodName())
                    .concat(ex.getMessage()));
            id = -1;
        }
        return id;
    }

    @Override
    public boolean borradoLogicoCita(int idCita) {
        Connection conn;
        CallableStatement cstmt;
        ResultSet rs;
        String stProcedure = "CALL borradoLogicoCita";
        boolean exito = false;

        try {
            conn = Conexion.getConnection();
            cstmt = conn.prepareCall(stProcedure);

            cstmt.setInt(1, idCita);

            rs = cstmt.executeQuery();
            rs.next();
            exito = rs.getBoolean(1);

            rs.close();
            conn.close();
            cstmt.close();
        } catch (SQLException ex) {
            System.out.println(this.getClass().toString().concat(Thread.currentThread().getStackTrace()[1].getMethodName())
                    .concat(ex.getMessage()));
            exito = false;
        }
        return exito;
    }

    @Override
    public boolean actualizarCita(Cita cita) {
        Connection conn;
        CallableStatement cstmt;
        ResultSet rs;
        String stProcedure = "CALL actualizarCita(?,?,?,?,?,?,?,?,?,?,?,?)";
        boolean exito = false;
        try {
            conn = Conexion.getConnection();
            cstmt = conn.prepareCall(stProcedure);

            cstmt.setInt(1, cita.getIdTipoCita());
            cstmt.setInt(2, cita.getIdPaciente());
            cstmt.setInt(3, cita.getIdEstadoCita());
            cstmt.setInt(4, cita.getIdImportanciaCita());
            cstmt.setInt(5, cita.getIdTipoTratamiento());
            cstmt.setInt(6, cita.getIdEstudio());
            cstmt.setInt(7, cita.getIdMotivoConsulta());
            
            try {
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.SSS");
                Date parsedDate = dateFormat.parse(cita.getFechaProgramada());
                Timestamp fechaProgramada = new java.sql.Timestamp(parsedDate.getTime());
                cstmt.setTimestamp(8, fechaProgramada);
            } catch (Exception e) { //this generic but you can control nother types of exception
                // look the origin of excption 
            }

            try {
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.SSS");
                Date parsedDate = dateFormat.parse(cita.getFechaReal());
                Timestamp fechaReal = new java.sql.Timestamp(parsedDate.getTime());
                cstmt.setTimestamp(9, fechaReal);
            } catch (Exception e) { //this generic but you can control nother types of exception
                // look the origin of excption 
            }

            cstmt.setBytes(10, cita.getArchivo());
            cstmt.setString(11, cita.getHospitalProcedencia());

            try {
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.SSS");
                Date parsedDate = dateFormat.parse(cita.getFechaSolicitud());
                Timestamp fechaSolicitud = new java.sql.Timestamp(parsedDate.getTime());
                cstmt.setTimestamp(12, fechaSolicitud);
            } catch (Exception e) { //this generic but you can control nother types of exception
                // look the origin of excption 
            }

            rs = cstmt.executeQuery();
            rs.next();
            exito = rs.getBoolean(1);

            rs.close();
            conn.close();
            cstmt.close();
        } catch (SQLException ex) {
            System.out.println(this.getClass().toString().concat(Thread.currentThread().getStackTrace()[1].getMethodName())
                    .concat(ex.getMessage()));
            exito = false;
        }
        return exito;
    }

    @Override
    public int agregarPreconsulta(Cita cita) {
        Connection conn;
        CallableStatement cstmt;
        ResultSet rs;
        String stProcedure = "CALL solicitarPreconsulta(?,?,?,?);";
        int id = -1;

        try {
            conn = Conexion.getConnection();
            cstmt = conn.prepareCall(stProcedure);

            cstmt.setInt(1, cita.getIdPaciente());
            cstmt.setInt(2, cita.getIdMotivoConsulta());
            cstmt.setString(3, cita.getHospitalProcedencia());

            try {
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.SSS");
                Date parsedDate = dateFormat.parse(cita.getFechaSolicitud());
                Timestamp fechaSolicitud = new java.sql.Timestamp(parsedDate.getTime());
                cstmt.setTimestamp(4, fechaSolicitud);
            } catch (Exception e) { //this generic but you can control nother types of exception
                // look the origin of excption 
            }
            
            rs = cstmt.executeQuery();
            rs.next();

            id = rs.getInt(1);

            conn.close();
            cstmt.close();
            rs.close();

        } catch (SQLException ex) {
            System.out.println(this.getClass().toString().concat(Thread.currentThread().getStackTrace()[1].getMethodName())
                    .concat(ex.getMessage()));
            id = -1;
        }
        return id;
    }

}

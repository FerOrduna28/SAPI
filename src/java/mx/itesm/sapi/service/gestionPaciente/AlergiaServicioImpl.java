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
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import mx.itesm.sapi.bean.gestionPaciente.Alergia;
import mx.itesm.sapi.util.Conexion;

/**
 *
 * @author urieldiaz
 */
public class AlergiaServicioImpl implements AlergiaServicio{

    @Override
    public Alergia mostrarAlergia(int idAlergia) {
        
         Connection conn;
         CallableStatement cstmt;
         ResultSet rs;
         String stProcedure = "---";
         Alergia alergia = null;
     
        try {
            conn = Conexion.getConnection();
            alergia = new Alergia();
            cstmt = conn.prepareCall(stProcedure);
            cstmt.setInt(1, idAlergia);
                  
            rs = cstmt.executeQuery();
            rs.next();
            alergia.setIdAlergia(rs.getInt("idAlergia"));
            alergia.setNombre(rs.getString("nombre"));
            
            conn.close();
            cstmt.close();
            rs.close();
            
        } catch (SQLException ex) {
           System.out.println(this.getClass().toString().concat(Thread.currentThread().getStackTrace()[1].getMethodName())
                   .concat(ex.getMessage()));
           alergia = null;
        }   
        return alergia;
    }

    @Override
    public List<Alergia> mostrarAlergia() {
        Connection conn;
	CallableStatement cstmt;
        ResultSet rs;
        String stProcedure = "---";
        List<Alergia> alergias = null;
        Alergia alergia;

	try{
            conn  = Conexion.getConnection();
            cstmt = conn.prepareCall(stProcedure);
            rs = cstmt.executeQuery();
            alergias =  new ArrayList<>();
            
            while(rs.next()){
                alergia = new Alergia();
                alergia.setIdAlergia(rs.getInt("idAlergia"));
                alergia.setNombre(rs.getString("nombre"));

                alergias.add(alergia);
            }
		
		conn.close();
		cstmt.close();
		rs.close();
                
	}catch(SQLException ex){
            System.out.println(this.getClass().toString().concat(Thread.currentThread().getStackTrace()[1].getMethodName())
                    .concat(ex.getMessage()));
            alergias = null;
	}
        return alergias;
    }

    @Override
    public int agregarAlergia(Alergia alergia) {
        Connection conn;
	CallableStatement cstmt;
        ResultSet rs;
        String stProcedure = "";
        int id = -1;
        
	try{
            conn  = Conexion.getConnection();
            cstmt = conn.prepareCall(stProcedure);
            cstmt.setString(1,alergia.getNombre());
            
            rs = cstmt.executeQuery();
            rs.next();
            id = rs.getInt("idAlergia");
                
            conn.close();
            cstmt.close();
            rs.close();
	}catch(SQLException ex){
            System.out.println(this.getClass().toString().concat(Thread.currentThread().getStackTrace()[1].getMethodName())
                    .concat(ex.getMessage()));
            id = -1;
	}
        return id;
    }

    @Override
    public boolean borradoLogicoAlergia(int idAlergia) {
        Connection conn;
	CallableStatement cstmt;
        String stProcedure = "";
        boolean exito = false;

	try{
            conn  = Conexion.getConnection();
            cstmt = conn.prepareCall(stProcedure);
            cstmt.setInt(1, idAlergia);
            cstmt.registerOutParameter(1, Types.BOOLEAN);
            
            cstmt.executeUpdate();
            exito = cstmt.getBoolean(1);
            
            
            conn.close();
            cstmt.close();
	}catch(SQLException ex){
            System.out.println(this.getClass().toString().concat(Thread.currentThread().getStackTrace()[1].getMethodName())
                    .concat(ex.getMessage()));
            exito = false;
	}
        return exito;
    }

    @Override
    public boolean actualizarAlergia(int  idAlergia) {
        Connection conn;
	CallableStatement cstmt;
        String stProcedure = "";
        boolean exito = false;

	try{
            conn  = Conexion.getConnection();
            cstmt = conn.prepareCall(stProcedure);
            cstmt.setInt(1, idAlergia);
            cstmt.registerOutParameter(1, Types.BOOLEAN);
            
            cstmt.executeUpdate();
            exito = cstmt.getBoolean(1);
            
            conn.close();
            cstmt.close();
	}catch(SQLException ex){
            System.out.println(this.getClass().toString().concat(Thread.currentThread().getStackTrace()[1].getMethodName())
                    .concat(ex.getMessage()));
            exito = false;
	}
        return exito;
    }
    
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.itesm.sapi.controller;

import com.google.gson.Gson;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Properties;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;
import mx.itesm.sapi.bean.diagnostico.RegistroDiagnostico;
import mx.itesm.sapi.bean.gestionPaciente.Cita;

import mx.itesm.sapi.bean.gestionPaciente.CitaEmpleado;
import mx.itesm.sapi.bean.gestionPaciente.ComentarioCita;
import mx.itesm.sapi.bean.gestionPaciente.DocumentoInicial;
import mx.itesm.sapi.bean.gestionPaciente.DocumentoInicialTipoDocumento;
import mx.itesm.sapi.bean.gestionPaciente.EstadoPacientePaciente;
import mx.itesm.sapi.bean.gestionPaciente.LlamadaCita;
import mx.itesm.sapi.bean.gestionPaciente.Paciente;
import mx.itesm.sapi.bean.gestionPaciente.PacienteAlergia;
import mx.itesm.sapi.bean.gestionPaciente.PacienteMedicoTitular;
import mx.itesm.sapi.bean.gestionPaciente.PacienteNavegadora;
import mx.itesm.sapi.bean.gestionPaciente.PacienteNecesidadEspecial;

import mx.itesm.sapi.bean.gestionPaciente.EstadoPacientePaciente;
import mx.itesm.sapi.bean.gestionPaciente.Paciente;
import mx.itesm.sapi.bean.gestionPaciente.PacienteMedicoTitular;

import mx.itesm.sapi.bean.persona.Cuenta;
import mx.itesm.sapi.bean.persona.Direccion;
import mx.itesm.sapi.bean.persona.InformacionGeneralPersona;
import mx.itesm.sapi.bean.persona.Login;
import mx.itesm.sapi.bean.persona.Persona;
import mx.itesm.sapi.bean.persona.Pic;
import mx.itesm.sapi.service.diagnostico.RegistroDiagnosticoServiceImpl;

import mx.itesm.sapi.service.gestionPaciente.CitaEmpleadoServicioImpl;
import mx.itesm.sapi.service.gestionPaciente.CitaServicioImpl;
import mx.itesm.sapi.service.gestionPaciente.ComentarioCitaServicioImpl;
import mx.itesm.sapi.service.gestionPaciente.DocumentoInicialServicioImpl;
import mx.itesm.sapi.service.gestionPaciente.DocumentoInicialTipoDocumentoServicioImpl;
import mx.itesm.sapi.service.gestionPaciente.EstadoPacientePacienteServiceImpl;
import mx.itesm.sapi.service.gestionPaciente.LlamadaCitaServicioImpl;
import mx.itesm.sapi.service.gestionPaciente.PacienteAlergiaServicioImpl;
import mx.itesm.sapi.service.gestionPaciente.PacienteMedicoTitularServicioImpl;
import mx.itesm.sapi.service.gestionPaciente.PacienteNavegadoraServicioImpl;
import mx.itesm.sapi.service.gestionPaciente.PacienteNecesidadEspecialServicioImpl;
import mx.itesm.sapi.service.gestionPaciente.PacienteServiceImpl;

import mx.itesm.sapi.service.gestionPaciente.CitaServicioImpl;
import mx.itesm.sapi.service.gestionPaciente.EstadoPacientePacienteServiceImpl;
import mx.itesm.sapi.service.gestionPaciente.PacienteMedicoTitularServicioImpl;

import mx.itesm.sapi.service.gestionPaciente.PacienteServicioImpl;
import mx.itesm.sapi.service.persona.CuentaServicioImpl;
import mx.itesm.sapi.service.persona.DireccionServicioImpl;
import mx.itesm.sapi.service.persona.LoginServicioImpl;
import mx.itesm.sapi.service.persona.PersonaServicioImpl;
import mx.itesm.sapi.service.persona.PicServicioImpl;
import org.apache.commons.io.IOUtils;

/**
 *
 * @author Who?
 */
@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 2, maxFileSize = 1024 * 1024 * 10, maxRequestSize = 1024 * 1024 * 50)

@WebServlet(name = "NavegadoraController", urlPatterns = {"/NavegadoraController"})
public class NavegadoraController extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");

        response.setContentType("text/html;charset=UTF-8");
        String key = request.getParameter("key");

        HttpSession sesion = request.getSession(true);

        if (sesion.getAttribute("idCuenta") == null) { //no tiene sesion iniciada
            // request.setAttribute("status", "");
            request.getRequestDispatcher("/WEB-INF/index.jsp").forward(request, response); //Lo redirecciono al login
            System.out.println("estoy en el if");
            return;
        } else {

            int keyRol = (int) sesion.getAttribute("idRol");

            switch (keyRol) {

                case 4: {

                    switch (key) {

                        case "cambiarDatos": {

                            String correo = request.getParameter("correo");
                            String telefono = request.getParameter("telefono");

                            Part part = request.getPart("file-image");

                            //No se valida el telefono ni el correo aquí? Lo validamos nosotros o el front?
                            PersonaServicioImpl personaServicioImpl = new PersonaServicioImpl();
                            Persona persona = personaServicioImpl.mostrarPersona((int) sesion.getAttribute("idPersona"));

                            if ((int) part.getSize() > 0) {
                                PicServicioImpl picServiceImpl = new PicServicioImpl();
                                Pic pic = new Pic();

                                pic.setIdPersona((int) sesion.getAttribute("idPersona"));
                                pic.setContenido(part.getInputStream());
                                pic.setTamano((int) part.getSize());
                                pic.setTipo(part.getContentType());

                                picServiceImpl.agregarPic(pic);

                                InputStream imagen = pic.getContenido();
                                byte[] bytes = IOUtils.toByteArray(imagen);
                                String base64String = Base64.getEncoder().encodeToString(bytes);

                                sesion.setAttribute("base64Img", base64String);
                                System.out.println("Debió actualizar la imagen en la sesión");
                            }

                            System.out.println("Ya pase registro");

                            persona.setCorreo(correo);
                            persona.setTelefono(telefono);

                            personaServicioImpl.actualizarPersona(persona);

                            sesion.setAttribute("correo", persona.getCorreo());
                            sesion.setAttribute("telefono", persona.getTelefono());

                            request.setAttribute("correo", sesion.getAttribute("correo"));
                            request.setAttribute("telefono", sesion.getAttribute("telefono"));

                            request.getRequestDispatcher("/WEB-INF/potencial/cuentaPaciente.jsp").forward(request, response);

                            break;
                        }

                        case "eliminarCuentaNavegadora": {
                            System.out.println("Si llego aqui navegadora");

                            /**
                             * Veo si tiene sesion iniciada
                             */
                            if (sesion.getAttribute("idCuenta") == null) { //no tiene sesion iniciada
                                // request.setAttribute("status", "");
                                request.getRequestDispatcher("/WEB-INF/index.jsp").forward(request, response);
                                /**
                                 * Lo redirecciono al login
                                 */
                                return;
                            } else {
                                /**
                                 * Elimino su cuenta (borrrado logico)
                                 */
                                /**
                                 * Obtengo los id's de sue cuenta y llogin de la
                                 * sesion
                                 */
                                int idCuenta = (int) sesion.getAttribute("idCuenta");
                                System.out.println(idCuenta);

                                CuentaServicioImpl cuentaServicio = new CuentaServicioImpl();

                                LoginServicioImpl loginServicio = new LoginServicioImpl();
                                if (loginServicio.mostrarLoginIdCuenta(idCuenta) != null) {
                                    Login login = loginServicio.mostrarLoginIdCuenta(idCuenta);
                                    loginServicio.borradoLogicoLogin(login.getIdLogin());
                                }

                                if (cuentaServicio.mostrarCuenta(idCuenta) != null) {
                                    Cuenta cuenta = cuentaServicio.mostrarCuenta(idCuenta);

                                    cuentaServicio.borradoLogicoCuenta(cuenta.getIdCuenta());
                                }

                                /**
                                 * Al no tener cuenta se le redirecciona al
                                 * login
                                 */
                                request.getRequestDispatcher("/WEB-INF/index.jsp").forward(request, response);

                            }
                            break;
                        }
                        case "cambiarContrasena": {

                            if (sesion.getAttribute("idCuenta") == null) { //no tiene sesion iniciada
                                // request.setAttribute("status", "");
                                request.getRequestDispatcher("/WEB-INF/index.jsp").forward(request, response); //Lo redirecciono al login
                                return;
                            } else {
                                int idCuenta = (int) sesion.getAttribute("idCuenta");
                                String contrasena = request.getParameter("password");
                                String contrasena2 = request.getParameter("password2");

                                if (contrasena.equals(contrasena2)) {

                                    CuentaServicioImpl cuentaServicio = new CuentaServicioImpl();

                                    Cuenta cuenta = cuentaServicio.mostrarCuenta(idCuenta);

                                    cuenta.setPassword(contrasena);

                                    cuentaServicio.actualizarCuenta(cuenta);
                                }

                            }
                            break;
           }

                        case "agregar-paciente": {

                            PrintWriter out = response.getWriter();
                            out.print("hola");

                            break;
                        }

                        case "aprobarDocumento": {
                            int idDocumentoInicial = (int) sesion.getAttribute("idDocumentoInicialVista");
                            System.out.println("Aprobar Documento");
                            System.out.println("id Documento ".concat(String.valueOf(idDocumentoInicial)));

                            DocumentoInicialServicioImpl documentoInicialServicioImpl = new DocumentoInicialServicioImpl();
                            boolean aprobado = documentoInicialServicioImpl.agregarAprobacionDocumento(idDocumentoInicial);

                            System.out.println("Se aprobo ".concat(String.valueOf(aprobado)));
                            PrintWriter out = response.getWriter();
                            out.print(aprobado);
                            break;
                        }
                        case "rechazarDocumento": {
                            //FALTA LA CORRECIÓN DE URI
                            /*
                            int idDocumentoInicial = (int) sesion.getAttribute("idDocumentoInicialVista");
                            String comentario = request.getParameter("comentario");
                            System.out.println("rechazar Documento");
                            System.out.println("id Documento ".concat(String.valueOf(idDocumentoInicial)));
                            System.out.println("motivo rechazo  ".concat(String.valueOf(comentario)));

                            DocumentoInicialServicioImpl documentoInicialServicioImpl = new DocumentoInicialServicioImpl();
                            boolean rechazado = documentoInicialServicioImpl.agregarRechazoDocumento(idDocumentoInicial, comentario);
                            //ESto es para el correo
                         
                            int pacientePotencial = (int) sesion.getAttribute("idPacientePotencialAtendido");
                            PersonaServicioImpl personaServicio = new PersonaServicioImpl();
                            Persona persona = personaServicio.mostrarPersona(pacientePotencial);
                            
                            Properties config = new Properties();
                            String correo = request.getParameter("email");
                
                            try {
                                config.load(getClass().getResourceAsStream("/mail.properties"));
                                Session session = Session.getInstance(config,
                                        new javax.mail.Authenticator() {
                                    protected PasswordAuthentication getPasswordAuthentication() {
                                        return new PasswordAuthentication("sapi.prueba@gmail.com", "prueba.Sapi1");

                                    }
                                });

                                //System.out.println("despues del try");
                                Message message = new MimeMessage(session);
                                message.setFrom(new InternetAddress("sapi.prueba@gmail.com"));
                                message.setRecipients(Message.RecipientType.TO,
                                        InternetAddress.parse(correo));
                                message.setSubject("Recuperar Conraseña");
                                //message.setText("Esto no es spam :)");

                                //Estos deberían ir como parametros dentro de la función de enviar correo
                                //String mail = "tucorreo@mail.com";
                                //String contrasena = "tucontrasena";
                                MimeBodyPart mimeBodyPart = new MimeBodyPart();
                                mimeBodyPart.setContent("<b>Estimado usuario, usted ha solicitado Recuperar su Contraseña</b></br>".
                                        concat("<b>Su token para iniciar sesion es:  ").
                                        concat(token), "text/html");

                                Multipart multipart = new MimeMultipart();
                                multipart.addBodyPart(mimeBodyPart);

                                Path path = Files.createTempFile(null, ".properties");
                                File file = new File(path.toString());

                                OutputStream outputStream = new FileOutputStream(file);
                                IOUtils.copy(getClass().getResourceAsStream("/mail.properties"), outputStream);
                                outputStream.close();

                                //Comente este attach fail porque de lo contrario no se hace bien el set content de arriba (lo de los datos de usuario)
                                // mimeBodyPart.attachFile(file);
                                message.setContent(multipart);
                                Transport.send(message);
                                request.getRequestDispatcher("/WEB-INF/index.jsp").forward(request, response);

                            } catch (Exception ex) {
                                System.out.println("catch de envia correo");
                                System.out.println(this.getClass().toString().concat(ex.getMessage()));
                         }
                            */
                            break;
                        }

                        case "descargarArchivo": {

                            int idDocumento = Integer.parseInt(request.getParameter("idDocumento"));

                            System.out.println("El documento del id es: " + idDocumento);

                            DocumentoInicialServicioImpl documentoInicialServicioImpl = new DocumentoInicialServicioImpl();
                            DocumentoInicial documentoInicial = documentoInicialServicioImpl.mostrarDocumentoInicial(idDocumento);
                            OutputStream out = response.getOutputStream();

                            if (documentoInicial.getArchivo() == null) {
                                System.out.println("valio madre");
                            } else {
                                System.out.println("si hay algo");
                            }

                            response.setContentType(documentoInicial.getTipo());

                            System.out.println(documentoInicial.getTipo());
                            response.setHeader("Content-Disposition", "attachment;filename=".concat(documentoInicial.getNombre())); //Forzar descarga

                            out.write(IOUtils.toByteArray(documentoInicial.getArchivo()));
                            out.flush();

                            break;

                        }

                        case "aprobar-paciente": {

                            int idPaciente = Integer.parseInt(request.getParameter("idPaciente"));
                            String fechaNav = request.getParameter("fechaNavegacion").concat(" 07:30:00");
                            String fechaCon = request.getParameter("fechaConsulta").concat(" 07:30:00");
                            int segundaOpinion = Integer.parseInt(request.getParameter("tipoPaciente"));

                            System.out.println(idPaciente);
                            System.out.println(fechaNav);
                            System.out.println(fechaCon);
                            System.out.println(segundaOpinion);

                            //Falta obtener los datos, y falta asignarlos en el servicio
                            CitaServicioImpl citaServicio = new CitaServicioImpl();

                            PrintWriter out = response.getWriter();

                            if (citaServicio.aprobarPaciente(idPaciente, fechaNav, fechaCon, segundaOpinion)) {
                                out.print("success");

                            }

                            break;
                        }

                        case "eliminar-paciente": {

                            int idPaciente = Integer.parseInt(request.getParameter("idPaciente"));

                            System.out.println(idPaciente);

                            PacienteServiceImpl pacienteServicio = new PacienteServiceImpl();

                            int idCuenta = pacienteServicio.obtenerCuenta(idPaciente);
                            int idPersona = pacienteServicio.obtenerPersona(idCuenta);

                            System.out.println(idPaciente);
                            System.out.println(idCuenta);
                            System.out.println(idPersona);

                            /**
                             * creo los objetos de las tablas a modificar su
                             * estatus
                             */
                            /**
                             * Se comprueba que los objetos no sean nulos o
                             * vacios para crearlos al crearlos si tienen
                             * dependencia ciclan para buscar todos los datos
                             * que tienen encadenados para proseguir con el
                             * borrado logico en la base de datos
                             */
                            CuentaServicioImpl cuentaServicio = new CuentaServicioImpl();

                            PersonaServicioImpl personaServicio = new PersonaServicioImpl();

                            Persona persona = personaServicio.mostrarPersona(idPersona);
                            personaServicio.borradoLogicoPersona(persona.getIdPersona());

                            if (pacienteServicio.mostrarPaciente(idPaciente) != null) {

                                Paciente paciente = pacienteServicio.mostrarPaciente(idPaciente);
                                pacienteServicio.borradoLogicoPaciente(paciente.getIdCuenta());
                            }

                            LoginServicioImpl loginServicio = new LoginServicioImpl();
                            if (loginServicio.mostrarLoginIdCuenta(idCuenta) != null) {
                                Login login = loginServicio.mostrarLoginIdCuenta(idCuenta);
                                loginServicio.borradoLogicoLogin(login.getIdLogin());
                            }
                            DireccionServicioImpl direccionServicio = new DireccionServicioImpl();
                            if (direccionServicio.mostrarDireccion(persona.getIdDireccion()) != null) {
                                Direccion direccion = direccionServicio.mostrarDireccion(persona.getIdDireccion());
                                direccionServicio.borradoLogicoDireccion(direccion.getIdDireccion());
                            }
                            PicServicioImpl picServicio = new PicServicioImpl();
                            if (picServicio.mostrarPic(idPersona) != null) {
                                Pic pic = picServicio.mostrarPic(idPersona);
                                picServicio.borradoLogicoPic(pic.getIdPic());
                            }
                            EstadoPacientePacienteServiceImpl estadoPacientePacienteServicio = new EstadoPacientePacienteServiceImpl();
                            if (estadoPacientePacienteServicio.mostrarEstadoPacientePacienteIdPaciente(idPaciente) != null) {
                                EstadoPacientePaciente estadoPacientePaciente = estadoPacientePacienteServicio.mostrarEstadoPacientePacienteIdPaciente(idPaciente);
                                estadoPacientePacienteServicio.borradoLogicoEstadoPacientePaciente(estadoPacientePaciente.getIdEstadoPacientePaciente());
                            }

                            CitaServicioImpl citaServicio = new CitaServicioImpl();
                            if (citaServicio.mostrarCitaIdEspecifico(idPaciente) != null) {

                                List<Cita> citas = new ArrayList<>();

                                citas = citaServicio.mostrarCitaIdEspecifico(idPaciente);
                                int citasTotales = citas.size() - 1;

                                int idCita = 0;
                                while (citasTotales > -1) {

                                    System.out.println(citasTotales);
                                    idCita = citas.get(citasTotales).getIdCita();

                                    System.out.println(idCita);

                                    ComentarioCitaServicioImpl comentarioCitaServicio = new ComentarioCitaServicioImpl();
                                    if (comentarioCitaServicio.mostrarComentarioCitaIdCita(idCita) != null) {
                                        ComentarioCita comentarioCita = comentarioCitaServicio.mostrarComentarioCitaIdCita(idCita);
                                        comentarioCitaServicio.borradoLogicoComentarioCita(comentarioCita.getIdComentarioCita());
                                    }

                                    CitaEmpleadoServicioImpl citaEmpleadoServicio = new CitaEmpleadoServicioImpl();
                                    if (citaEmpleadoServicio.mostrarCitaEmpleadoIdCita(idCita) != null) {
                                        CitaEmpleado citaEmpleado = citaEmpleadoServicio.mostrarCitaEmpleadoIdCita(idCita);
                                        citaEmpleadoServicio.borradoLogicoCitaEmpleado(citaEmpleado.getIdCitaEmpleado());
                                    }

                                    LlamadaCitaServicioImpl llamadaCitaServicio = new LlamadaCitaServicioImpl();
                                    if (llamadaCitaServicio.mostrarLlamadaCitaIdCita(idCita) != null) {
                                        LlamadaCita llamadaCita = llamadaCitaServicio.mostrarLlamadaCitaIdCita(idCita);
                                        llamadaCitaServicio.borradoLogicoLlamadaCita(llamadaCita.getIdLlamadaCita());
                                    }

                                    citaServicio.borradoLogicoCita(idCita);

                                    citasTotales = citasTotales - 1;
                                    System.out.println(citasTotales);
                                }
                            }

                            PacienteMedicoTitularServicioImpl pacienteMedicoTitularServicio = new PacienteMedicoTitularServicioImpl();
                            if (pacienteMedicoTitularServicio.mostrarPacienteMedicoTitularIdPaciente(idPaciente) != null) {
                                PacienteMedicoTitular pacienteMedicoTitular = pacienteMedicoTitularServicio.mostrarPacienteMedicoTitularIdPaciente(idPaciente);
                                pacienteMedicoTitularServicio.borradoLogicoPacienteMedicoTitular(pacienteMedicoTitular.getIdPacienteMedicoTitular());
                            }

                            PacienteNavegadoraServicioImpl pacienteNavegadoraServicio = new PacienteNavegadoraServicioImpl();
                            if (pacienteNavegadoraServicio.mostrarPacienteNavegadoraIdPaciente(idPaciente) != null) {
                                PacienteNavegadora pacienteNavegadora = pacienteNavegadoraServicio.mostrarPacienteNavegadoraIdPaciente(idPaciente);
                                pacienteNavegadoraServicio.borradoLogicoPacienteNavegadora(pacienteNavegadora.getIdPacienteNavegadora());

                            }
                            DocumentoInicialServicioImpl documentoInicialServicio = new DocumentoInicialServicioImpl();
                            if (documentoInicialServicio.mostrarDocumentoInicialIdPaciente(idPaciente) != null) {
                                DocumentoInicial documentoInicial = documentoInicialServicio.mostrarDocumentoInicialIdPaciente(idPaciente);
                                documentoInicialServicio.borradoLogicoDocumentoInicial(documentoInicial.getIdDocumentoInicial());

                            }
                            PacienteNecesidadEspecialServicioImpl pacienteNecesidadEspecialServicio = new PacienteNecesidadEspecialServicioImpl();
                            if (pacienteNecesidadEspecialServicio.mostrarPacienteNecesidadEspecialIdPaciente(idPaciente) != null) {
                                PacienteNecesidadEspecial pacienteNecesidadEspecial = pacienteNecesidadEspecialServicio.mostrarPacienteNecesidadEspecialIdPaciente(idPaciente);
                                pacienteNecesidadEspecialServicio.borradoLogicoPacienteNecesidadEspecial(pacienteNecesidadEspecial.getIdNecesidadEspecial());

                            }
                            PacienteAlergiaServicioImpl pacienteAlergiaServicio = new PacienteAlergiaServicioImpl();
                            if (pacienteAlergiaServicio.mostrarPacienteAlergiaIdPaciente(idPaciente) != null) {
                                PacienteAlergia pacienteAlergia = pacienteAlergiaServicio.mostrarPacienteAlergiaIdPaciente(idPaciente);
                                pacienteAlergiaServicio.borradoLogicoPacienteAlergia(pacienteAlergia.getIdPacienteAlergia());
                            }

                            if (cuentaServicio.mostrarCuenta(idCuenta) != null) {
                                Cuenta cuenta = cuentaServicio.mostrarCuenta(idCuenta);

                                cuentaServicio.borradoLogicoCuenta(cuenta.getIdCuenta());
                            }

                            break;

                        }

                        case "obtener-paciente": {

                            int idPaciente = Integer.parseInt(request.getParameter("idPaciente"));

                            PersonaServicioImpl personaServicio = new PersonaServicioImpl();

                            InformacionGeneralPersona datos = personaServicio.mostrarInformacionGeneralPersona(idPaciente);

                            PrintWriter out = response.getWriter();
                            out.print(new Gson().toJson(datos));

                            break;

                        }

                        case "actualizar-paciente": {

                            int idPaciente = Integer.parseInt(request.getParameter("idPaciente"));

                            InformacionGeneralPersona datos = new InformacionGeneralPersona();

                            String nombre = request.getParameter("nombre");
                            String apellido1 = request.getParameter("apellido1");
                            String apellido2 = request.getParameter("apellido2");
                            String curp = request.getParameter("curp");
                            String fechaNacimiento = request.getParameter("fechaNacimiento");
                            String usuario = request.getParameter("usuario");
                            int estadoCivil = Integer.parseInt(request.getParameter("estadoCivil"));
                            String calle = request.getParameter("calle");
                            String noInterior = request.getParameter("noInterior");
                            String noExterior = request.getParameter("noExterior");
                            int estado = Integer.parseInt(request.getParameter("estado"));
                            int municipio = Integer.parseInt(request.getParameter("municipio"));
                            String telefono = request.getParameter("telefono");
                            String correo = request.getParameter("correo");
                            String colonia = request.getParameter("colonia");
                            
                            
                            
                            Date fn = Date.valueOf(fechaNacimiento);
                            
                            datos.setNombre(nombre);
                            datos.setPrimerApellido(apellido1);
                            datos.setSegundoApellido(apellido2);
                            datos.setCurp(curp);
                            datos.setFechaNacimiento(fn);
                            datos.setUsuario(usuario);
                            datos.setIdEstadoCivil(estadoCivil);
                            datos.setCalle(calle);
                            datos.setNoInt(noInterior);
                            datos.setNoExt(noExterior);
                            datos.setIdEstado(estado);
                            datos.setIdMunicipio(municipio);
                            datos.setTelefono(telefono);
                            datos.setCorreo(correo);
                            datos.setColonia(colonia);
                            
                            PersonaServicioImpl personaServicio = new PersonaServicioImpl();
                            personaServicio.actualizarInformacionGeneralPersona(idPaciente, datos);

                            break;

                        }
                        case "btn-save":{
                           /* 
                            Para jalar un valor NORMAL
                            System.out.println("NavegadoraController, case: guardarP2");
                            String prz = request.getParameter("prz-expediente");
                            String tiene = request.getParameter("nivelEducativo");
                            String alergias = request.getParameter("alergias");
                            System.out.println("prz: "+ prz + ", tiene: "+ tiene+ " alergias: " +alergias);
                            break;                        
                            
                       
                            Para jalar contenido DINAMICO (se usa la key) y se recibe en un arreglo :D 
                            String[] Biopsia = request.getParameterValues("tipo-BiopsiaAdded");
                            String[] fechaBiopsia = request.getParameterValues("fecha-BipsiAdded");
                           
                            for(int i =0 ; i< Biopsia.length;i++){
                                System.out.println(Biopsia[i]);
                            }
                            */
                            PacienteServicioImpl pacienteServicioImpl = new PacienteServicioImpl();
                            Paciente paciente = pacienteServicioImpl.mostrarPaciente(1);
                            
                            if(request.getParameter("prz-expediente") != null){
                                 String prz = request.getParameter("prz-expediente");
                            }
                            if(request.getParameter("nivelEducativo") != null){
                                String nivelE = request.getParameter("nivelEducativo");
                            }
                            if(request.getParameter("estadoHormonal")!=null){
                                String estadoHormonal=request.getParameter("estadoHormonal"); 
                            }
                            if(request.getParameter("nivelSocioeconomico")!=null){
                                String nivelSocioeconomico = request.getParameter("nivelSocioeconomico");
                            }
                            /*
                            Aquí le vamos a meter lista de inputs:
                            
                                PRZ
                                NivelEducativo
                                Estado Hormonal
                                Nivel socioeconómico

                            
                             */

                            PacienteMedicoTitularServicioImpl pacienteMedicoTitularServicioImpl = new PacienteMedicoTitularServicioImpl();
                            PacienteMedicoTitular pacienteMedicoTitular = pacienteMedicoTitularServicioImpl.mostrarPacienteMedicoTitular(1);
                            
                            if(request.getParameter("medico-adscrito")!=null){
                                String medicoAdscrito = request.getParameter("medico-adscrito");
                            }
                            if(request.getParameter("medico-adscrito")!=null){
                                String medicoAdscrito = request.getParameter("medico-adscrito");
                            }
                            if(request.getParameter("medico-radiologo")!=null){
                                String medicoRadiologo = request.getParameter("medico-radiologo");
                            }
                            if(request.getParameter("medico-residente")!=null){
                                String medicoResidente= request.getParameter("medico-residente");
                            }
                            /*
                            
                                Medico Adscrito
                                Medico Radiologo
                                Medico Residente
                            
                            
                            */
                            EstadoPacientePacienteServiceImpl estadoPacientePacienteServicioImpl = new EstadoPacientePacienteServiceImpl();
                            EstadoPacientePaciente estadoPacientePaciente = estadoPacientePacienteServicioImpl.mostrarEstadoPacientePaciente(1);
                            
                            if(request.getParameter("tipoPaciente")!=null){
                               String tipoPaciente = request.getParameter("tipoPaciente"); 
                            }
                            if(request.getParameter("resultadosCheckbox")!=null){
                                String resultadosCheckbox= request.getParameter("resultadosCheckbox");
                            }
                            if(request.getParameter("decisionPreconsulta")!=null){
                                String descicionPreconsulta = request.getParameter("decisionPreconsulta");
                            }
                            if(request.getParameter("fecha-decisionPreconsulta")!=null){
                                String fechaDesicionPreconsulta= request.getParameter("fecha-decisionPreconsulta");
                            }
                            /*
                            
                            Tipo de Paciente
                            Resultados (checkbox)
                            Decisión preconsulta
                            Fecha desicion preconsulta :D 
                            
                            */
                            
                          
                           
                            CitaServicioImpl citaServicioImpl = new CitaServicioImpl();
                            Cita cita = citaServicioImpl.mostrarCita(1);
                            
                            if(request.getParameterValues("tipo-BiopsiaAdded") != null){
                               String[] tipoBiopsias = request.getParameterValues("tipo-BiopsiaAdded"); 
                            }
                            if(request.getParameterValues("fecha-BiopsiaAdded") != null){
                               String[] fechaBiopsias = request.getParameterValues("fecha-BiopsiaAdded"); 
                            }
                            if(request.getParameterValues("parte-BiopsiaAdded") != null){
                               String[] fechaBiopsias = request.getParameterValues("parte-BiopsiaAdded"); 
                            }
                            if(request.getParameterValues("tipo-RayosXAdded") != null){
                               String[] fechaBiopsias = request.getParameterValues("tipo-RayosXAdded"); 
                            }
                            if(request.getParameterValues("fecha-RayosXAdded") != null){
                               String[] fechaBiopsias = request.getParameterValues("fecha-RayosXAdded"); 
                            }
                            
                            if(request.getParameterValues("parteCuerpo-USGAdded") != null){
                               String[] fechaBiopsias = request.getParameterValues("parteCuerpo-USGAdded"); 
                            }
                            if(request.getParameterValues("fecha-USGAdded") != null){
                               String[] fechaBiopsias = request.getParameterValues("fecha-USGAdded"); 
                            }
                            
                            if(request.getParameterValues("mNuclear") != null){
                               String[] fechaBiopsias = request.getParameterValues("mNuclear"); 
                            }
                            if(request.getParameterValues("fecha-mNuclearAdded") != null){
                               String[] fechaBiopsias = request.getParameterValues("fecha-mNuclearAdded"); 
                            }
                            
                            if(request.getParameterValues("fecha-LaboAdded") != null){
                               String[] fechaBiopsias = request.getParameterValues("fecha-LaboAdded"); 
                            } 
                            
                            if(request.getParameterValues("valoracionAdded") != null){
                               String[] fechaBiopsias = request.getParameterValues("valoracionAdded"); 
                            }
                            if(request.getParameterValues("fecha-valoracionAdded") != null){
                               String[] fechaBiopsias = request.getParameterValues("fecha-valoracionAdded"); 
                            }
                            if(request.getParameterValues("fecha-espirometriaAdded") != null){
                               String[] fechaBiopsias = request.getParameterValues("fecha-espirometriaAdded"); 
                            }
                            /*
                            Fecha de navegacion
                            Fecha de consulta
                            
                            ESTUDIOS PRECONSULTA-->
                            Biopsia [tipo, fecha, parte de cuerpo]
                            Rayos x [tipo, fecha]
                            Ultrasonido [parteCuerpo, fecha]
                            Medicina Nuclear [mNuclear, fecha-mNuclear]
                            Laboratorio [fecha-LaboAdded]
                            Valoracion [valoracionAdded, fecha-valoracionAdded]
                            Espirometria [fecha-espirometriaAdded]
                            Electrocardiograma
                            Ecocardiograma
                            TrabajoSocial
                            */

                            
                            PacienteAlergiaServicioImpl pacienteAlergiaServicioImpl = new PacienteAlergiaServicioImpl();
                            PacienteAlergia pacienteAlergia = pacienteAlergiaServicioImpl.mostrarPacienteAlergia(1);
                            
                            if(request.getParameter("alergias") != null){
                                String alergias = request.getParameter("alergias");
                            }
                            /*
                            Alergias
                            */

                         
                            PacienteSeguroServicioImpl pacienteSeguroServicioImpl = new PacienteSeguroServicioImpl();
                            PacienteSeguro pacienteSeguro = pacienteSeguroServicioImpl.mostrarPacienteSeguro(1);
                            /*
                            Cuentas con algún seguro?
                            */

                            DocumentoEstudioServicioImpl documentoEstudioServicioImpl = new DocumentoEstudioServicioImpl();
                            DocumentoEstudio documentoEstudio = documentoEstudioServicioImpl.mostrarDocumentoEstudio(1);
                            /*
                            Mastografia
                            Ultrasonido de mama
                            Resultados de mastografía
                            Resultados del ultrasonido
                            
                            
                            
                            */

                            PacienteTratamientoPrevioServiceImpl pacienteTratamientoPrevioServiceImpl = new PacienteTratamientoPrevioServiceImpl();
                            PacienteTratamientoPrevio pacienteTratamientoPrevio = pacienteTratamientoPrevioServiceImpl.mostrarPacienteTratamientoPrevio(1);
                            /*
                            Cirugía
                            Quimioterapia
                            Radioterapia
                            */
                   
                            BiopsiaServicioImpl biopsiaServicioImpl = new BiopsiaServicioImpl();
                            Biopsia biopsia = biopsiaServicioImpl.mostrarBiopsia(1);
                            /*
                            Resultado o reporte de patologia
                            Laminillas
                            Bloques de parafina
                            Resultado Patologia
                            Grado Histológico
                            Her2
                            Fish
                            RE
                            RP
                            Ki67

                            */
                            
                            ProgramaPacienteServicioImpl programaPacienteServicioImpl = new ProgramaPacienteServicioImpl();
                            ProgramaPaciente programaPaciente = programaPacienteServicioImpl.mostrarProgramaPaciente(1);
                            /*
                            ESTUDIOS PRECONSULTA-->Programa
                            */
                            
                            
                            LlamadaCitaServicioImpl LlamadaCitaServicioImpl=new LlamadaCitaServicioImpl();
                            LlamadaCita llamadaCita=LlamadaCitaServicioImpl.mostrarLlamadaCita(1);
                            /*
                            
                            Llamada al paciente

                            */
                            
                            ComentarioCitaServicioImpl comentarioCitaServicioImpl=new ComentarioCitaServicioImpl();
                            ComentarioCita comentarioCita=comentarioCitaServicioImpl.mostrarComentarioCita(1);
                            /*
                            Comentarios y reporte de incidencias
                            Comentarios adicionales del médico
                            */
                            
                            RegistroDiagnosticoServiceImpl registroDiagnosticoServiceImpl =new RegistroDiagnosticoServiceImpl();
                            RegistroDiagnostico registroDiagnostico=registroDiagnosticoServiceImpl.mostrarRegistroDiagnostico(1);
                            /*
                            EtapaClinica
                            */
                                  
                            EstadiajeTNMServiceImpl estadiajeTNMServiceImpl=new EstadiajeTNMServiceImpl();
                            EstadiajeTNM estadiajeTNM=estadiajeTNMServiceImpl.mostrarEstadiajeTNM(1);
                            /*
                            T
                            N
                            M
                            */
                            
                            //EmpleadoServicioImpl empleadoServicioImpl = new EmpleadoServicioImpl();
                            //Empleado empleado = empleadoServicioImpl.mostrarEmpleado(1);
                        
                        }

                        case "guardarP3": {

                            break;

                        }

                    }
                    //Termina key navegadora

                    break;
                }

            }

        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

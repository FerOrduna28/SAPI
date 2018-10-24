/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.itesm.sapi.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.Base64;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import mx.itesm.sapi.bean.diagnostico.EtapaClinica;
import mx.itesm.sapi.bean.gestionPaciente.Paciente;
import mx.itesm.sapi.bean.gestionTratamiento.TipoTratamiento;
import mx.itesm.sapi.bean.gestionTratamiento.Tratamiento;
import mx.itesm.sapi.bean.persona.Persona;
import mx.itesm.sapi.bean.persona.Pic;
import mx.itesm.sapi.service.diagnostico.EtapaClinicaServiceImpl;
import mx.itesm.sapi.service.gestionPaciente.PacienteServicioImpl;
import mx.itesm.sapi.service.gestionTratamiento.TipoTratamientoServiceImpl;
import mx.itesm.sapi.service.gestionTratamiento.TratamientoServiceImpl;
import mx.itesm.sapi.service.persona.PersonaServicioImpl;
import mx.itesm.sapi.service.persona.PicServicioImpl;
import org.apache.commons.io.IOUtils;

/**
 *
 * @author quint
 */
@WebServlet(name = "FrontController", urlPatterns = {"/SAPI"})
public class FrontController extends HttpServlet {

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

        String file = request.getParameter("file");
        //System.out.println("file:".concat(file));
        if (file == null) {
            HttpSession sesion = request.getSession(true);
            if (sesion.getAttribute("idCuenta") == null) {
                request.setAttribute("status", "");
                request.getRequestDispatcher("WEB-INF/index.jsp").forward(request, response);
                return;
            } else {
                /*
                int keyRol = Integer.parseInt(sesion.getAttribute("idRol").toString());
                switch(keyRol)
                {
                    case 1:
                    {
                        request.getRequestDispatcher("WEB-INF/potencial/index.jsp").forward(request, response);
                    }
                }                
                return;
                 */
            }
        } else {
            if ("jsp".equals(file.substring(file.length() - 3))) {
                HttpSession sesion = request.getSession(true); //Veo si tiene sesion iniciada
                if (sesion.getAttribute("idCuenta") == null) { //no tiene sesion iniciada
                    // request.setAttribute("status", "");
                    request.getRequestDispatcher("/WEB-INF/index.jsp").forward(request, response); //Lo redirecciono al login
                    return;
                } else { //Si tiene sesion iniciada

                    //Lo redireciono a su rol
                    int keyRol = (int) sesion.getAttribute("idRol");
                    switch (keyRol) {
                        /*PACIENTE POTENCIAL*/
                        case 1: {
                            String keyRuta = request.getParameter("file");
                            switch (keyRuta) {

                                case "potencial/cuentaPaciente.jsp": {

                                    PersonaServicioImpl personaServiceImpl = new PersonaServicioImpl();
                                    Persona persona = personaServiceImpl.mostrarPersona((int) sesion.getAttribute("idPersona"));

                                    PacienteServicioImpl pacienteServicioImpl = new PacienteServicioImpl();
                                    Paciente paciente = pacienteServicioImpl.mostrarPacientePotencial(Integer.parseInt(sesion.getAttribute("idCuenta").toString()));

                                    sesion.setAttribute("prz", paciente.getPrz());
                                    sesion.setAttribute("correo", persona.getCorreo());
                                    sesion.setAttribute("telefono", persona.getTelefono());

                                    request.setAttribute("nombre", sesion.getAttribute("nombre"));
                                    request.setAttribute("primerApellido", sesion.getAttribute("primerApellido"));
                                    request.setAttribute("segundoApellido", sesion.getAttribute("segundoApellido"));
                                    request.setAttribute("telefono", sesion.getAttribute("telefono"));
                                    request.setAttribute("correo", sesion.getAttribute("correo"));
                                    request.setAttribute("usuario", sesion.getAttribute("usuario"));
                                    request.setAttribute("prz", sesion.getAttribute("prz"));

                                    request.getRequestDispatcher("/WEB-INF/".concat(keyRuta)).forward(request, response); //Lo redirecciono al login
                                    break;
                                }
                            }

                            break;
                        }
                        case 2: {
                            break;
                        }
                        case 3: {
                            break;
                        }
                        case 4: {
                            break;
                        }

                        /*PACIENTE EN TRATAMIENTO*/
                        case 5: {

                            String keyRuta = request.getParameter("file");
                            switch (keyRuta) {

                                case "paciente/cuenta.jsp": {

                                    PersonaServicioImpl personaServiceImpl = new PersonaServicioImpl();
                                    Persona persona = personaServiceImpl.mostrarPersona((int) sesion.getAttribute("idPersona"));

                                    PacienteServicioImpl pacienteServicioImpl = new PacienteServicioImpl();
                                    Paciente paciente = pacienteServicioImpl.mostrarPacientePotencial(Integer.parseInt(sesion.getAttribute("idCuenta").toString()));

                                   /* PicServicioImpl picServicioImpl = new PicServicioImpl();
                                    Pic pic = picServicioImpl.mostrarPic((int) sesion.getAttribute("idPersona"));

                                    InputStream imagen = pic.getContenido();
                                    byte[] bytes = IOUtils.toByteArray(imagen);
                                    String base64String = Base64.getEncoder().encodeToString(bytes);

                                    sesion.setAttribute("base64Img", base64String);
                                    
                                    */
                                    sesion.setAttribute("prz", paciente.getPrz());
                                    sesion.setAttribute("correo", persona.getCorreo());
                                    sesion.setAttribute("telefono", persona.getTelefono());

                                    request.setAttribute("nombre", sesion.getAttribute("nombre"));
                                    request.setAttribute("primerApellido", sesion.getAttribute("primerApellido"));
                                    request.setAttribute("segundoApellido", sesion.getAttribute("segundoApellido"));
                                    request.setAttribute("telefono", sesion.getAttribute("telefono"));
                                    request.setAttribute("correo", sesion.getAttribute("correo"));
                                    request.setAttribute("usuario", sesion.getAttribute("usuario"));
                                    request.setAttribute("prz", sesion.getAttribute("prz"));

                                    EtapaClinicaServiceImpl etapaServicio = new EtapaClinicaServiceImpl();
                                    TipoTratamientoServiceImpl tratamientoServicio = new TipoTratamientoServiceImpl();

                                    List<EtapaClinica> etapas = etapaServicio.mostrarEtapaClinica();
                                    List<TipoTratamiento> tratamientos = tratamientoServicio.mostrarTipoTratamiento();

                                    request.setAttribute("etapas", etapas);
                                    request.setAttribute("tratamientos", tratamientos);

                                    request.getRequestDispatcher("/WEB-INF/".concat(keyRuta)).forward(request, response); //Lo redirecciono al login
                                    break;
                                }
                            }

                            break;
                        }

                    }
                }

                //System.out.println("filename if ".concat(file));
                // request.getRequestDispatcher("WEB-INF/" + file).forward(request, response);
                // return;
            } else {

                System.out.println("filename else ".concat(file));

                request.getRequestDispatcher("/".concat(file)).forward(request, response);
                return;

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

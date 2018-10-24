/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.itesm.sapi.service.gestionPaciente;

import java.util.List;
import mx.itesm.sapi.bean.gestionPaciente.DocumentoInicial;

/**
 *
 * @author Oscar Miranda
 */
interface DocumentoInicialServicio {
    public DocumentoInicial mostrarDocumentoInicial(int idDocumentoInicial);
    public List<DocumentoInicial> mostrarDocumentoInicial();
    public int agregarDocumentoInicial(DocumentoInicial documentoInicial);
    public int agregarDocumentoInicialPreconsulta(DocumentoInicial documentoInicial);
    public boolean borradoLogicoDocumentoInicial(int idDocumentoInicial);
    public boolean actualizarDocumentoInicial(DocumentoInicial documentoInicial);
}

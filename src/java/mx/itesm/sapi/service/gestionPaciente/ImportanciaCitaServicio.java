/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.itesm.sapi.service.gestionPaciente;

import java.util.List;
import mx.itesm.sapi.bean.gestionPaciente.ImportanciaCita;

/**
 *
 * @author Uriel Díaz
 */
public interface ImportanciaCitaServicio {
    public ImportanciaCita mostrarImportanciaCita(int idImportanciaCita);
    public List<ImportanciaCita> mostrarImportanciaCita();
    public int agregarImportanciaCita(ImportanciaCita importanciaCita);
    public boolean actualizarImportanciaCita(ImportanciaCita importanciaCita);
    public boolean borradoLogicoImportanciaCita(int idImportanciaCita);
    
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.itesm.sapi.service.moduloGestionMedico;

import mx.itesm.sapi.bean.moduloGestionMedico.DepartamentoDepartamentoInterno;

/**
 *
 * @author feror
 */
public interface DepartamentoDepartamentoInternoServicio {
    
    public DepartamentoDepartamentoInterno mostrarDepartamentoDepartamentoInterno(int idDepartamentoDepartamentoInterno);
    //public List<CitaEmpleado> getCitasEmpleados();
    public int agregarDepartamentoDepartamentoInterno(DepartamentoDepartamentoInterno departamentoDepartamentoInterno);
    public boolean borradoLogicoDepartamentoDepartamentoInterno(int idDepartamentoDepartamentoInterno);
    public boolean actualizarDepartamentoDepartamentoInterno(DepartamentoDepartamentoInterno departamentoDepartamentoInterno);
    
}

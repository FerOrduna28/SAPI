/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.itesm.sapi.bean.gestionPaciente;

/**
 *
 * @author Alex
 */
public class NecesidadEspecial {
    private int idNecesidadEspecial;
    private String nombre;
    private int estatus;
    
    public NecesidadEspecial() {}

    @Override
    public String toString(){
        String str ="NecesidadEspecial [idNecesidadEspecial:".concat(String.valueOf(idNecesidadEspecial))
                .concat(",nombre:").concat(nombre)
                .concat(",estatus:").concat(String.valueOf(estatus))
                .concat("]");
        return str;
    }
    
    public int getIdNecesidadEspecial() {
        return idNecesidadEspecial;
    }

    public void setIdNecesidadEspecial(int idNecesidadEspecial) {
        this.idNecesidadEspecial = idNecesidadEspecial;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getEstatus() {
        return estatus;
    }

    public void setEstatus(int estatus) {
        this.estatus = estatus;
    }
    
}

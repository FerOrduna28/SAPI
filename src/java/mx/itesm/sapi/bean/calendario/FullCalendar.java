/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.itesm.sapi.bean.calendario;

import java.io.Serializable;

/**
 *
 * @author julioguzman
 */
public class FullCalendar implements Serializable{
    
    private int id;
    private String title;
    private String start;
    private String end;
    
    @Override
    public String toString() {
        return "FullCalendar{" + "id=" + id + ", title=" + title + ", start=" + start + ", end=" + end + '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getEnd() {
        return end;
    }

    public void setEnd(String end) {
        this.end = end;
    }
    
    
    
    
}

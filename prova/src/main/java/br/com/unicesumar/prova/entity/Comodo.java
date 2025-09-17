package br.com.unicesumar.prova.entity;

import jakarta.persistence.*;

@Entity(name = "Comodo")
@Table(name = "Comodo")
public class Comodo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer idComodo;

    private String nome;

    public Comodo(Integer idComodo, String nome) {
        this.idComodo = idComodo;
        this.nome = nome;
    }

    public Comodo() {
    }

    public Integer getIdComodo() {
        return idComodo;
    }

    public void setIdComodo(Integer idComodo) {
        this.idComodo = idComodo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}

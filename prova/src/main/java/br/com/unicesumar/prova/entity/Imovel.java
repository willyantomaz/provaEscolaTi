package br.com.unicesumar.prova.entity;

import jakarta.persistence.*;


import java.util.Date;
import java.util.List;

@Table(name = "Imovel")
@Entity(name = "Imovel")
public class Imovel {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer idImovel;

    private String descricao;

    private Date dataCompra;

    private String endereco;

    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true,fetch = FetchType.LAZY)
    private List<Comodo> comodos;

    public Comodo addComodo(String nome){
        Comodo comodo = new Comodo();
        comodo.setNome(nome);
        comodos.add(comodo);
        return comodo;
    }

    public List<Comodo> removerComodo(Integer idComodo){
        for(int i = 0; i < comodos.size(); i++){
            if(comodos.get(i).getIdComodo() == idComodo){
                comodos.remove(i);
            }
        }
        return comodos;
    }

    public Imovel(Integer idImovel, String descricao, Date dataCompra, String endereco, List<Comodo> comodos) {
        this.idImovel = idImovel;
        this.descricao = descricao;
        this.dataCompra = dataCompra;
        this.endereco = endereco;
        this.comodos = comodos;
    }

    public Imovel() {
    }

    public Integer getIdImovel() {
        return idImovel;
    }

    public void setIdImovel(Integer idImovel) {
        this.idImovel = idImovel;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Date getDataCompra() {
        return dataCompra;
    }

    public void setDataCompra(Date dataCompra) {
        this.dataCompra = dataCompra;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public List<Comodo> getComodos() {
        return comodos;
    }

    public void setComodos(List<Comodo> comodos) {
        this.comodos = comodos;
    }
}

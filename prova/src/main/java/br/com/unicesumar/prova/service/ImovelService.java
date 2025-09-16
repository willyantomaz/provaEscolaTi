package br.com.unicesumar.prova.service;

import br.com.unicesumar.prova.entity.Imovel;
import br.com.unicesumar.prova.repository.ImovelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImovelService {

    @Autowired
    private ImovelRepository imovelRepository;

    public Imovel save(Imovel imovel){
       return imovelRepository.save(imovel);
    }

    public void delete(Integer idImovel){
         imovelRepository.deleteById(idImovel);
    }

    public List<Imovel> list(){
        return imovelRepository.findAll();
    }

    public Imovel edit(Imovel imovel){
        return imovelRepository.save(imovel);
    }

    public Optional<Imovel> findById(Integer id){
        return imovelRepository.findById(id);
    }
}

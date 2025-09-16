package br.com.unicesumar.prova.service;

import br.com.unicesumar.prova.entity.Comodo;
import br.com.unicesumar.prova.repository.ComodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComodoService {

    @Autowired
    private ComodoRepository comodoRepository;

    public Comodo save(Comodo comodo){
        return comodoRepository.save(comodo);
    }

    public void delete(Integer idImovel){
        comodoRepository.deleteById(idImovel);
    }

    public List<Comodo> list(){
        return comodoRepository.findAll();
    }

    public Comodo edit(Comodo comodo){
        return comodoRepository.save(comodo);
    }

    public Optional<Comodo> findById(Integer id){
        return comodoRepository.findById(id);
    }
}

package br.com.unicesumar.prova.repository;

import br.com.unicesumar.prova.entity.Imovel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImovelRepository extends JpaRepository<Imovel,Integer> {
}

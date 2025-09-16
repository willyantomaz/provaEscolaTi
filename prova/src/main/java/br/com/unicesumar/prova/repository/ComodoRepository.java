package br.com.unicesumar.prova.repository;

import br.com.unicesumar.prova.entity.Comodo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComodoRepository extends JpaRepository<Comodo, Integer> {
}

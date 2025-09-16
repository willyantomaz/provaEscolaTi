package br.com.unicesumar.prova.controller;

import br.com.unicesumar.prova.entity.Comodo;
import br.com.unicesumar.prova.service.ComodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/comodo")
public class ComodoController {

    @Autowired
    private ComodoService comodoService;

    @GetMapping()
    public ResponseEntity<List<Comodo>> listAll(){
        return ResponseEntity.ok(comodoService.list());
    }

    @GetMapping("/{idComodo}")
    public ResponseEntity<Optional<Comodo>> findById(@RequestParam Integer idComodo){
        return ResponseEntity.ok(comodoService.findById(idComodo));
    }

    @PostMapping()
    public ResponseEntity<Comodo> save(@RequestBody Comodo comodo){
        return ResponseEntity.ok(comodoService.save(comodo));
    }

    @PutMapping()
    public ResponseEntity<Comodo> edit(@RequestBody Comodo comodo){
        return ResponseEntity.ok(comodoService.edit(comodo));
    }

    @DeleteMapping("/{idComodo}")
    public ResponseEntity<Void> delete(@RequestParam Integer idComodo){
        comodoService.delete(idComodo);
        return ResponseEntity.ok().build();
    }
}

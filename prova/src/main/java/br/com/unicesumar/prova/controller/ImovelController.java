package br.com.unicesumar.prova.controller;

import br.com.unicesumar.prova.entity.Imovel;
import br.com.unicesumar.prova.service.ImovelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/imovel")
public class ImovelController {

    @Autowired
    private ImovelService imovelService;

    @GetMapping()
    public ResponseEntity<List<Imovel>> listAll(){
        return ResponseEntity.ok(imovelService.list());
    }

    @GetMapping("/{idImovel}")
    public ResponseEntity<Optional<Imovel>> findById(@RequestParam Integer idImovel){
        return ResponseEntity.ok(imovelService.findById(idImovel));
    }

    @PostMapping()
    public ResponseEntity<Imovel> saveImovel(@RequestBody Imovel imovel){
        return ResponseEntity.ok(imovelService.save(imovel));
    }

    @PutMapping()
    public ResponseEntity<Imovel> atualizaImovel(@RequestBody Imovel imovel){
        return ResponseEntity.ok(imovelService.edit(imovel));
    }

    @DeleteMapping("/{idImovel}")
    public ResponseEntity<Void> delete(@RequestParam Integer idImovel){
        imovelService.delete(idImovel);
        return ResponseEntity.ok().build();
    }
}

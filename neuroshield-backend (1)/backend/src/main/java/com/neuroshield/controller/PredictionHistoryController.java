package com.neuroshield.controller;

import com.neuroshield.dto.PagedResponse;
import com.neuroshield.dto.PredictionHistoryRequest;
import com.neuroshield.dto.PredictionHistoryResponse;
import com.neuroshield.service.PredictionHistoryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/prediction-history")
public class PredictionHistoryController {

    private final PredictionHistoryService service;

    public PredictionHistoryController(PredictionHistoryService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<PredictionHistoryResponse> create(@Valid @RequestBody PredictionHistoryRequest request) {
        PredictionHistoryResponse created = service.create(request);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.id())
                .toUri();
        return ResponseEntity.created(location).body(created);
    }

    @GetMapping
    public PagedResponse<PredictionHistoryResponse> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return service.findAll(page, size);
    }

    @GetMapping("/{id}")
    public PredictionHistoryResponse getById(@PathVariable Long id) {
        return service.findById(id);
    }
}

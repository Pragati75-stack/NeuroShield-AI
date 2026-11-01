package com.neuroshield.service;

import com.neuroshield.dto.PagedResponse;
import com.neuroshield.dto.PredictionHistoryRequest;
import com.neuroshield.dto.PredictionHistoryResponse;
import com.neuroshield.entity.PredictionHistory;
import com.neuroshield.exception.ResourceNotFoundException;
import com.neuroshield.repository.PredictionHistoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PredictionHistoryService {

    private static final int MAX_PAGE_SIZE = 100;

    private final PredictionHistoryRepository repository;

    public PredictionHistoryService(PredictionHistoryRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public PredictionHistoryResponse create(PredictionHistoryRequest request) {
        PredictionHistory entity = new PredictionHistory(
                request.modelName().trim(),
                request.riskScore(),
                request.decisionThreshold(),
                request.predictedClass().trim(),
                request.inputData(),
                request.explanation());
        return PredictionHistoryResponse.from(repository.save(entity));
    }

    @Transactional(readOnly = true)
    public PagedResponse<PredictionHistoryResponse> findAll(int page, int size) {
        int safePage = Math.max(page, 0);
        int safeSize = Math.min(Math.max(size, 1), MAX_PAGE_SIZE);
        PageRequest pageRequest = PageRequest.of(safePage, safeSize,
                Sort.by(Sort.Direction.DESC, "createdAt").and(Sort.by(Sort.Direction.DESC, "id")));

        Page<PredictionHistory> result = repository.findAll(pageRequest);
        return new PagedResponse<>(
                result.getContent().stream().map(PredictionHistoryResponse::from).toList(),
                result.getNumber(),
                result.getSize(),
                result.getTotalElements(),
                result.getTotalPages());
    }

    @Transactional(readOnly = true)
    public PredictionHistoryResponse findById(Long id) {
        return repository.findById(id)
                .map(PredictionHistoryResponse::from)
                .orElseThrow(() -> new ResourceNotFoundException("Prediction history record not found with id " + id));
    }
}

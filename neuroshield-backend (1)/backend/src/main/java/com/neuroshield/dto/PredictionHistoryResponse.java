package com.neuroshield.dto;

import com.neuroshield.entity.PredictionHistory;

import java.time.Instant;
import java.util.Map;

public record PredictionHistoryResponse(
        Long id,
        String modelName,
        Double riskScore,
        Double decisionThreshold,
        String predictedClass,
        Map<String, Object> inputData,
        Map<String, Object> explanation,
        Instant createdAt
) {
    public static PredictionHistoryResponse from(PredictionHistory entity) {
        return new PredictionHistoryResponse(
                entity.getId(),
                entity.getModelName(),
                entity.getRiskScore(),
                entity.getDecisionThreshold(),
                entity.getPredictedClass(),
                entity.getInputData(),
                entity.getExplanation(),
                entity.getCreatedAt());
    }
}

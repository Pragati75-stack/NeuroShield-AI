package com.neuroshield.service;

import com.neuroshield.dto.ModelPredictionResult;

import java.util.Map;

/**
 * Contract for talking to the future Python FastAPI AI service
 * (model prediction, risk score and SHAP explanation).
 */
public interface ModelPredictionService {

    /**
     * Sends input health data to the AI service and returns its raw response.
     *
     * @throws com.neuroshield.exception.ModelServiceException if the service is disabled or unreachable
     */
    ModelPredictionResult predict(Map<String, Object> inputData);
}

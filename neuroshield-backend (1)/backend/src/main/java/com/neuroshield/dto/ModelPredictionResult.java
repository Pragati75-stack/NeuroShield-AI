package com.neuroshield.dto;

import com.fasterxml.jackson.databind.JsonNode;

/**
 * Raw response from the future Python AI service.
 * The response contract (field names, score, SHAP data) is not defined yet,
 * so it is kept as untouched JSON. Map it to typed fields once the contract exists.
 */
public record ModelPredictionResult(JsonNode response) {
}

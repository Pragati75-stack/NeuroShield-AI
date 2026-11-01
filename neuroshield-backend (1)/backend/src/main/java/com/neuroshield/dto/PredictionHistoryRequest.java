package com.neuroshield.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Map;

/**
 * Body of POST /api/prediction-history.
 * Risk score and threshold are validated as values between 0 and 1;
 * change these limits if your final model uses a different scale.
 */
public record PredictionHistoryRequest(
        @NotBlank @Size(max = 100) String modelName,
        @NotNull @DecimalMin("0.0") @DecimalMax("1.0") Double riskScore,
        @NotNull @DecimalMin("0.0") @DecimalMax("1.0") Double decisionThreshold,
        @NotBlank @Size(max = 50) String predictedClass,
        @NotEmpty Map<String, Object> inputData,
        Map<String, Object> explanation
) {
}

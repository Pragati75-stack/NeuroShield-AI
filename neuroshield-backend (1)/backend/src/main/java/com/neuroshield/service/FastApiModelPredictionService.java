package com.neuroshield.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.neuroshield.config.AiServiceProperties;
import com.neuroshield.dto.ModelPredictionResult;
import com.neuroshield.exception.ModelServiceException;
import org.springframework.http.MediaType;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import java.util.Map;

/**
 * HTTP client for the future FastAPI AI service.
 * Disabled by default (neuroshield.ai-service.enabled=false). No predictions are faked:
 * when disabled, calling predict() throws a ModelServiceException.
 * The request body is the input data as JSON; adapt it once the Python API contract is defined.
 */
@Service
public class FastApiModelPredictionService implements ModelPredictionService {

    private final AiServiceProperties properties;
    private final RestClient restClient;

    public FastApiModelPredictionService(AiServiceProperties properties) {
        this.properties = properties;

        if (properties.enabled()) {
            if (properties.baseUrl().isBlank() || properties.predictPath().isBlank()) {
                throw new IllegalStateException(
                        "neuroshield.ai-service.enabled=true requires base-url and predict-path to be set");
            }
            SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
            factory.setConnectTimeout(properties.connectTimeoutMs());
            factory.setReadTimeout(properties.readTimeoutMs());
            this.restClient = RestClient.builder()
                    .baseUrl(properties.baseUrl())
                    .requestFactory(factory)
                    .build();
        } else {
            this.restClient = null;
        }
    }

    @Override
    public ModelPredictionResult predict(Map<String, Object> inputData) {
        if (!properties.enabled() || restClient == null) {
            throw new ModelServiceException("AI service integration is not enabled");
        }
        try {
            JsonNode response = restClient.post()
                    .uri(properties.predictPath())
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(inputData)
                    .retrieve()
                    .body(JsonNode.class);
            return new ModelPredictionResult(response);
        } catch (RestClientException ex) {
            throw new ModelServiceException("AI service request failed: " + ex.getMessage(), ex);
        }
    }
}

package com.neuroshield.controller;

import com.neuroshield.dto.PredictionHistoryResponse;
import com.neuroshield.exception.ResourceNotFoundException;
import com.neuroshield.service.PredictionHistoryService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PredictionHistoryController.class)
class PredictionHistoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private PredictionHistoryService service;

    @Test
    void createReturns201ForValidRequest() throws Exception {
        when(service.create(any())).thenReturn(new PredictionHistoryResponse(
                1L, "test-model", 0.4, 0.5, "0", Map.of("a", 1), null, Instant.now()));

        String body = """
                {"modelName":"test-model","riskScore":0.4,"decisionThreshold":0.5,
                 "predictedClass":"0","inputData":{"a":1}}
                """;

        mockMvc.perform(post("/api/prediction-history")
                        .contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void createReturns400ForInvalidRequest() throws Exception {
        String body = """
                {"modelName":"","riskScore":5,"decisionThreshold":0.5,
                 "predictedClass":"0","inputData":{}}
                """;

        mockMvc.perform(post("/api/prediction-history")
                        .contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.fieldErrors.modelName").exists())
                .andExpect(jsonPath("$.fieldErrors.riskScore").exists());
    }

    @Test
    void getByIdReturns404WhenMissing() throws Exception {
        when(service.findById(99L)).thenThrow(new ResourceNotFoundException("not found"));

        mockMvc.perform(get("/api/prediction-history/99"))
                .andExpect(status().isNotFound());
    }
}

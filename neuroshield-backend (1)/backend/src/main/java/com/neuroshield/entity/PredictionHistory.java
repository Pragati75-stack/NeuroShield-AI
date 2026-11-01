package com.neuroshield.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Instant;
import java.util.Map;

@Entity
@Table(name = "prediction_history")
public class PredictionHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Reserved for future user accounts. Always null for now. */
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "model_name", nullable = false, length = 100)
    private String modelName;

    @Column(name = "risk_score", nullable = false)
    private Double riskScore;

    @Column(name = "decision_threshold", nullable = false)
    private Double decisionThreshold;

    @Column(name = "predicted_class", nullable = false, length = 50)
    private String predictedClass;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "input_data", nullable = false, columnDefinition = "json")
    private Map<String, Object> inputData;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "explanation", columnDefinition = "json")
    private Map<String, Object> explanation;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    protected PredictionHistory() {
        // required by JPA
    }

    public PredictionHistory(String modelName, Double riskScore, Double decisionThreshold,
                             String predictedClass, Map<String, Object> inputData,
                             Map<String, Object> explanation) {
        this.modelName = modelName;
        this.riskScore = riskScore;
        this.decisionThreshold = decisionThreshold;
        this.predictedClass = predictedClass;
        this.inputData = inputData;
        this.explanation = explanation;
    }

    @PrePersist
    void onCreate() {
        if (createdAt == null) {
            createdAt = Instant.now();
        }
    }

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public String getModelName() { return modelName; }
    public Double getRiskScore() { return riskScore; }
    public Double getDecisionThreshold() { return decisionThreshold; }
    public String getPredictedClass() { return predictedClass; }
    public Map<String, Object> getInputData() { return inputData; }
    public Map<String, Object> getExplanation() { return explanation; }
    public Instant getCreatedAt() { return createdAt; }
}

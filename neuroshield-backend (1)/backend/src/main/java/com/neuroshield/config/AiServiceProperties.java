package com.neuroshield.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.bind.DefaultValue;

/**
 * Settings for the future Python FastAPI AI service.
 * Bound from the "neuroshield.ai-service.*" properties in application.properties.
 */
@ConfigurationProperties(prefix = "neuroshield.ai-service")
public record AiServiceProperties(
        @DefaultValue("false") boolean enabled,
        @DefaultValue("") String baseUrl,
        @DefaultValue("") String predictPath,
        @DefaultValue("3000") int connectTimeoutMs,
        @DefaultValue("15000") int readTimeoutMs
) {
}

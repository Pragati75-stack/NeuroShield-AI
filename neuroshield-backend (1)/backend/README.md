# NeuroShield AI – Spring Boot Backend

Backend only (Java 21, Spring Boot 3.5.x, Maven, MySQL 8+). It does not touch the Python code, datasets, models or notebooks.

## Structure
```
backend/
├── pom.xml
├── database/schema.sql
└── src/
    ├── main/java/com/neuroshield/
    │   ├── NeuroShieldApplication.java
    │   ├── config/AiServiceProperties.java
    │   ├── controller/   HealthController, PredictionHistoryController
    │   ├── dto/          requests, responses, ErrorResponse, PagedResponse, ModelPredictionResult
    │   ├── entity/       PredictionHistory
    │   ├── exception/    GlobalExceptionHandler + custom exceptions
    │   ├── repository/   PredictionHistoryRepository
    │   └── service/      PredictionHistoryService, ModelPredictionService (+ FastAPI client, disabled by default)
    ├── main/resources/application.properties
    └── test/java/com/neuroshield/controller/
```

## 1. Add it to your repository (Windows)
1. Unzip `neuroshield-backend.zip`. It contains one folder named `backend`.
2. Copy that `backend` folder into the root of your cloned `NeuroShield-AI` repository (next to `src/`, `models/`, `notebooks/`, `README.md`).
3. Do not move files into the existing Python `src/` folder.

## 2. Java 21
1. IntelliJ: **File → Project Structure → SDKs → + → Download JDK**, choose version 21 (e.g. Temurin or Oracle), click Download.
2. **File → Settings → Build, Execution, Deployment → Build Tools → Maven → Runner**: set **JRE** to the 21 SDK.
3. After importing the backend (step 4), open **Project Structure → Modules → neuroshield-backend**, set Language level to 21.

Check in a terminal: `java -version` should print 21.

## 3. MySQL
1. Install MySQL 8+ (MySQL Installer for Windows) and remember the root password.
2. Create the database and table. Either:
   - Terminal: `mysql -u root -p < backend\database\schema.sql`
   - or MySQL Workbench: open `schema.sql` and run it (lightning icon).
3. Check: `SHOW TABLES;` inside `neuroshield_db` should list `prediction_history`.

## 4. Open backend/pom.xml as a Maven project
- Right-click `backend/pom.xml` in the Project tool window → **Add as Maven Project**.
  (If the option is missing: open the Maven tool window → **+** → select `backend/pom.xml`.)
- Wait for dependencies to download, or click the **Reload All Maven Projects** icon.

## 5. Environment variables (Run Configuration)
1. Open `NeuroShieldApplication.java`, click the green arrow next to `main` → Run once (it will fail without variables, that is fine).
2. **Run → Edit Configurations → NeuroShieldApplication**.
3. If you do not see the field: **Modify options → Environment variables**.
4. Enter (separated by `;`):
   `DB_USERNAME=root;DB_PASSWORD=your_mysql_password`
5. Optional variables:

| Variable | Default | Meaning |
|---|---|---|
| DB_HOST | localhost | MySQL host |
| DB_PORT | 3306 | MySQL port |
| DB_NAME | neuroshield_db | Database name |
| DB_USE_SSL | false | Set `true` for remote/production MySQL |
| SERVER_PORT | 8080 | Backend port |
| JPA_DDL_AUTO | none | Use `validate` to check entities against the schema |
| JPA_SHOW_SQL | false | Print SQL |
| AI_SERVICE_ENABLED | false | Enable future FastAPI integration |
| AI_SERVICE_BASE_URL | (empty) | e.g. the URL of your Python service |
| AI_SERVICE_PREDICT_PATH | (empty) | Path of the predict endpoint |

Never commit your password to Git.

## 6. Run
Click the green Run button for `NeuroShieldApplication`. The log should end with `Started NeuroShieldApplication`.
Or from a terminal in `backend/`: `mvnw` is not included, so use `mvn spring-boot:run` (needs Maven installed and the env variables set).

Run tests: `mvn test` (the tests do not need MySQL).

## 7. Test with Postman
**Health** – `GET http://localhost:8080/api/health`
```json
{ "application": "NeuroShield AI", "status": "UP", "message": "Backend is running" }
```

**Create record** – `POST http://localhost:8080/api/prediction-history`, Body → raw → JSON.
This is placeholder test data only, not real model output or real features:
```json
{
  "modelName": "example-model",
  "riskScore": 0.42,
  "decisionThreshold": 0.5,
  "predictedClass": "0",
  "inputData": { "feature_a": 1, "feature_b": 2 },
  "explanation": { "note": "example only" }
}
```
Expected: `201 Created` with a `Location` header and the saved record.

**List** – `GET http://localhost:8080/api/prediction-history?page=0&size=20` (newest first, max size 100)

**One record** – `GET http://localhost:8080/api/prediction-history/1` → `200`, or `404` if missing.

Invalid input (e.g. empty `modelName`, `riskScore` of 5) returns `400` with a `fieldErrors` object.

Notes:
- `riskScore` and `decisionThreshold` are validated to be between 0 and 1. Change this in `PredictionHistoryRequest` and `schema.sql` if your final model differs.
- `user_id` column is reserved for future accounts (no foreign key until a `users` table exists; see comments in `schema.sql`).
- Only `/actuator/health` and `/actuator/info` are exposed.

## 8. Future Python AI service
`ModelPredictionService` is the interface; `FastApiModelPredictionService` is disabled by default and never returns fake results. When your FastAPI service exists, set the three `AI_SERVICE_*` variables, adapt the request/response mapping to its contract, and call the service from a new controller.

## 9. Troubleshooting

**Maven: dependencies are red / cannot resolve**
- Reload Maven projects; check internet/proxy (**Settings → Maven**, or `~/.m2/settings.xml`).
- Delete the broken folder in `C:\Users\<you>\.m2\repository` and reload.
- Make sure the Maven JRE and Project SDK are both 21.
- `release version 21 not supported` / `invalid source release`: the SDK or Maven JRE is not 21.
- `Project 'backend' not recognised`: add it manually via Maven tool window → +.

**MySQL connection errors**
- `Could not resolve placeholder 'DB_USERNAME'`: environment variables are not set in the Run Configuration.
- `Access denied for user`: wrong username/password.
- `Communications link failure` / `Connection refused`: MySQL not running (start the MySQL80 service in Windows Services) or wrong host/port.
- `Unknown database 'neuroshield_db'`: run `schema.sql` first.
- `Public Key Retrieval is not allowed`: already handled in the URL; check the URL was not edited.
- `Table 'neuroshield_db.prediction_history' doesn't exist`: schema script was not run.
- Port 8080 busy: set `SERVER_PORT=8081`.

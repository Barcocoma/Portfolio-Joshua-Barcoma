# Docker Setup

Run the portfolio frontend and Python assistant backend together:

```bash
docker compose up --build
```

Open:

- Docker frontend: http://localhost:8080
- Docker backend health check: http://localhost:8001/health

Stop containers:

```bash
docker compose down
```

The frontend calls the backend through `VITE_API_URL`. In `docker-compose.yml`, it is set to:

```text
http://localhost:8001
```

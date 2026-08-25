FROM python:3.12-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

COPY pyproject.toml uv.lock ./
COPY app ./app

RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir "fastapi>=0.115" "uvicorn[standard]>=0.32" \
       "sqlalchemy>=2.0" "psycopg[binary]>=3.2" "pydantic-settings>=2.6" \
       "email-validator>=2.3" "pgvector>=0.3"

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

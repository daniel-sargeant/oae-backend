FROM postgres:16-alpine

# Set environment variables for PostgreSQL
ENV POSTGRES_DB=posts
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

COPY init.sql /docker-entrypoint-initdb.d/
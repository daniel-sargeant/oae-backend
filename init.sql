CREATE TABLE posts (
    id UUID PRIMARY KEY default gen_random_uuid(),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    content TEXT
);
INSERT INTO posts (created_at) VALUES (NOW());
CREATE TABLE ai_config (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    system_prompt TEXT NOT NULL,
    model         VARCHAR(100) NOT NULL DEFAULT 'llama-3.3-70b-versatile',
    language      VARCHAR(30) NOT NULL DEFAULT 'english',
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS resources (
    id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title          VARCHAR(500) NOT NULL,
    file_url       TEXT NOT NULL,
    category       VARCHAR(100) NOT NULL DEFAULT 'General',
    description    TEXT,
    download_count INTEGER NOT NULL DEFAULT 0,
    active         BOOLEAN NOT NULL DEFAULT TRUE,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
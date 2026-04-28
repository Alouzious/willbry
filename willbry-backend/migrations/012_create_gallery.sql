CREATE TABLE gallery_images (
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    url        TEXT NOT NULL,
    caption    TEXT,
    category   VARCHAR(100) NOT NULL DEFAULT 'General',
    active     BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
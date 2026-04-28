CREATE TABLE blog_posts (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title       VARCHAR(500) NOT NULL,
    slug        VARCHAR(500) NOT NULL UNIQUE,
    content     TEXT NOT NULL,
    excerpt     TEXT,
    author_id   UUID NOT NULL REFERENCES users(id),
    category    VARCHAR(100) NOT NULL DEFAULT 'General',
    cover_image TEXT,
    published   BOOLEAN NOT NULL DEFAULT FALSE,
    views       INTEGER NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_blog_slug ON blog_posts(slug);
CREATE INDEX idx_blog_published ON blog_posts(published);
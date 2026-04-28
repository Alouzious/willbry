CREATE TABLE bookings (
    id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id        UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    service_type   VARCHAR(200) NOT NULL,
    preferred_date DATE,
    description    TEXT NOT NULL,
    status         VARCHAR(30) NOT NULL DEFAULT 'requested',
    admin_notes    TEXT,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_status ON bookings(status);
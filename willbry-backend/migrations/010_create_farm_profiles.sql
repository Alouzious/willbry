CREATE TABLE farm_profiles (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    district    VARCHAR(100) NOT NULL,
    size_acres  DOUBLE PRECISION,
    crops       TEXT NOT NULL DEFAULT '',
    irrigation  VARCHAR(100),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE crop_logs (
    id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_profile_id  UUID NOT NULL REFERENCES farm_profiles(id) ON DELETE CASCADE,
    crop             VARCHAR(100) NOT NULL,
    planted_date     DATE,
    expected_harvest DATE,
    actual_harvest   DATE,
    yield_kg         DOUBLE PRECISION,
    notes            TEXT,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
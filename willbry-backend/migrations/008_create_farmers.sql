CREATE TABLE farmers (
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name       VARCHAR(255) NOT NULL,
    location   VARCHAR(255) NOT NULL,
    district   VARCHAR(100) NOT NULL,
    crops      VARCHAR(500) NOT NULL,
    phone      VARCHAR(30),
    email      VARCHAR(255),
    active     BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_farmers_district ON farmers(district);

INSERT INTO farmers (id, name, location, district, crops, phone) VALUES
(uuid_generate_v4(), 'Tumwesigye John', 'Kigezi', 'Kabale', 'Irish potatoes, beans', '+256 700 000001'),
(uuid_generate_v4(), 'Akankwasa Mary', 'Rubanda', 'Kabale', 'Coffee, maize', '+256 700 000002'),
(uuid_generate_v4(), 'Barigye Peter', 'Rukiga', 'Kabale', 'Sorghum, beans, potatoes', '+256 700 000003');
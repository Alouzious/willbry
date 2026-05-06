FROM rust:1.78 as builder
WORKDIR /app
COPY . .
RUN cargo build --release

FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y ca-certificates libssl3 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=builder /app/target/release/willbry-backend .
COPY --from=builder /app/migrations ./migrations
EXPOSE 8080
CMD ["./willbry-backend"]

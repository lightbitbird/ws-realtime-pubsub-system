# ws-realtime-pubsub-system

A real time pubsub system using websocket and redis

## Build and Run

```
# Make .env file by copying .env.example file.
cp .env.example .env

# check IP Address in your environment.
ifconfig

# Open .env and replace the ENV_HOST value into your IP Address.
# Example: ENV_HOST=192.168.xxx.xxx
vim .env

# Build the docker environments.
docker-compose build --no-cache

# Run this service.
docker-compose up -d
```

Open a browser with http://localhost:8008 after docker-compose up.

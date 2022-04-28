#!/usr/bin/env bash

docker build -t unque .
docker run -p 3000:3000 --name unque_frontend -d unque

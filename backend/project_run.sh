#!/usr/bin/env bash

echo "\$docker run -p 8081:8080 -v "$(pwd)/share_data":/usr/src/app 9900-project:latest "
docker run -d -p 8081:8080 -v "$(pwd)/share_data":/usr/src/app --name 9900-project 9900-project:latest

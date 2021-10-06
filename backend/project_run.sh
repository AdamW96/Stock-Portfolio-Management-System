#!/usr/bin/env bash

echo "\$docker run -p 8081:8080 -v \"\$(pwd)/share_data\":/usr/src/app --name 9900-project registry.cn-qingdao.aliyuncs.com/unsw/9090-project:latest"
docker run -d -p 8081:8080 -v "$(pwd)/share_data":/usr/src/app --name 9900-project registry.cn-qingdao.aliyuncs.com/unsw/9090-project:latest

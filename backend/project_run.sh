#!/usr/bin/env bash

if [ "$1" = "local" ];then
echo "run in local mode"
else
echo "\$docker pull registry.cn-qingdao.aliyuncs.com/unsw/9090-project:latest"
docker pull registry.cn-qingdao.aliyuncs.com/unsw/9090-project:latest
fi

echo "\$docker run -p 8081:8080 -v \"\$(pwd)/share_data\":/usr/src/app --name 9900-project registry.cn-qingdao.aliyuncs.com/unsw/9090-project:latest"
docker run -d -p 8081:8080 -v "$(pwd)/share_data":/usr/src/app --name 9900-project registry.cn-qingdao.aliyuncs.com/unsw/9090-project:latest

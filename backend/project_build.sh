#!/usr/bin/env bash

echo "\$mvn package"
mvn package || { echo "error when build jar"; exit 1; }

echo "\$docker build -t registry.cn-qingdao.aliyuncs.com/unsw/9090-project ."
docker build -t registry.cn-qingdao.aliyuncs.com/unsw/9090-project .

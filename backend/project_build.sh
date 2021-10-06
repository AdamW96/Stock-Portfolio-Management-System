#!/usr/bin/env bash

echo "\$mvn package"
mvn package

echo "\$docker build -t registry.cn-qingdao.aliyuncs.com/unsw/9090-project ."
docker build -t registry.cn-qingdao.aliyuncs.com/unsw/9090-project .

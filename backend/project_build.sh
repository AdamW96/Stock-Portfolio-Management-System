#!/usr/bin/env bash

echo "\$mvn package"
mvn package

echo "\$docker build -t 9900-project ."
docker build -t 9900-project .

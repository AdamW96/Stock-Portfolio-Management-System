#!/usr/bin/env bash

rm -rf /usr/src/app
cp -r . /usr/src/app

cd /usr/src/app

echo "\$pwd"
pwd

echo "\$java -jar 900-project-test.jar"
java -jar 9900-project-test.jar

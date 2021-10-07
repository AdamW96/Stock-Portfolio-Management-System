#!/usr/bin/env bash

# /usr/src/app is share_data dir
rm /usr/src/app/9900-project.log
cp 9900-project-test.jar /usr/src/app/9900-project-test.jar
cp start.sh /usr/src/app/start.sh

if [ -f "./9900-test-db.sqlite" ];then
  echo "use shared_data db"
  else
  echo "use initialized db"
  cp 9900-test-db.sqlite /usr/src/app/9900-test-db.sqlite
fi

cd /usr/src/app

echo "\$pwd"
pwd

echo "\$java -jar 9900-project-test.jar"
java -jar 9900-project-test.jar

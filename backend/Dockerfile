FROM openjdk:11

COPY target/9900-project-test.jar /usr/src/project/9900-project-test.jar
COPY 9900-test-db.sqlite /usr/src/project/9900-test-db.sqlite
COPY start.sh /usr/src/project/start.sh

WORKDIR /usr/src/project

RUN chmod 777 start.sh
CMD ./start.sh

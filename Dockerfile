FROM tomcat:9.0-jdk11
COPY src/main/webapp/ /usr/local/tomcat/webapps/ROOT/

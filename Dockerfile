FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/*.war app.war
EXPOSE 8090
ENTRYPOINT ["java", "-jar", "app.jar"]

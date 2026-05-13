FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
RUN echo "spring.application.name=adminBackendUE\nserver.port=8080\nspring.jpa.hibernate.ddl-auto=update\nspring.jpa.show-sql=true\nspring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect" > src/main/resources/application.properties
RUN mvn clean package -DskipTests


FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
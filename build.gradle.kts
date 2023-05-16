plugins {
	java
	id("org.springframework.boot") version "3.0.6"
	id("io.spring.dependency-management") version "1.1.0"
}

group = "io.github.kahenteikou.quizapp.web"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_17

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-web")
	// https://mvnrepository.com/artifact/org.springdoc/springdoc-openapi-ui
	implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.1.0")


	compileOnly ("org.projectlombok:lombok:1.18.26")
	annotationProcessor ("org.projectlombok:lombok:1.18.26")
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	// https://mvnrepository.com/artifact/org.mariadb.jdbc/mariadb-java-client
	implementation("org.mariadb.jdbc:mariadb-java-client:3.1.4")

	testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.withType<Test> {
	useJUnitPlatform()
}

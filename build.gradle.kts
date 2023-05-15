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
// https://mvnrepository.com/artifact/org.mybatis/mybatis
	implementation("org.mybatis:mybatis:3.5.13")
	// https://mvnrepository.com/artifact/org.xerial/sqlite-jdbc
	implementation("org.xerial:sqlite-jdbc:3.41.2.1")
// https://mvnrepository.com/artifact/com.enigmabridge/hibernate4-sqlite-dialect
	implementation("com.enigmabridge:hibernate4-sqlite-dialect:0.1.2")



	testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.withType<Test> {
	useJUnitPlatform()
}

pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'main''https://github.com/im-devendhar/POC-10.git'
            }
        }
        stage('Build') {
            steps {
                sh 'mvn clean install'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarQubeScanner'
                    withSonarQubeEnv('SonarQubeServer') { 
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }
        stage('Docker Build & Push') {
            steps {
                script {
                    docker.build("devenops641/poc10-app").push("latest")
                }
            }
        }
    }

    post { 
        always { 
            cleanWs()
        } 
    }    
}


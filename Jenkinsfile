pipeline {
    agent any
    environment {
        IMAGE_NAME = 'devenops641/poc10'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/im-devendhar/POC-10.git'

            }
        }
        stage('Code Analysis') {
            steps {
                sh 'sonar-scanner'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }
        stage('Push to Docker Hub') {
            steps {
                sh '''
                    echo DevDocker | docker login -u devenops641 --password-stdin
                    docker push $IMAGE_NAME
                '''
            }
        }
        stage('Deploy') {
            steps {
                docker run -d -p 8000:8000 $IMAGE_NAME

            }
        }
    }
}

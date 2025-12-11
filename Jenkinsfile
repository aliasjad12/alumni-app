pipeline {
    agent any
    environment {
        EC2_USER = "ubuntu"
        EC2_IP = "3.110.118.11"
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-id')
    }
    stages {
        stage('Checkout') {
            steps { git branch: 'main', url: 'https://github.com/aliasjad12/alumni-app.git' }
        }
        stage('Build Backend') {
            steps { dir('backend') { sh 'docker build -t aliasjad12/alumni-backend:latest .' } }
        }
        stage('Build Frontend') {
            steps { dir('frontend') { sh 'docker build -t aliasjad12/alumni-frontend:latest .' } }
        }
        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-id', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
                sh 'docker push aliasjad12/alumni-backend:latest'
                sh 'docker push aliasjad12/alumni-frontend:latest'
            }
        }
        stage('Deploy to EC2') {
            steps {
                sshagent (credentials: ['ec2-ssh']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no $EC2_USER@$EC2_IP '
                        cd alumni-app &&
                        git pull &&
                        docker-compose down &&
                        docker-compose pull &&
                        docker-compose up -d
                    '
                    """
                }
            }
        }
    }
}

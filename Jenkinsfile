pipeline {
    agent any
    environment {
        DOCKER_IMAGE_BACKEND = "us-central1-docker.pkg.dev/optimal-waters-446108-c1/my-app/backend"
        DOCKER_IMAGE_FRONTEND = "us-central1-docker.pkg.dev/optimal-waters-446108-c1/my-app/frontend"
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'with-terraform-pipeline-support',
                    url: 'https://github.com/eldadmwangi/kubernetes_deployment'
            }
        }
        stage('Build Docker Images') {
            parallel {
                stage('Build Backend Image') {
                    steps {
                        script {
                            sh """
                            docker build \
                                --platform linux/amd64 \
                                --build-arg NODE_ENV=production \
                                --no-cache \
                                -t ${DOCKER_IMAGE_BACKEND} \
                                ./backend
                            """
                        }
                    }
                }
                stage('Build Frontend Image') {
                    steps {
                        script {
                            sh """
                            docker build \
                                --platform linux/amd64 \
                                --build-arg NODE_ENV=production \
                                --no-cache \
                                -t ${DOCKER_IMAGE_FRONTEND} \
                                ./frontend
                            """
                        }
                    }
                }
            }
        }
        stage('Push Docker Images') {
            parallel {
                stage('Push Backend Image') {
                    steps {
                        script {
                            sh "docker push ${DOCKER_IMAGE_BACKEND}"
                        }
                    }
                }
                stage('Push Frontend Image') {
                    steps {
                        script {
                            sh "docker push ${DOCKER_IMAGE_FRONTEND}"
                        }
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh """
                    kubectl apply -f k8s-deployment.yml
                    """
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline has completed!'
        }
        failure {
            echo 'Pipeline has failed!'
        }
    }
}

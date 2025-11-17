pipeline {
  agent any
  environment {
    NODE_ENV = 'production'
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }
    stage('Test auth-service') {
      steps {
        dir('auth-service') {
          sh 'npm test'
        }
      }
    }
    stage('Test route-service') {
      steps {
        dir('route-service') {
          sh 'npm test'
        }
      }
    }
    stage('Build both services') {
      steps {
        sh 'npm run build'
      }
    }
    stage('Archive artifacts') {
      steps {
        archiveArtifacts artifacts: 'auth-service/dist/**, route-service/dist/**', fingerprint: true
      }
    }
    stage('Optional: Docker build') {
      when {
        expression { return env.BUILD_DOCKER == "true" }
      }
      steps {
        sh '''
          docker build -t krazybus/auth-service:latest auth-service
          docker build -t krazybus/route-service:latest route-service
        '''
      }
    }
  }
  post {
    success { echo 'Pipeline succeeded' }
    failure { echo 'Pipeline failed' }
  }
}

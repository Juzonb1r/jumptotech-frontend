pipeline {
  agent any

  environment {
    DOCKERHUB_USER = "juzonb1r"
    IMAGE_NAME     = "jumptotech-frontend"
    GITOPS_REPO    = "https://github.com/Juzonb1r/jumptotech-gitops.git"
    GITOPS_BRANCH  = "main"
    GITOPS_FILE    = "dev/manifests/08-frontend.yaml"
  }

  stages {
    stage('Checkout frontend repo') {
      steps {
        checkout scm
        sh 'git rev-parse --short HEAD > .gitsha'
        sh 'echo "Frontend GIT SHA: $(cat .gitsha)"'
      }
    }

    stage('Build Docker image') {
      steps {
        script {
          def sha = readFile('.gitsha').trim()
          sh """
            set -e
            echo "Building image ${DOCKERHUB_USER}/${IMAGE_NAME}:${sha}"
            docker build -t ${DOCKERHUB_USER}/${IMAGE_NAME}:${sha} .
          """
        }
      }
    }

    stage('Push Docker image') {
      steps {
        script {
          def sha = readFile('.gitsha').trim()

          withCredentials([usernamePassword(
            credentialsId: 'dockerhub-creds',
            usernameVariable: 'DOCKER_USER',
            passwordVariable: 'DOCKER_PASS'
          )]) {
            sh """
              set -e
              echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
              docker push ${DOCKERHUB_USER}/${IMAGE_NAME}:${sha}
              docker logout
            """
          }
        }
      }
    }

    stage('Update GitOps repo') {
      steps {
        script {
          def sha = readFile('.gitsha').trim()

          withCredentials([string(credentialsId: 'github-gitops-token', variable: 'GITHUB_TOKEN')]) {
            sh """
              set -e
              rm -rf gitops

              git clone --branch ${GITOPS_BRANCH} https://x-access-token:${GITHUB_TOKEN}@github.com/Juzonb1r/jumptotech-gitops.git gitops

              cd gitops

              git config user.email "jenkins@jumptotech.local"
              git config user.name "Jenkins CI"

              echo "Updating ${GITOPS_FILE} with tag ${sha}"

              sed -i.bak 's#image: .*#image: ${DOCKERHUB_USER}/${IMAGE_NAME}:${sha}#' ${GITOPS_FILE}
              rm -f ${GITOPS_FILE}.bak

              echo "Updated file content:"
              cat ${GITOPS_FILE}

              git add ${GITOPS_FILE}
              git commit -m "frontend: bump image to ${sha}" || echo "No changes to commit"
              git push origin ${GITOPS_BRANCH}
            """
          }
        }
      }
    }
  }

  post {
    always {
      sh 'docker image prune -f || true'
    }
    success {
      echo 'Frontend pipeline finished successfully. ArgoCD should sync new image.'
    }
    failure {
      echo 'Frontend pipeline failed.'
    }
  }
}

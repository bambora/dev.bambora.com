#!groovy

node("!master") {
  checkout scm

  stage name: 'Build slate image'
  sh "docker build -t dev.bambora.com ."

  stage name: 'Build static web content'
  sh "docker run --rm -v \"\$PWD\":/app dev.bambora.com rake build"

  if (env.BRANCH_NAME == "master") {
    stage name: 'Publish to S3'
    sh "echo publish to s3.."
  }
}

#!groovy

node('docker-concurrent') {
    checkout scm

    stage 'parameters'
    sh 'git rev-parse --short HEAD | tee version'
    env.VERSION = 'commit_' + readFile('version').trim()

    stage name: 'Build slate image'
    sh "docker build -t dev.bambora.com:${env.VERSION} ."

    stage name: 'Build static web content'
    sh "docker run -v \"\$PWD\"/build:/usr/src/app/build dev.bambora.com:${env.VERSION} static"

    if (env.BRANCH_NAME == "master") {
        stage name: 'Publish to S3'
        sh "aws --region eu-west-1 s3 sync --acl=public-read \"\$PWD\"/build/ s3://dev.bambora.com/"
    }
}

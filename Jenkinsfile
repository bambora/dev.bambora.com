#!groovy

node('!master && amazon-linux-64bit-generic') {
    checkout scm

    stage name: 'Build slate image'
    sh "docker build -t dev.bambora.com ."

    stage name: 'Build static web content'
    sh "docker run -v \"\$PWD\"/build:/usr/src/app/public dev.bambora.com static"

    if (env.BRANCH_NAME == "master") {
        stage name: 'Publish to S3'
        sh "aws --region eu-west-1 s3 cp --recursive --acl=public-read \"\$PWD\"/build/build s3://dev.bambora.com/"
        sh "aws --region eu-west-1 s3 cp --recursive --acl=public-read \"\$PWD\"/build/api s3://dev.bambora.com/api"
    }
}

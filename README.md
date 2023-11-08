# Serverless contact form utilizing AWS and Terraform

This repository hosts a simple frontend web application with a contact form, designed to run on AWS's serverless architecture. It leverages Amazon Simple Email Service, AWS Lambda, API Gateway, S3 and CloudFront. The infrastructure is provisioned and managed using Terraform, allowing you to easily deploy and maintain your serverless contact form app on AWS.

The website includes a contact form that users can utilize. The data from the contact form is sent to an API Gateway, which then directs it to a Lambda function. The Lambda function leverages Amazon Simple Email Service to forward the contents of the contact form to the charity's administrators.

![diagram](assets/diagram.png)

## Terraform modules

## API Gateway

TODO change localhost? Explain CORS options

## Lambda

The Lambda code can be fine in aws-lambda -directory. For this code to work, you have to do the following changes:
- change the region to your preferred region
- add your custom domain to 'Access-Control-Allow-Origin' (unless running React app on localhost)
- change to - and source -addresses accordingly

Please note the email addresses have to be added and approved via the AWS SES console for the SES to use them.

## ACM Certificate

TODO  

## Set up

To run this project, you need to install React, Mantine UI, AWS CLI and Terraform.

## Instructions

To deploy the application, the following steps have to be completed in order. Please note, the below instructions work only if you're application is deployed on a custom domain. For other kinds of setups, such as using CloudFront URL, the CORS settings and order of deployment would have to be modified. Alternatively, you can run the React application locally and leave the CORS settings to default 'http://localhost:3000'.

1. Create an S3 bucket either in AWS console and using AWS CLI. Upload the zipped Lambda code into the S3 bucket either using AWS console or AWS CLI. The name of this S3 bucket has to be referred to on the Lambda resource code. 
2. Create a workspace on Terraform code and add the workspace name together with you organization name to 'main.tf'. Run 'terraform apply' to deploy the Terraform code. This will create for you and S3 bucket, CloudFront distribution, API Gateway and Lambda.
3. Add the URL of the AWS API Gateway to the React app's contact-form component. Build the React app with command ``npm run build``. The contents of the build folder have to be uploaded to the new S3 bucket that Terraform has created either using the AWS console or AWS CLI. 

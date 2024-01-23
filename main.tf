terraform {
  cloud {
    organization = "MyOrganization" #Add here your organization
    workspaces {
      name = "contact-form" #Add here your workspace name
    }
  }
}

provider "aws" {
  region = "eu-west-2" #Add here your region
}

# This module can be added to deploy the frontend with AWS S3 and CloudFront
#module "frontend-aws" {
#  source = "./modules/frontend-aws"
#  build_path = var.contact-form.build_path
#  content_version = var.contact-form.content_version
#}

module "serverless-backend-aws" {
  source = "./modules/serverless-backend-aws"
}

module "cors" {
  source = "squidfunk/api-gateway-enable-cors/aws"
  version = "0.3.3"

  api_id          = module.serverless-backend-aws.api_gateway_contact_form.id
  api_resource_id = module.serverless-backend-aws.api_gateway_contact_form.root_resource_id
  allow_headers = ["Content-Type"]
  allow_methods = ["OPTIONS", "POST"]
  allow_origin = "http://localhost:5173" #Change to your custom domain if applicable
}
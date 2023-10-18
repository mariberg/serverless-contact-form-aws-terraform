terraform {
  cloud {
    organization = "Marika"
    workspaces {
      name = "contact-form"
    }
  }
}

provider "aws" {
  region = "eu-west-2"
  assume_role {
    role_arn = "arn:aws:iam::557443467949:role/terraform_role"
    session_name = "terraform-session"

  } 
}

module "frontend-aws" {
  source = "./modules/frontend-aws"
  build_path = var.contact-form.build_path
  content_version = var.contact-form.content_version
}
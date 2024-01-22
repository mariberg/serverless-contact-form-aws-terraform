output "api_gateway_url" {
    description = "Bucket name for our static website hosting"
    value = module.serverless-backend-aws.api_gateway_url
}

#output "cloudfront_url" {
#  description = "The cloudfront distribution domain name"
#  value = module.frontend-aws.domain_name
#}
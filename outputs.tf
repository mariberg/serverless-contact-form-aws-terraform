output "bucket_name" {
    description = "Bucket name for our static website hosting"
    value = module.frontend-aws.bucket_name
}


output "cloudfront_url" {
  description = "The cloudfront distribution domain name"
  value = module.frontend-aws.domain_name
}
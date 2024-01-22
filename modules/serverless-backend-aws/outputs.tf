output "api_gateway_contact_form" {
  value = aws_api_gateway_rest_api.serverless-contact-form-api
}

#output "contact_form_lambda" {
#  value = aws_lambda_function.serverless-contact-form-lambda
#}

output "api_gateway_url" {
  value = aws_api_gateway_deployment.test.invoke_url
}
output "api_gateway" {
  value = aws_api_gateway_rest_api.contact-form-api
}

output "contact_form_lambda" {
  value = aws_lambda_function.contact-form  
}
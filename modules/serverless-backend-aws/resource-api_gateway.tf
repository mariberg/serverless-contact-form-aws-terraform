# needed in CORS ---- ../frontend-aws.domain_name


# API Gateway
resource "aws_api_gateway_rest_api" "contact-form-api" {
  name = "contact-form-api"
  description = "API Gateway for the serverless contact form"
}

# The AWS_PROXY integration type causes API gateway to call into the API of another AWS service. In this case, it will call the AWS Lambda API to create an "invocation" of the Lambda function.
resource "aws_api_gateway_integration" "lambda" {
  rest_api_id = "${aws_api_gateway_rest_api.contact-form-api.id}"
  resource_id = "${aws_api_gateway_method.proxy_root.resource_id}" 
  http_method = "${aws_api_gateway_method.proxy_root.http_method}" 

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.contact-form.invoke_arn}" #!!!!!!!!!!!!!!!!!!!!!!1Reference to undeclared resource
}

resource "aws_api_gateway_method" "proxy_root" {
  rest_api_id   = "${aws_api_gateway_rest_api.contact-form-api.id}"
  resource_id   = "${aws_api_gateway_rest_api.contact-form-api.root_resource_id}"
  http_method   = "POST" #POST OR ANY?
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda_root" {
  rest_api_id = "${aws_api_gateway_rest_api.contact-form-api.id}"
  resource_id = "${aws_api_gateway_method.proxy_root.resource_id}"
  http_method = "${aws_api_gateway_method.proxy_root.http_method}"

  integration_http_method = "POST" #OPTIONS?
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.contact-form.invoke_arn}" 
}

resource "aws_api_gateway_deployment" "test" {
  depends_on = [
    "aws_api_gateway_integration.lambda",
    "aws_api_gateway_integration.lambda_root",
  ]

  rest_api_id = "${aws_api_gateway_rest_api.contact-form-api.id}"
  stage_name  = "test"
}


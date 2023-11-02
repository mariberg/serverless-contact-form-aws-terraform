resource "aws_lambda_function" "contact-form" {
  function_name = "ContactFormEmail"

  # The bucket name as created earlier with "aws s3api create-bucket"
  s3_bucket = "contact-form-lambda-code"
  s3_key    = "lambda.zip"

  # "main" is the filename within the zip file (main.js) and "handler"
  # is the name of the property under which the handler function was
  # exported in that file.
  handler = "index.handler"
  runtime = "nodejs18.x"

  role = "${aws_iam_role.lambda_exec.arn}"
}

# IAM role which dictates what other AWS services the Lambda function
# may access.
resource "aws_iam_role" "lambda_exec" {
  name = "serverless_contact_form_lambda"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
# inline policy in order to access ses
 inline_policy {
    name = "SESPermissionsPolicy"
    #description = "Allows sending email via SES"
    policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ses:SendEmail",
        "ses:SendRawEmail"
      ],
      "Resource": "*"
    }
  ]
}
EOF
  }
}





#resource "aws_api_gateway_resource" "proxy" {
#  rest_api_id = "${aws_api_gateay_rest_api.contact-form-api.id}" #!!!!!!!!!!!!!!!!!!1Reference to undeclared resource
#  parent_id   = "${aws_api_gateay_rest_api.contact-form-api.root_resource_id}" #!!!!!!!!!!!!!!!!!!!!!!!!!!Reference to undeclared resource
#  path_part   = "{proxy+}"
#}

#resource "aws_api_gateway_method" "proxy" {
#  rest_api_id   = "${aws_api_gateay_rest_api.contact-form-api.id}"
#  resource_id   = "${aws_api_gateway_resource.proxy.id}"
#  http_method   = "POST"
#  authorization = "NONE"
#}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.contact-form.function_name}"
  principal     = "apigateway.amazonaws.com"

  # The /*/* portion grants access from any method on any resource
  # within the API Gateway "REST API".
  source_arn = "${aws_api_gateway_rest_api.contact-form-api.execution_arn}/*/*" 
}


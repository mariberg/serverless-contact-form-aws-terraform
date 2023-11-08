resource "aws_lambda_function" "contact-form" {
  function_name = "ContactFormEmail"

  s3_bucket = "contact-form-lambda-code"
  s3_key    = "lambda.zip"

  handler = "index.handler"
  runtime = "nodejs18.x"

  role = "${aws_iam_role.lambda_exec.arn}"
}

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


resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.contact-form.function_name}"
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.contact-form-api.execution_arn}/*/*" 
}


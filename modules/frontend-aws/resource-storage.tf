resource "aws_s3_bucket" "website_bucket" {
}

resource "aws_s3_bucket_website_configuration" "website_configuration" {
  bucket = aws_s3_bucket.website_bucket.bucket

  index_document {
    suffix = "index.html"
  }
}


resource "aws_s3_object" "react_build" {
  for_each = fileset("./${var.build_path}", "*")
  bucket = aws_s3_bucket.website_bucket.bucket
  key    = each.key
  source = "./${var.build_path}/${each.key}"
  etag   = filemd5("./${var.build_path}/${each.key}")
}

resource "aws_s3_object" "react_build_static_css" {
  for_each = fileset("./${var.build_path}/static/css", "*")
  bucket = aws_s3_bucket.website_bucket.bucket
  key    = "static/css/${each.key}"
  source = "./${var.build_path}/static/css/${each.key}"
  etag   = filemd5("./${var.build_path}/static/css/${each.key}")
}

resource "aws_s3_object" "react_build_static_js" {
  for_each = fileset("./${var.build_path}/static/js","*.{*}")
  bucket = aws_s3_bucket.website_bucket.bucket
  key    = "static/js/${each.key}"
  source = "./${var.build_path}/static/js/${each.key}"
  etag = filemd5("./${var.build_path}/static/js/${each.key}")
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.website_bucket.bucket
  #policy = data.aws_iam_policy_document.allow_access_from_another_account.json
  policy = jsonencode({
    "Version" = "2012-10-17",
    "Statement" = {
      "Sid" = "AllowCloudFrontServicePrincipalReadOnly",
      "Effect" = "Allow",
      "Principal" = {
        "Service" = "cloudfront.amazonaws.com"
      },
      "Action" = "s3:GetObject",
      "Resource" = "arn:aws:s3:::${aws_s3_bucket.website_bucket.id}/*",
      "Condition" = {
      "StringEquals" = {
          #"AWS:SourceArn": data.aws_caller_identity.current.arn
          "AWS:SourceArn" = "arn:aws:cloudfront::${data.aws_caller_identity.current.account_id}:distribution/${aws_cloudfront_distribution.s3_distribution.id}"
        }
      }
    }
  })
}

resource "terraform_data" "content_version" {
  input = var.content_version
}


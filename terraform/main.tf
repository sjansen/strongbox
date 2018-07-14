terraform {
  required_version = "> 0.11.0"
}


provider "aws" {
  profile = "${var.aws_profile}"
  region = "${var.aws_region}"
}

provider "aws" {
  alias = "cloudfront"
  profile = "${var.cloudfront_profile}"
  region = "us-east-1"
}

provider "aws" {
  alias = "route53"
  profile = "${var.route53_profile}"
  region = "us-east-1"
}


# ACM
resource "aws_acm_certificate" "cert" {
  provider = "aws.cloudfront"
  domain_name = "${var.dns_name}"
  validation_method = "DNS"
}

resource "aws_acm_certificate_validation" "cert" {
  provider = "aws.cloudfront"
  certificate_arn = "${aws_acm_certificate.cert.arn}"
  validation_record_fqdns = ["${aws_route53_record.cert.fqdn}"]
}


# CloudFront
resource "aws_cloudfront_distribution" "site" {
  provider = "aws.cloudfront"
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  price_class         = "PriceClass_100"

  aliases = [
    "${var.dns_name}"
  ]

  custom_error_response {
    error_code = 400
    error_caching_min_ttl = 0
  }

  custom_error_response {
    error_code = 403
    error_caching_min_ttl = 0
  }

  custom_error_response {
    error_code = 404
    error_caching_min_ttl = 0
  }

  custom_error_response {
    error_code = 500
    error_caching_min_ttl = 0
  }

  custom_error_response {
    error_code = 502
    error_caching_min_ttl = 0
  }

  custom_error_response {
    error_code = 503
    error_caching_min_ttl = 0
  }

  custom_error_response {
    error_code = 504
    error_caching_min_ttl = 0
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${var.media}"

    compress               = true
    default_ttl            = 900
    max_ttl                = 3600
    min_ttl                = 0
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  logging_config = {
    include_cookies = false
    bucket          = "${aws_s3_bucket.logs.bucket_domain_name}"
  }

  origin {
    domain_name = "${aws_s3_bucket.media.bucket_domain_name}"
    origin_id   = "S3-${var.media}"
    s3_origin_config {
      origin_access_identity = "${aws_cloudfront_origin_access_identity.site.cloudfront_access_identity_path}"
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = "${aws_acm_certificate.cert.arn}"
    minimum_protocol_version = "TLSv1.2_2018"
    ssl_support_method = "sni-only"
  }
}

resource "aws_cloudfront_origin_access_identity" "site" {
  provider = "aws.cloudfront"
  comment = "access-identity-${var.media}"
}


# IAM
data "aws_iam_policy_document" "media" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.media.arn}/*"]
    principals {
      type        = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.site.iam_arn}"]
    }
  }
}


# Route53
data "aws_route53_zone" "zone" {
  provider = "aws.route53"
  name = "${var.dns_zone}"
  private_zone = false
}

resource "aws_route53_record" "cert" {
  provider = "aws.route53"
  zone_id = "${data.aws_route53_zone.zone.id}"
  name = "${aws_acm_certificate.cert.domain_validation_options.0.resource_record_name}"
  type = "${aws_acm_certificate.cert.domain_validation_options.0.resource_record_type}"
  ttl = 60
  records = [
    "${aws_acm_certificate.cert.domain_validation_options.0.resource_record_value}"
  ]
}

resource "aws_route53_record" "site" {
  provider = "aws.route53"
  zone_id  = "${data.aws_route53_zone.zone.id}"
  name     = "${var.dns_name}"
  type     = "A"
  alias {
    name     = "${aws_cloudfront_distribution.site.domain_name}"
    zone_id  = "${aws_cloudfront_distribution.site.hosted_zone_id}"
    evaluate_target_health = false
  }
}


# S3
resource "aws_s3_bucket" "logs" {
  bucket        = "${var.logs}"
  acl           = "log-delivery-write"
  force_destroy = true
  lifecycle_rule {
    id      = "cleanup"
    enabled = true
    abort_incomplete_multipart_upload_days = 3
    expiration {
      days = 90
    }
    noncurrent_version_expiration {
      days = 30
    }
  }
  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
  versioning {
    enabled = "${var.protect_logs}"
  }
}

resource "aws_s3_bucket" "media" {
  bucket        = "${var.media}"
  acl           = "private"
  force_destroy = true
  lifecycle_rule {
    id      = "cleanup"
    enabled = true
    abort_incomplete_multipart_upload_days = 3
    expiration {
      expired_object_delete_marker = true
    }
    noncurrent_version_expiration {
      days = 30
    }
  }
  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
  versioning {
    enabled = "${var.protect_media}"
  }
}

resource "aws_s3_bucket_policy" "media" {
  bucket = "${aws_s3_bucket.media.id}"
  policy = "${data.aws_iam_policy_document.media.json}"
}

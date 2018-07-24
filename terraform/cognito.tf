locals {
  cognito_region = "${element(split("_", aws_cognito_user_pool.pool.id), 0)}"
}

output "SAML Audience" {
  value = "urn:amazon:cognito:sp:${aws_cognito_user_pool.pool.id}"
}

output "SAML Consumer URL" {
  value = "https://${var.user_pool}.auth.${local.cognito_region}.amazoncognito.com/saml2/idpresponse"
}

output "ACS URL Validator" {
  value = "^https:\\/\\/${var.user_pool}.auth.${local.cognito_region}.amazoncognito.com\\/saml2\\/idpresponse$"
}

output "SAML Single Logout URL" {
  value = "https://${var.user_pool}.auth.${local.cognito_region}.amazoncognito.com/saml2/logout"
}

resource "aws_cognito_user_pool" "pool" {
  name = "${var.user_pool}"
  username_attributes = ["email"]

  admin_create_user_config {
    allow_admin_create_user_only = true
    unused_account_validity_days = 90
  }
  password_policy {
    minimum_length = 12
    require_lowercase = true
    require_numbers = true
    require_symbols = true
    require_uppercase = true
  }
  schema {
    name                     = "email"
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    required                 = true
    string_attribute_constraints {
        min_length = 0
        max_length = 2048
    }
  }
  schema {
    name                     = "family_name"
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    required                 = true
    string_attribute_constraints {
        min_length = 0
        max_length = 2048
    }
  }
  schema {
    name                     = "given_name"
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    required                 = true
    string_attribute_constraints {
        min_length = 0
        max_length = 2048
    }
  }
  schema {
    name                     = "sub"
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = false
    required                 = true
    string_attribute_constraints {
        min_length = 1
        max_length = 2048
    }
  }
}

resource "aws_cognito_user_pool_client" "client" {
  name         = "strongbox"
  explicit_auth_flows = ["ADMIN_NO_SRP_AUTH"]
  generate_secret = false
  user_pool_id = "${aws_cognito_user_pool.pool.id}"
}

resource "aws_cognito_user_pool_domain" "domain" {
  domain       = "${var.user_pool}"
  user_pool_id = "${aws_cognito_user_pool.pool.id}"
}

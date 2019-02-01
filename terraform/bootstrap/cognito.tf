locals {
  cognito_region = "${element(split("_", aws_cognito_user_pool.users.id), 0)}"
}


resource "aws_cognito_identity_provider" "idp" {
  count = "${length(var.idp_client_id) > 0 ? 1 : 0}"

  provider_name = "${var.idp_name}"
  provider_type = "OIDC"
  user_pool_id  = "${aws_cognito_user_pool.users.id}"
  attribute_mapping = {
    email = "email"
    family_name = "family_name"
    given_name = "given_name"
    username = "sub"
  }
  provider_details = {
    attributes_request_method     = "POST"
    attributes_url_add_attributes = "false"
    authorize_scopes = "email openid profile"
    client_id        = "${var.idp_client_id}"
    client_secret    = "${var.idp_client_secret}"
    oidc_issuer      = "${var.idp_oidc_issuer}"
  }
}


resource "aws_cognito_user_pool" "users" {
  name = "${var.user_pool}"
  username_attributes = ["email"]

  admin_create_user_config {
    allow_admin_create_user_only = true
    unused_account_validity_days = 90
  }
  password_policy {
    minimum_length    = 12
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
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
  count = "${length("${var.idp_name}") > 0 ? 1 : 0}"

  name                         = "strongbox"
  allowed_oauth_flows          = ["code", "implicit"]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_scopes         = ["email", "openid", "profile", "aws.cognito.signin.user.admin"]
  callback_urls                = "${sort(var.callback_urls)}"
  explicit_auth_flows          = ["ADMIN_NO_SRP_AUTH"]
  generate_secret              = false
  supported_identity_providers = ["${aws_cognito_identity_provider.idp.*.provider_name}"]
  user_pool_id                 = "${aws_cognito_user_pool.users.id}"
}


resource "aws_cognito_user_pool_domain" "domain" {
  domain       = "${var.user_pool}"
  user_pool_id = "${aws_cognito_user_pool.users.id}"
}

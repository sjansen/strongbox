locals {
  cognito_client_id = "${element(concat(aws_cognito_user_pool_client.client.*.id, list("")), 0)}"
  cognito_host = "${var.user_pool}.auth.${local.cognito_region}.amazoncognito.com"
  cognito_idp_initiated_url = "https://${local.cognito_host}/oauth2/authorize?response_type=code&client_id=${local.cognito_client_id}&redirect_uri=${var.callback_urls[0]}"
}

output "IDP Initiated URL" {
  value = "${length(var.idp_client_id) < 1 ? "PENDING" : "${local.cognito_idp_initiated_url}"}"
}

output "IDP Redirect URL" {
  value = "https://${local.cognito_host}/oauth2/idpresponse"
}

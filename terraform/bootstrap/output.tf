output "OAuth Response URL" {
  value = "https://${var.user_pool}.auth.${local.cognito_region}.amazoncognito.com/oauth2/idpresponse"
}

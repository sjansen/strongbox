data "aws_cognito_user_pools" "users" {
  name = "${var.user_pool}"
}

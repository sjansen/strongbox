# Credentials
variable "aws_profile" {
  type = "string"
}

variable "aws_region" {
  default = "us-east-1"
}

variable "cloudfront_profile" {
  type = "string"
}

variable "route53_profile" {
  type = "string"
}

# Resources
variable "dns_name" {
  type = "string"
}

variable "dns_zone" {
  type = "string"
}

variable "logs" {
  type = "string"
}

variable "media" {
  type = "string"
}

variable "protect_logs" {
  default = false
}

variable "protect_media" {
  default = false
}

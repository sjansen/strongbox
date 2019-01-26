terraform {
  required_version = ">= 0.11.11"
}

##
# Credentials
##

provider "aws" {
  version = "~> 1.56"

  profile = "${var.aws_profile}"
  region = "${var.aws_region}"
}

variable "aws_profile" {
  type = "string"
}

variable "aws_region" {
  default = "us-east-1"
}

##
# Resources
##

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

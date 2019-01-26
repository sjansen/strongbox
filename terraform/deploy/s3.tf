data "aws_s3_bucket" "logs" {
  bucket = "${var.logs}"
}


data "aws_s3_bucket" "media" {
  bucket = "${var.media}"
}


resource "aws_s3_bucket_policy" "media" {
  bucket = "${data.aws_s3_bucket.media.id}"
  policy = "${data.aws_iam_policy_document.media.json}"
}

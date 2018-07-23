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

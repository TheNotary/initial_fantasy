variable "region" { default = "us-west-1" }
variable "personal_site_domain" { default = "initialfantasy.com" }
variable "access_key" {}
variable "secret_key" {}

# Setup terraform to work with amazon aws with the appropriate user/ region combo
provider "aws" {
  access_key = "${var.access_key}"
  secret_key = "${var.secret_key}"
  region     = "${var.region}"
}


# This bucket allows us an object to redirect naked domains to so they add the
# 'www' bit of it while working within the constraints of DNS
resource "aws_s3_bucket" "personal_site_redirect" {
  bucket = "${var.personal_site_domain}"
  acl    = "public-read"

  website {
    redirect_all_requests_to = "http://www.${var.personal_site_domain}"
  }
}

resource "aws_route53_record" "personal_site_a_" {
  type    = "A"
  name    = ""
  zone_id = "${aws_route53_zone.personal_site.zone_id}"

  alias {
    name    = "${aws_s3_bucket.personal_site_redirect.website_domain}"
    zone_id = "${aws_s3_bucket.personal_site_redirect.hosted_zone_id}"
    evaluate_target_health = true
  }
}

// Redirect "prod" to heroku
resource "aws_route53_record" "personal_site_cname_www" {
  type    = "CNAME"
  name    = "www"
  records = ["initialfantasy.herokuapp.com"]
  zone_id = "${aws_route53_zone.personal_site.zone_id}"
  ttl     = "5"
}

// Redirect stage to heroku
resource "aws_route53_record" "personal_site_cname_stage" {
  type    = "CNAME"
  name    = "stage"
  records = ["initialfantasy.herokuapp.com"]
  zone_id = "${aws_route53_zone.personal_site.zone_id}"
  ttl     = "5"
}


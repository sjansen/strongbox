# Strongbox: Setup

**1.** Configure Terraform by creating `terraform/terraform.tfvars.json` with
values appropriate for your AWS account:

```json
{
  "aws_profile": "strongbox-deploy",
  "aws_region": "us-west-2",
  "cloudfront_profile": "strongbox-deploy",
  "route53_profile": "strongbox-deploy",

  "dns_name": "strongbox.example.com",
  "dns_zone": "example.com.",
  "logs": "strongbox-logs",
  "media": "strongbox-media",
  "protect_logs": false,
  "protect_media": false
}
```

**2.** Create required AWS resources using Terraform:

```bash
pushd terraform && terraform apply ; popd
```

NOTE: CloudFront distribution creation may fail on the first attempt. If this
happens, repeat the step.

**3.** Install development tool dependenciess:

```bash
pushd tools && yarn ; popd
```

**4.** Install the React app dependencies:

```bash
pushd webui && yarn ; popd
```

**5.** Build and deploy the React app:

```bash
make deploy-webui
```

NOTE: CloudFront can take up to 15 minutes to initialize the distribution when
it is first created by Terraform. Strongbox will not be available until after
CloudFront is ready.

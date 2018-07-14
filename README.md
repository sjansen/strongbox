# Strongbox

A serverless, single page app example using:
 - AWS 
   - Certificate Manager, CloudFront, Route53, S3
 - React 
   - create-react-app, Material UI, Redux
 - Serverless
 - Terraform

## Setup

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

**2.** Install development tool dependenciess:

```bash
pushd tools && yarn ; popd
```

**3.** Install the React app dependencies:

```bash
pushd webui && yarn ; popd
```

## Build & Deploy

**1.** Build required AWS resources using Terraform:

```bash
pushd terraform && terraform apply ; popd
```

NOTE 1: This step is only required once, unless Terraform resources are changed.

NOTE 2: CloudFront distribution creation may fail on the first attempt. If this
happens, repeat the step.

**2.** Build and deploy the React app:

```bash
make deploy-webui
```

NOTE: CloudFront can take up to 15 minutes to initialize the distribution when
it is first created by Terraform. Strongbox will not be available until after
CloudFront is ready.

## Cleanup

**1.** Remove all Terraform managed resources:

```bash
pushd terraform && terraform destroy ; popd
```

NOTE: Because of a Terraform limitation, if protection is enabled for logs or
media, it may be necessary to delete the S3 buckets manually.
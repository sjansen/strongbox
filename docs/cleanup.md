# Strongbox: Cleanup

**1.** Remove all Terraform managed resources:

```bash
pushd terraform && terraform destroy ; popd
```

NOTE: Because of a Terraform limitation, if protection is enabled for logs or
media, it may be necessary to delete the S3 buckets manually.

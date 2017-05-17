# Terraform Code

This app can be deployed to aws using terraform.  The DNS records are handled here, but you'll need to go to the domain name that you have and set amazon's hosted_zone's nameservers to the ones that your registrar should defer to.

## Usage

```
$ make apply
$ # deploy to the thing....
```


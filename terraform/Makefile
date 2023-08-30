plan:
	@terraform plan \
  -var 'access_key=${HOBBY_AWS_ACCESS_KEY_ID}' \
  -var 'secret_key=${HOBBY_AWS_SECRET_ACCESS_KEY}'

apply:
	@terraform apply \
  -var 'access_key=${HOBBY_AWS_ACCESS_KEY_ID}' \
  -var 'secret_key=${HOBBY_AWS_SECRET_ACCESS_KEY}'

import:
	@terraform import \
  -var 'access_key=${HOBBY_AWS_ACCESS_KEY_ID}' \
  -var 'secret_key=${HOBBY_AWS_SECRET_ACCESS_KEY}'


destroy:
	@terraform destroy \
  -var 'access_key=${HOBBY_AWS_ACCESS_KEY_ID}' \
  -var 'secret_key=${HOBBY_AWS_SECRET_ACCESS_KEY}' \
  -target=aws_s3_bucket.personal_site_redirect


.PHONY: *

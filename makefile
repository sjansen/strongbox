.PHONY:  default  refresh  test  test-coverage  test-docker

default: test

bootstrap:
	cd terraform/bootstrap/ && terraform apply

deploy:
	GOOS=linux GOARCH=amd64 go build -o strongbox main.go
	zip -9 strongbox.zip strongbox
	cd terraform/deploy/ && terraform apply -auto-approve

destroy:
	cd terraform/deploy/ && terraform destroy

test:
	cd webui && yarn test -- --coverage

.PHONY: all  deploy-webui  test

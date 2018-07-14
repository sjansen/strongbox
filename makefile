all: deploy-webui

deploy-webui:
	cd webui && yarn build
	cd tools && serverless client deploy --no-confirm --no-delete-contents --no-config-change --no-cors-change --no-policy-change

test:
	cd webui && yarn test -- --coverage

.PHONY: all  deploy-webui  test

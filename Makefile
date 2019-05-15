
export BUILD_NAME := $(shell date '+%Y%m%d%H%M%S')

create-production-build: 
	@echo "Creating production build"
	PUBLIC_URL=https://orphans3.kaeme.org/${BUILD_NAME} yarn run build

create-dev-build:
	@echo "Creating dev build"
	PUBLIC_URL=http://d1wlethtcxzwqe.cloudfront.net/${BUILD_NAME} yarn run build

upload-to-aws:
	@echo "Uploading to AWS"
	aws s3 cp build/ s3://kaemedatabase/${BUILD_NAME} --acl public-read  --recursive --profile kaeme --region eu-central-1
	aws s3 cp build/service-worker.js  s3://kaemedatabase --acl public-read --profile kaeme --region eu-central-1
	aws cloudfront update-distribution --id ELRUR7I2E2R0I --default-root-object ${BUILD_NAME}/index.html --profile kaeme --region eu-central-1
	aws cloudfront create-invalidation --distribution-id ELRUR7I2E2R0I --paths /service-worker.js --profile kaeme --region eu-central-1

upload-to-aws-dev:
	@echo "Uploading to AWS dev"
	aws s3 cp build/ s3://kaemedatabase-dev/${BUILD_NAME} --acl public-read  --recursive --profile kaeme --region eu-central-1
	aws s3 cp build/service-worker.js  s3://kaemedatabase-dev --acl public-read --profile kaeme --region eu-central-1
	aws cloudfront update-distribution --id E34XDPACMQ6E6D --default-root-object ${BUILD_NAME}/index.html --profile kaeme --region eu-central-1
	aws cloudfront create-invalidation --distribution-id E34XDPACMQ6E6D --paths /service-worker.js --profile kaeme --region eu-central-1

deploy: create-production-build upload-to-aws

deploy-dev: create-dev-build upload-to-aws-dev
	
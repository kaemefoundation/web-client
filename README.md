To upload build to S3:

PUBLIC_URL=https://orphans3.kaeme.org/{version_number}/ yarn run build

aws s3 cp build/ s3://kaemedatabase/{version_number} --acl public-read  --recursive --profile kaeme --region eu-central-1

aws s3 cp build/service-worker.js  s3://kaemedatabase --acl public-read --profile kaeme --region eu-central-1

aws cloudfront update-distribution --id ELRUR7I2E2R0I --default-root-object {version_number}/index.html --profile kaeme --region eu-central-1


aws cloudfront create-invalidation --distribution-id ELRUR7I2E2R0I --paths /service-worker.js --profile kaeme --region eu-central-1
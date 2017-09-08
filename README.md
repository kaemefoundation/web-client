To upload build to S3:

PUBLIC_URL=https://orphans3.kaeme.org/{version_number}/ yarn run build

aws s3 cp build/ s3://kaemedatabase/{version_number} --acl public-read  --recursive --profile kaeme --region eu-central-1

aws s3 cp build/service-worker.js  s3://kaemedatabase --acl public-read --profile kaeme --region eu-central-1
export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    expiry: process.env.JWT_EXPIRY,
  },
  aws_region: process.env.AWS_REGION,
  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
  aws_access_key: process.env.AWS_SECRET_ACCESS_KEY,
  aws_public_bucket_name: process.env.AWS_PUBLIC_BUCKET_NAME,
});

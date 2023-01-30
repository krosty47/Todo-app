import { DynamoDB } from "aws-sdk";

import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from "../utils/env.utils";

export const dynamodb = new DynamoDB({
  region: "localhost",
  sslEnabled: false,
  endpoint: "http://localhost:8000",
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

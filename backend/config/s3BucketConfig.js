import "dotenv/config.js";

import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIA35K2PP5NOWLIRGVQ",
    secretAccessKey: "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",
  },
});

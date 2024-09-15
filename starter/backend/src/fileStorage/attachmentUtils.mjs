import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3'
import {getSignedUrl} from '@aws-sdk/s3-request-presigner'

const bucketName = process.env.IMAGES_S3_BUCKET
const urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION)
const s3Client = new S3Client()

// Get signed URL
export async function getUploadUrl(todoId) {
  const command = new PutObjectCommand({
    Bucket: bucketName, Key: todoId
  })
  return await getSignedUrl(s3Client, command, {
    expiresIn: urlExpiration
  })
}

// Format S3 URL
export function getFormattedUrl(todoId) {
  return `https://${bucketName}.s3.amazonaws.com/${todoId}`;
}
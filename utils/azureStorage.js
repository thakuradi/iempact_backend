import { BlobServiceClient } from '@azure/storage-blob';
import dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.AZURE_CONTAINER_NAME;

// Initialize client only if connection string is present to avoid immediate crash on start if missing
let containerClient;
if (connectionString && containerName) {
    try {
        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        containerClient = blobServiceClient.getContainerClient(containerName);
    } catch (error) {
        console.error("Failed to initialize Azure Blob Storage client:", error.message);
    }
}

export const uploadToAzureBlob = async (file) => {
    if (!containerClient) {
        throw new Error("Azure Blob Storage is not configured properly.");
    }

    const blobName = `${Date.now()}-${file.originalname}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(file.buffer, {
        blobHTTPHeaders: { blobContentType: file.mimetype }
    });

    return blockBlobClient.url;
};

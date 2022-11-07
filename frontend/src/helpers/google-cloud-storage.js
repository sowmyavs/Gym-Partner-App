// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');
// Creates a client from a Google service account key
const storage = new Storage({keyFilename: 'key.json'})
//bucket name
const bucketName= "bigbuffbadgers"
const filePath="/Users/sowmyavemparala/Downloads/flower.jpg"
const destFileName='sunflower3.jpg'
export async function uploadFile(filePath) {
const options = {
    destination: 'profileimages/test_3.jpg',
   
};

await storage.bucket(bucketName).upload(filePath, options);

console.log(`${filePath} uploaded to ${bucketName}`);
}

uploadFile(filePath).catch(console.error);

// module.exports.uploadFile = uploadFile;
// module.exports = {uploadFile};
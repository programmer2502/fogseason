const ImageKit = require("imagekit");

let imagekit = null;

if (process.env.IMAGEKIT_PUBLIC_KEY && process.env.IMAGEKIT_PRIVATE_KEY && process.env.IMAGEKIT_URL_ENDPOINT) {
    imagekit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
    });
} else {
    console.warn("⚠️ Warning: ImageKit credentials missing from environment. Upload feature will be unavailable, but server starting...");
}

module.exports = imagekit;

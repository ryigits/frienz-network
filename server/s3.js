const aws = require("aws-sdk");
const fs = require("fs");
let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = {
        S3_KEY: process.env.S3_KEY,
        S3_SECRET: process.env.S3_SECRET,
    };
} else {
    secrets = require("./secrets");
}

const s3 = new aws.S3({
    accessKeyId: secrets.S3_KEY,
    secretAccessKey: secrets.S3_SECRET,
});

exports.upload = (req, res, next) => {
    if (!req.file) {
        return res.sendStatus(500);
    }

    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        .putObject({
            Bucket: "frienznetwork",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();

    promise
        .then(() => {
            // it worked!!!
            console.log("aws uploaded successfully");
            next();
            fs.unlink(path, () => {}); // it will delete img after uploaded from uploads folder.
        })
        .catch((err) => {
            // uh oh
            console.log("s3 ERROR", err);
        });
};

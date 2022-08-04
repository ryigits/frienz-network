const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets.json"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "us-east-1", // Make sure this corresponds to the region in which you have verified your email address (or 'eu-west-1' if you are using the Spiced credentials)
});

exports.sendCodeToEmail = function (code, email) {
    return ses
        .sendEmail({
            Source: "Yigit Sezginer <ryigit@gmail.com>",
            Destination: {
                ToAddresses: [`${email}`],
            },
            Message: {
                Body: {
                    Text: {
                        Data:
                        `
                        Your code is 
                        ${code}
                        `,
                    },
                },
                Subject: {
                    Data: "Your code for Reset Password",
                },
            },
        })
        .promise()
        .then(() => console.log("Code has been successfully sent"))
        .catch((err) => console.log("mail error", err));
};

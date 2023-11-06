const SecretsManager = require("./src/secretsManager.js")

exports.handler = async (event) => {

    var secretName = process.env.SECRET_NAME;
    var region = process.env.SECRET_REGION;
    var secretValue = await SecretsManager.getSecret(secretName, region);
    console.log(secretValue);
    const response = {
        statusCode: 200,
        body: secretValue,
    };
    return response;
};
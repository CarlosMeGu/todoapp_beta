require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");
import axios from 'axios';

const client = jwksClient({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
});

const getKey = (header, callback) => {
    client.getSigningKey(header.kid, function (error, key) {
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    });
}

const getUserFromAuth0 = async (token) => {
    try {
        const {data} = await axios.get(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
            headers: {
                'Authorization': `${token}`
            }
        })
        return {data}
    } catch (e) {
        return {e}
    }
}

export const isTokenValid = async (token) => {
    if (token) {
        const bearerToken = token.split(" ");

        const result = new Promise((resolve, reject) => {
            jwt.verify(
                bearerToken[1],
                getKey,
                {
                    audience: process.env.API_IDENTIFIER,
                    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
                    algorithms: ["RS256"]
                },
                async (error, decoded) => {
                    if (error) {
                        resolve({error});
                    }
                    if (decoded) {
                        const {data: user} = await getUserFromAuth0(token)
                        resolve({decoded, user});
                    }
                }
            );
        });

        return result;
    }

    return {error: "No token provided"};
}


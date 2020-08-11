import axios from 'axios';
import jwkToPem from 'jwk-to-pem';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import poolData from './pool-data';

const validateToken = async (idToken) => {
  try {
    const url = `https://cognito-idp.${process.env.REGION}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`;
    const response = await axios.get(url);
    const pems = {};
    const { keys } = response.data;

    keys.forEach((key) => {
      pems[key.kid] = jwkToPem({ kty: key.kty, n: key.n, e: key.e });
    });

    const decodedJwt = jwt.decode(idToken, { complete: true });

    if (!decodedJwt) {
      return null;
    }

    const { kid } = decodedJwt.header;
    const pem = pems[kid];

    if (!pem) {
      return null;
    }

    try {
      const payload = jwt.verify(idToken, pem);
      return payload;
    } catch (err) {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default validateToken;

/**
 * Payload:
 * {
 *   'at_hash': string;
 *   sub: string;
 *   'cognito:groups': string[];
 *   'email_verified': boolean;
 *   iss: string;
 *   'cognito:username': string;
 *   aud: string;
 *   'token_use': string;
 *   'auth_time': number;
 *   name: string;
 *   exp: number;
 *   iat: number;
 *   email: string;
 * }
 */

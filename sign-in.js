import 'cross-fetch/polyfill';
import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUser,
} from 'amazon-cognito-identity-js';
import poolData from './pool-data';

const signIn = async (Username, Password) => {
  const authDetails = new AuthenticationDetails({
    Username,
    Password,
  });

  const userPool = new CognitoUserPool(poolData);

  const userData = {
    Username,
    Pool: userPool,
  };
  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => resolve(result),
      onFailure: (err) => reject(err),
    });
  });
};

export default signIn;

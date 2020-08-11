import 'cross-fetch/polyfill';
import {
  CognitoUserPool,
  CognitoUser,
} from 'amazon-cognito-identity-js';
import poolData from './pool-data';

const forgotPassword = async (Username) => {
  const userPool = new CognitoUserPool(poolData);

  const userData = {
    Username,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.forgotPassword({
      onSuccess: (result) => resolve(result),
      onFailure: (err) => reject(err),
    });
  });
};

export default forgotPassword;

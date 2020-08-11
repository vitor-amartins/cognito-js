import 'cross-fetch/polyfill';
import {
  CognitoUserPool,
  CognitoUser,
} from 'amazon-cognito-identity-js';
import poolData from './pool-data';

const confirmForgotPassword = async (Username, newPassword, confirmationCode) => {
  const userPool = new CognitoUserPool(poolData);

  const userData = {
    Username,
    Pool: userPool,
  };
  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.confirmPassword(confirmationCode, newPassword, {
      onSuccess: (result) => resolve(result),
      onFailure: (err) => reject(err),
    });
  });
};

export default confirmForgotPassword;

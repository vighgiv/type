import { NotificationContent } from 'src/app/shared/notification/model/notification-content';
import { AuthCode } from './enum/auth-codes';

// See all error codes: https://firebase.google.com/docs/auth/admin/errors

export function convertToNotification(errorCode: string): NotificationContent {
  const ERROR_PREFIX = 'Error:';
  const SUCCESS_PREFIX = 'Success!';

  switch (errorCode) {
    case AuthCode.SUCCESS_REGISTRATION: {
      return {
        header: SUCCESS_PREFIX,
        message: 'Welcome to SpaceType!'
      };
    }
    case AuthCode.SUCCESS_RESET: {
      return {
        header: SUCCESS_PREFIX,
        message: 'We have sent you an email.'
      };
    }
    case AuthCode.INVALID_LOGIN_CREDENTIALS: {
      return {
        header: ERROR_PREFIX,
        message: 'Please enter valid credentials!'
      };
    }
    case AuthCode.INVALID_REGISTER_CREDENTIALS: {
      return {
        header: ERROR_PREFIX,
        message: 'Please fix the error(s)!'
      };
    }
    case AuthCode.INVALID_EMAIL: {
      return {
        header: ERROR_PREFIX,
        message: 'Please enter a valid email!'
      };
    }
    // Firebase error codes
    case 'auth/wrong-password': {
      return {
        header: ERROR_PREFIX,
        message: 'Incorrect password!'
      };
    }
    case 'auth/email-already-in-use': {
      return {
        header: ERROR_PREFIX,
        message: 'This email is already in use!'
      };
    }
    case 'auth/user-not-found': {
      return {
        header: ERROR_PREFIX,
        message: "This account doesn't exists!"
      };
    }
    case 'auth/too-many-requests': {
      return {
        header: 'Slow down.',
        message: "You've made too many requests to the server!"
      };
    }
    default:
      return { header: 'Unknown error:', message: errorCode };
  }
}

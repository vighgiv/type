import { NotificationContent } from 'src/app/shared/notification/model/notification-content';

// See all error codes: https://firebase.google.com/docs/auth/admin/errors
export namespace AuthCodeHandler {
  export function convertToNotification(errorCode: string): NotificationContent {
    const loginFailPrefix: string = 'Sign in failed.';
    const registerFailPrefix: string = 'Sign up failed.';
    const registerSuccessPrefix: string = 'Sign up successful.';

    switch (errorCode) {
      // Own error codes
      case 'app/invalid-credentials': {
        return {
          header: loginFailPrefix,
          message: 'Please enter valid credentials!'
        } as NotificationContent;
      }
      case 'app/invalid-register': {
        return {
          header: registerFailPrefix,
          message: 'Please fix the errors!'
        } as NotificationContent;
      }
      case 'app/success-register': {
        return {
          header: registerSuccessPrefix,
          message: 'Welcome to {SpaceType}!'
        } as NotificationContent;
      }
      // Firebase error codes
      case 'auth/user-not-found': {
        return {
          header: loginFailPrefix,
          message: 'The email or password is incorrect!'
        } as NotificationContent;
      }
      case 'auth/invalid-email': {
        return {
          header: registerFailPrefix,
          message: 'Please enter a valid email!'
        } as NotificationContent;
      }
      default:
        return { header: 'Unknown:', message: errorCode } as NotificationContent;
    }
  }
}

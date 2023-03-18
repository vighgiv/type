import { NotificationIcon } from '../enum/notification-icon';

export type NotificationContent = {
  icon?: NotificationIcon;
  header: string;
  message: string;
};

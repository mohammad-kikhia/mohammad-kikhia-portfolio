import React, { ReactNode, createContext, useContext, useState } from 'react';
import Notification from '@/components/layout/Notification';

export type NotificationType = {
  message: string;
  status: 'info' | 'error' | 'success';
};
const NotificationContext = createContext<
  ((notification: NotificationType) => void) | undefined
>(undefined);

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      'useNotification must be used within a NotificationProvider',
    );
  }
  return context;
}

export default function NotificationsProvider({
  children,
}: {
  children: ReactNode;
}) {
  // create a global notification state to use it anywhere in the project
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const addNotification = (notification: NotificationType) => {
    setNotifications([...notifications, notification]);
  };

  return (
    <NotificationContext.Provider value={addNotification}>
      {children}
      <div className="fixed top-24 right-4 z-50 flex flex-col gap-2 max-w-sm">
        {notifications.map((notification, index) => {
          return (
            <Notification
              key={index}
              notification={notification}
              onClose={() =>
                setNotifications(notifications.filter((_, i) => i !== index))
              }
            />
          );
        })}
      </div>
    </NotificationContext.Provider>
  );
}

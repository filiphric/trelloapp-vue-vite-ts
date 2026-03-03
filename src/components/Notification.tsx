import React from 'react';
import { useStore } from '@/store/store';
import ErrorIcon from '@/assets/icons/error.svg';
import InfoIcon from '@/assets/icons/info.svg';

const Notification: React.FC = () => {
  const notification = useStore((s) => s.notification);

  if (!notification.show) return null;

  return (
    <div className="absolute bottom-5 left-5 z-50 min-w-min h-14 text-base bg-white rounded-sm shadow-xl" data-test-id="notification-message">
      {notification.error ? (
        <ErrorIcon className="inline-block ml-4 w-6 h-6 text-red-500 fill-current" data-test-id="error-icon" />
      ) : (
        <InfoIcon className="inline-block ml-4 w-4 h-4 text-blue-500 fill-current" data-test-id="info-icon" />
      )}
      <div className="inline-block m-4 text-black">{notification.message}</div>
    </div>
  );
};

export default Notification;

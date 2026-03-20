import { FC } from 'react';
import { NotificationType } from './NotificationsProvider';
import Iconify from '@/components/shared/Iconify';

interface NotificationProps {
  notification: NotificationType;
  onClose: () => void;
}

const Notification: FC<NotificationProps> = ({ notification, onClose }) => {
  let bgColor: string;
  let textColor: string;
  let borderColor: string;
  let icon: string | undefined;

  switch (notification.status) {
    case 'info':
      bgColor = 'bg-blue-500/90';
      textColor = 'text-blue-50';
      borderColor = 'border-blue-400';
      icon = 'fa6-solid:circle-info';
      break;
    case 'error':
      bgColor = 'bg-red-500/90';
      textColor = 'text-red-50';
      borderColor = 'border-red-400';
      icon = 'fa6-solid:triangle-exclamation';
      break;
    case 'success':
      bgColor = 'bg-green-500/90';
      textColor = 'text-green-50';
      borderColor = 'border-green-400';
      icon = 'fa6-solid:circle-check';
      break;
    default:
      bgColor = 'bg-slate-500/90';
      textColor = 'text-on-accent';
      borderColor = 'border-slate-400';
  }

  return (
    <div
      className={`${bgColor} ${textColor} ${borderColor} flex items-center gap-4 max-w-sm w-full text-sm font-medium transition-all duration-500 rounded-lg border-2 p-4 shadow-lg backdrop-blur-sm`}
    >
      <button
        aria-label="close"
        onClick={onClose}
        className="flex-shrink-0 p-1 rounded hover:bg-white/20 transition-colors"
      >
        <Iconify icon="fa6-solid:xmark" className="w-4 h-4" />
      </button>
      <p className="flex-1">{notification.message}</p>
      {icon && (
        <span className="flex-shrink-0 ms-auto">
          <Iconify icon={icon} width={24} height={24} />
        </span>
      )}
    </div>
  );
};
export default Notification;

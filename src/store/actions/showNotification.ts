export const showNotification = (set: any, _get: any, message: string, isError: boolean) => {
  set({
    notification: { message, error: isError, show: true },
  });
  setTimeout(() => {
    set({
      notification: { message: '', error: false, show: false },
    });
  }, 4000);
};

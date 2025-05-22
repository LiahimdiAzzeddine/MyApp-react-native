import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info';

export const useToast = () => {
  const triggerToast = (message: string, type: ToastType = 'info') => {
    Toast.show({
      type,
      text1: message,
      position: 'top',
      visibilityTime: 3000,
    });
  };

  return { triggerToast };
};

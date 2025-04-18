import { Alert } from 'react-native';

export function showAlert(
  message: string,
  title = '',
  onConfirm?: () => void,
  confirmText = 'OK',
  cancelable = true
) {
  Alert.alert(
    title,
    message,
    [
      {
        text: confirmText,
        onPress: () => {
          if (onConfirm) onConfirm();
        },
      },
    ],
    { cancelable }
  );
}

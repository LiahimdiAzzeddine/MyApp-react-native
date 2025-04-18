// utils/themeOptions.ts
import { DefaultTheme, DarkTheme as NavigationDarkTheme, Theme } from '@react-navigation/native';

const customColors = {
  customBlue: "#0F548D",
  "custom-gray": "#a4a4a4",
  "custom-rose": "#fff1f1",
  "custom-red": "#c32721",
  "custom-red-clear": "#c6312b",
  "custom-green": "#42a199",
  "custom-green-clear": "#ebf8f7",
  "custom-green-background": "#c7f0d9",
  "custom-green-divider": "#bde4e1",
  "custom-brown": "#ffeca7",
  "custom-green-text": "#4E986D",
  "custom-red-bg-clear": "#fad4ce",
  "custom-orange": "#ffeda3",
  "custom-text-orange": "#FF8200",
  "custom-orange-bg": "#FFECA7",
  "mockup-green": "#2d6b66",
  "mockup-blue": "#6dc3bc",
  "custom-blue": "#0F548D",
};
export const LightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...customColors,
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
  // Add other custom properties if needed
};

export const CustomDarkTheme = {
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...customColors,
    primary: '#BB86FC',
    background: '#121212',
    card: '#1F1F1F',
    text: '#FFFFFF',
    border: '#272727',
    notification: '#FF80AB',
  },
  // Ajoutez d'autres propriétés personnalisées si nécessaire
};

//Formatted
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Card, DefaultTheme, Text, Provider as PaperProvider } from 'react-native-paper';
import UserProvider from './Components/Contexts/UserContext';
import Main from './Main'; //Main component




import { Button } from 'react-native-paper';
import { View } from 'react-native';
import APIProvider from './Components/Contexts/APIContext';

//Customized theme - changing Paper's default purple colors. 
const theme = {
  ...DefaultTheme,
  roundness: 5,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2196F3',
    secondary: 'rgba(44, 199, 242, 0.1)',
    accent: '#FFFFFF',       //- secondary color for your app which complements the primary color.
    background: '#F5F5F5',   // - background color for pages, such as lists.
    surface: '#FFFFFF',      // - background color for elements containing content, such as cards.
    textBlack: '#212121',    // - text color for content.
    textWhite: '#FFFFFF'
    //myColor: 'black'
  },
  dark: false,

  // placeholder:,  // - color for placeholder text, such as input placeholder.
  // backdrop:,     // - color for backdrops of various components such as modals.
  // onSurface:,    // - background color for snackbars
  // notification:, // - background color for badges
};





export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <APIProvider>
          <UserProvider>
            <PaperProvider theme={theme}>

              <Main />

            </PaperProvider>
          </UserProvider>
        </APIProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

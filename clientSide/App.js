import { NavigationContainer } from '@react-navigation/native';
import { I18nManager } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import UserProvider from './Components/Contexts/UserContext';
import APIProvider from './Components/Contexts/APIContext';
import TokenProvider from './Components/Contexts/TokenContext';
import Main from './Main';
import { useEffect } from 'react';


const theme = {
  ...DefaultTheme, roundness: 5, myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2196F3',
    primarySec: '#a1d8ff',
    secondary: 'rgba(44, 199, 242, 0.1)',
    accent: '#FFFFFF',       //- secondary color for your app which complements the primary color.
    background: '#F5F5F5',   // - background color for pages, such as lists.
    surface: '#FFFFFF',      // - background color for elements containing content, such as cards.
    textBlack: '#212121',    // - text color for content.
    textWhite: '#FFFFFF'
  },
  dark: false,
};


export default function App() {

  useEffect(() => {
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
  })
  
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <APIProvider>
          <TokenProvider>
           <UserProvider>
              <PaperProvider theme={theme}>

                <Main />

              </PaperProvider>
           </UserProvider>
          </TokenProvider>
        </APIProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

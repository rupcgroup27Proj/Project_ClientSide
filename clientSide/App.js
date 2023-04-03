//Formatted
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import UserProvider from './Components/Contexts/UserContext';
import Main from './Main'; //Main component

//Customized theme - changing Paper's default purple colors. 
const theme = {
  ...DefaultTheme,
  roundness: 5,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue',
    secondary: 'rgba(44, 199, 242, 0.1)',
    accent: 'green',
    //myColor: 'black'
  }
};


export default function App() {
  return (
    <SafeAreaProvider>

      <NavigationContainer>
        <UserProvider>
          <PaperProvider theme={theme}>

            <Main />

          </PaperProvider>
        </UserProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


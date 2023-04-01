import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';//User context
import UserProvider from './Components/Contexts/UserContext';
//Main component
import Main from './Main';

const theme = {
  ...DefaultTheme,
  roundness: 5,
  myOwnProperty: true,
  colors: {
  ...DefaultTheme.colors,
    primary: 'blue',
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


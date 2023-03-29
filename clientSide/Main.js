import { View, Text } from 'react-native';

//Context
import { useUser } from './Components/Contexts/UserContext';
//LoginScreen
import LoginScreen from './Screens/SharedScreens/Login/LoginScreen';
//Navs
import AdminNav from './Components/Navs/AdminNav';
import StudentDrawer from './Components/Navs/StudentDrawer'
import GuideDrawer from './Components/Navs/GuideDrawer';
import TeacherDrawer from './Components/Navs/TeacherDrawer';
import { ActivityIndicator } from 'react-native-paper';


const Main = () => {

    const { currentUser, isLoading } = useUser();

    if (isLoading)
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )

    return (
        <>
            {!currentUser ? <LoginScreen /> : (
                <>
                    {currentUser.type == 'Admin' && <AdminNav />}
                    {currentUser.type == 'Student' && <StudentDrawer />}
                    {currentUser.type == 'Teacher' && <TeacherDrawer />}
                    {currentUser.type == 'Guide' && <GuideDrawer />}
                </>
            )}
        </>
    );
}



export default Main
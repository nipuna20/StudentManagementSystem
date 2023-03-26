import { View, Platform, StatusBar } from "react-native";
import AddUser from "././components/screen/AddUser";
import UserList from "././components/screen/UserList";
import UpdateUser from "././components/screen/UpdateUser";
import { NavigationContainer } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddFeedback from "./components/screen/Feedback/Addfeedback";
import FeedbackList from "./components/screen/Feedback/FeedbackList";
import UpdateFeedback from "./components/screen/Feedback/UpdateFeedback";
import Home from "./components/screen/Home";
import AdminFeedbackList from "./components/screen/Feedback/Adminfeedbacklist";

//Chanduni
import AddNotice from "./components/screen/Notices/AddNotice";
import NoticeList from "./components/screen/Notices/NoticeList";
import UpdateNotice from "./components/screen/Notices/UpdateNotice";
import AdminDashboard from "./components/Common/AdminDashboard";
import NoticeHome from "./components/screen/Notices/NoticeHome";
import SplashScreen from "./components/screen/SplashScreen";

import AddClassSchedule from "./components/screen/TimeTable/ClassSchedule";
import ScheduleList from "./components/screen/TimeTable/ScheduleList";
import UpdateSchedule from "./components/screen/TimeTable/UpdateSchedule";
import Login from "./components/screen/Login";
import Register from "./components/screen/Register";
import ScheduleListStd from "./components/screen/TimeTable/ScheduleListStd";


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <View
      style={{
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
      }}
    >

      <NavigationContainer>
        <Stack.Navigator >
        {/* <Stack.Navigator initialRouteName="Splash"> */}
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Add User" component={AddUser} />
          <Stack.Screen name="User List" component={UserList} />
          <Stack.Screen name="Update User" component={UpdateUser} />

          {/* Chanduni */}
          <Stack.Screen name="Add Notice" component={AddNotice} />
          <Stack.Screen name="View Notice" component={NoticeList} />
          <Stack.Screen name="Update Notice" component={UpdateNotice} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
          <Stack.Screen name="Notice Home" component={NoticeHome} />

          {/* Vishwa */}
          <Stack.Screen screenOptions={{headershown : false}} name="Add ClassSchedule" component={AddClassSchedule} />
          <Stack.Screen name="Schedule List" component={ScheduleList} />
          <Stack.Screen name="ScheduleStd List" component={ScheduleListStd} />
          <Stack.Screen name="Update Schedule" component={UpdateSchedule} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false}} />
          <Stack.Screen name="Register" component={Register} />

          {/* Nipuna */}
          <Stack.Screen name="Add Feedback" component={AddFeedback} />
          <Stack.Screen name="Feedback List" component={FeedbackList} />
          <Stack.Screen name="Update Feedback" component={UpdateFeedback} />

          <Stack.Screen name="Home" component={Home} options={{ headerShown: false}} />
          <Stack.Screen name="Feedback" component={AdminFeedbackList} />
          <Stack.Screen name="Admin Feedback" component={AdminFeedbackList} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

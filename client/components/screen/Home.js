import * as React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import { Image } from 'react-native';
 import { ScrollView } from 'react-native';
 import { TouchableOpacity } from 'react-native';
import AdddNotice from './Notices/AddNotice';
import Addfeedback from './Feedback/Addfeedback';
import AddClassSchedule from './TimeTable/ClassSchedule';
import { useNavigation } from "@react-navigation/native";
import ScheduleListStd from './TimeTable/ScheduleListStd';
import NoticeHome from './Notices/NoticeHome'

function Home() {
  return (
   


<ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e5e8e8' }}>
  <Card style={{ width: 270, height: 270, marginBottom: 10, marginTop: 10, backgroundColor: '#d5d8dc' }}>
    <Card.Content>
      <View style={{ justifyContent: 'center', alignItems: 'center',  }}>
        <Image
          source={{ uri: 'https://images.ctfassets.net/2htm8llflwdx/6LK9MCbEafyPhE3YB5HLW0/c0fe08b894d0cff8a6838f9172d1a61c/Graduation_StudentsGroup_Smiling_Outdoor_GettyImages-907837926.jpg' }}
          style={{ width: 220, height: 200, borderRadius: 10 }}
        />
        <Text>Degrees Programs</Text>
        <View style={{ marginHorizontal: 15 }}>
        {/* Button */}
        <TouchableOpacity
          style={{
            marginTop: 5,
            width: 60,
            backgroundColor: "#7fb3d5",
            height: 25,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 6,
          }}
          onPress={() => navigation.navigate("Add Feedback")}
          underlayColor="#b2babb"
        >
          <Text style={{ fontSize: 10, fontWeight: "bold", color: "#34495e" }}>
           View
          </Text>
        </TouchableOpacity>
      </View>
      </View>
    </Card.Content>
  </Card>
  <Card style={{ width: 270, height: 270, marginBottom: 10, backgroundColor: '#d5d8dc' }}>
    <Card.Content>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={{ uri: 'https://www.salesforce.com/content/dam/blogs/eu/2021/small-business-departments-success.png' }}
          style={{ width: 220, height: 200, borderRadius: 10 }}
        />
        <Text>Departments</Text>
         <View style={{ marginHorizontal: 15 }}>
        {/* Button */}
        <TouchableOpacity
          style={{
            marginTop: 5,
            width: 60,
            backgroundColor: "#7fb3d5",
            height: 25,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 6,
          }}
          onPress={() => navigation.navigate("Add Feedback")}
          underlayColor="#b2babb"
        >
          <Text style={{ fontSize: 10, fontWeight: "bold", color: "#34495e" }}>
           View
          </Text>
        </TouchableOpacity>
      </View>
      </View>
    </Card.Content>
  </Card>
  <Card style={{ width: 270, height: 270, marginBottom: 10, backgroundColor: '#d5d8dc' }}>
    <Card.Content>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={{ uri: 'https://www.eventsindustryforum.co.uk/images/articles/about_the_eif.jpg' }}
          style={{ width: 220, height: 200, borderRadius: 10 }}
        />
        <Text>Events</Text>
         <View style={{ marginHorizontal: 15 }}>
        {/* Button */}
        <TouchableOpacity
          style={{
            marginTop: 5,
            width: 60,
            backgroundColor: "#7fb3d5",
            height: 25,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 6,
          }}
          onPress={() => navigation.navigate("Add Feedback")}
          underlayColor="#b2babb"
        >
          <Text style={{ fontSize: 10, fontWeight: "bold", color: "#34495e" }}>
           View
          </Text>
        </TouchableOpacity>
      </View>
      </View>
    </Card.Content>
  </Card>
  <Card style={{ width: 270, height: 270, marginBottom: 10, backgroundColor: '#d5d8dc' }}>
    <Card.Content>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={{ uri: 'https://www.timeshighereducation.com/sites/default/files/shutterstock_202730734.jpg' }}
          style={{ width: 220, height: 200, borderRadius: 10 }}
        />
        <Text> Lecturers</Text>
         <View style={{ marginHorizontal: 15 }}>
        {/* Button */}
        <TouchableOpacity
          style={{
            marginTop: 5,
            width: 60,
            backgroundColor: "#7fb3d5",
            height: 25,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 6,
          }}
          onPress={() => navigation.navigate("Add Feedback")}
          underlayColor="#b2babb"
        >
          <Text style={{ fontSize: 10, fontWeight: "bold", color: "#34495e" }}>
           View
          </Text>
        </TouchableOpacity>
      </View>
      </View>
    </Card.Content>
  </Card>
</ScrollView>



    
  );
}

function Student() {
  return (
    <Card>
      <Card.Content>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text>Student!</Text>
        </View>
      </Card.Content>
    </Card>
  );
}

function Feedback() {
  return (
    <Card>
      <Card.Content>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text>Feedback!</Text>
        </View>
      </Card.Content>
    </Card>
  );
}

function Timetable() {
  return (
    <Card>
      <Card.Content>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text>Timetable!</Text>
        </View>
      </Card.Content>
    </Card>
  );
}

function Uploading() {
  return (
    <Card>
      <Card.Content>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text>Uploading!</Text>
        </View>
      </Card.Content>
    </Card>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // <NavigationContainer independent={true}>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home-outline'
                : 'home-outline';
            } else if (route.name === 'Feedback') {
              iconName = focused 
              ? 'pencil-outline' 
              : 'pencil-outline';
            }
            else if (route.name === 'Timetable') {
              iconName = focused 
              ? 'calendar-outline' 
              : 'calendar-outline';
            }
            else if (route.name === 'Uploading') {
              iconName = focused 
              ? 'cloud-upload-outline' 
              : 'cloud-upload-outline';
            }
            else if (route.name === 'Student') {
              iconName = focused 
              ? 'book-outline' 
              : 'book-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#5d6d7e',
          tabBarInactiveTintColor: '#d4e6f1',
          tabBarStyle: { backgroundColor: '#117864' } // set background color here
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Student" component={NoticeHome} />
        <Tab.Screen name="Feedback" component={Addfeedback} />
        <Tab.Screen name="Timetable" component={ScheduleListStd} />
        <Tab.Screen name="Uploading" component={Uploading} />
      </Tab.Navigator>
    // </NavigationContainer>
  );
}
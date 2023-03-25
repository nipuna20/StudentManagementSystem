import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase-config/firebase-config";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
import {
  collection,
  getDocs,
  updateDoc,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { Card } from "react-native-paper";

export default function UpdateSchedule({ route }) {
  const { item } = route.params;
  const DatCollectinRef = collection(db, "Class Schedule"); //database collection reference
  const id = item.id;

  const navigation = useNavigation();
  const initialState = {
    selectedDay: "",
    selectedTime: "",
    Venue: "",
    Module: "",
    Lecturer: "",
  };
  const [data, setData] = useState(initialState);
  useEffect(() => {
    const UpdateSchedule = async () => {
      try {
        const docRef = await getDoc(doc(db, "Class Schedule", id));
        // console.log("Document update data:", docRef.data());
        setData({ ...initialState, ...docRef.data(), id: docRef.id });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    UpdateSchedule();
  }, []);

  const handleChangeText = (name, value) => {
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {

    const originalData = {
      selectedDay: data.selectedDay,
      selectedTime: data.selectedTime,
      Venue: data.Venue,
      Module: data.Module,
      Lecturer: data.Lecturer,
    }

    if (data.selectedDay.trim() === "") {
      // If the day is not selected, show an error message
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Day cant be empty !",
      });
      return;
    }
  
    if (data.selectedTime.trim() === "") {
      // If the time slot is not selected, show an error message
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Time cant be empty !",
      });
      return;
    }
  
    if (data.Module.trim() === "") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Module cant be empty !",
      });
      return;
    }
  
    if (data.Venue.trim() === "") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Venue cant be empty !",
      });
      return;
    }
  
    if (data.Lecturer.trim() === "") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Lecturer cant be empty !",
      });
      return;
    }
  
    // If the selected day and time slot are the same as the original class schedule, no need to check for conflicting schedules
    if (data.selectedDay === originalData.selectedDay && data.selectedTime === originalData.selectedTime) {
      await updateDoc(doc(db, "Class Schedule", id), {
        Venue: data.Venue,
        Module: data.Module,
        Lecturer: data.Lecturer,
      });
  
      if (updateDoc) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Class Schedule Updated Successfully!",
        });
  
        navigation.goBack();
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "An Error occurred while updating the class schedule!",
        });
      }
    } else {
// Check if the selected time slot has already been selected for the given day
      if (data.selectedTime.trim() !== "" && data.selectedDay !== "") {
        const snapshot = await getDocs(
          query(
            DatCollectinRef,
            where("selectedDay", "==", data.selectedDay),
            where("selectedTime", "==", data.selectedTime)
          )
        );
        if (snapshot.docs.length !== 0) {
          // If the selected time slot has already been selected for the given day, show an error message
          Toast.show({
            type: "error",
            text1: "Error",
            text2: `A class has already been scheduled for ${data.selectedDay} at ${data.selectedTime}.`,
          });
          return;
        }
      }

        await updateDoc(doc(db, "Class Schedule", id), {
          selectedDay: data.selectedDay,
          selectedTime: data.selectedTime,
          Venue: data.Venue,
          Module: data.Module,
          Lecturer: data.Lecturer,
        });
  
        if (updateDoc) {
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Class Schedule Updated Successfully!",
          });
  
          navigation.goBack();
        } 
        else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "An Error occurred while updating the class schedule!",
        });
      
    };
  }
}

  return (
    
      <ScrollView><View style={styles.container}>
        <Image
          style={{
            width: "20%",
            height: "10%",
            alignItems: "center",
            marginTop: 10,
            marginLeft: 280,
            marginBottom: -40,
            zIndex: 1,
            borderRadius: 50, // set the borderRadius property to 50 (half of the image width)
            overflow: "hidden",
          }}
          source={{
            uri: "https://static.vecteezy.com/ti/vetor-gratis/p3/2745118-arranjar-cronograma-ilustracao-vetor.jpg",
          }}
        />
        <View style={styles.container2}>
          <View style={styles.card}>
            <Card.Content>
              <Text
                style={styles.title}
              >
                Update Class Schedule
              </Text>
              <View
                style={{
                  margin: 5,
                  borderBottomWidth: 1,
                  borderColor: "#BDBDBD",
                  padding: 10,
                  justifyContent: "center",
                }}
              >
                <Text style={styles.text}>Day</Text>
                <Picker
                  style={styles.input}
                  selectedValue={data.selectedDay}
                  onValueChange={(val) => handleChangeText("selectedDay", val)}
                >
                  <Picker.Item label="Select a Day" value="" />
                  <Picker.Item label="Monday" value="Monday" />
                  <Picker.Item label="Tuesday" value="Tuesday" />
                  <Picker.Item label="Wednesday" value="Wednesday" />
                  <Picker.Item label="Thursday" value="Thursday" />
                  <Picker.Item label="Friday" value="Friday" />
                  <Picker.Item label="Saturday" value="Saturday" />
                  <Picker.Item label="Sunday" value="Sunday" />
                </Picker>

                <Text style={styles.text}>Time</Text>
                <Picker
                  style={styles.input}
                  selectedValue={data.selectedTime}
                  onValueChange={(val) => handleChangeText("selectedTime", val)}
                >
                  <Picker.Item label="Select a Time" value="" />
                  <Picker.Item
                    label="8.30 AM - 10.30 AM"
                    value="8.30 AM - 10.30 AM"
                  />
                  <Picker.Item
                    label="10.30 AM - 12.30 AM"
                    value="10.30 AM - 12.30 AM"
                  />
                  <Picker.Item
                    label="1.00 PM - 3.00 PM"
                    value="1.00 PM - 3.00 PM"
                  />
                  <Picker.Item
                    label="3.00 PM - 5.00 PM"
                    value="3.00 PM - 5.00 PM"
                  />
                  <Picker.Item
                    label="5.00 PM - 7.00 PM"
                    value="5.00 PM - 7.00 PM"
                  />
                </Picker>

                <Text style={styles.text}>Venue</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter the Venue"
                  value={data.Venue}
                  onChangeText={(val) => handleChangeText("Venue", val)}
                />

                <Text style={styles.text}>Module</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter the Module"
                  value={data.Module}
                  onChangeText={(val) => handleChangeText("Module", val)}
                />

                <Text style={styles.text}>Lecturer</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter the lecturer's name"
                  value={data.Lecturer}
                  onChangeText={(val) => handleChangeText("Lecturer", val)}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
                
              </View>
              <Toast />
            </Card.Content>
          </View>
        </View></View>
      </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c8e3d0",
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 70,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: height * 0.02,
  },
  input: {
    height: height * 0.06,
    backgroundColor: "#f7f7f7",
    borderWidth: 1,
    borderColor: "#f0f0f0",
    borderRadius: 5,
    paddingHorizontal: width * 0.04,
    marginBottom: height * 0.02,
  },
  button: {
    backgroundColor: "#0782F9",
    height: height * 0.06,
    width: width * 0.4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: height * 0.01,
    marginLeft: width * 0.15,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: width * 0.04,
  },
  buttonOutline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#0782F9",
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: width * 0.04,
  },
});

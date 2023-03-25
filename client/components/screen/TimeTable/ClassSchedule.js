import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";
import { db } from "../../firebase-config/firebase-config";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { Card } from "react-native-paper";
const { width, height } = Dimensions.get("window");

export default function AddClassSchedule() {
  const [data, setData] = useState("");
  const [Venue, setVenue] = useState("");
  const [Module, setModule] = useState("");
  const [Lecturer, setLecturer] = useState("");
  const navigation = useNavigation();
  const DatCollectinRef = collection(db, "Class Schedule"); //database collection reference
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  //create user function,include firebase methods
  const handleSubmit = async () => {
    if (selectedDay.trim() === "") {
      // If the day is not selected, show an error message
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Day cant be empty !",
      });
      return;
    }

    if (selectedTime.trim() === "") {
      // If the time slot is not selected, show an error message
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Time cant be empty !",
      });
      return;
    }

    if (Module.trim() === "") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Module cant be empty !",
      });
      return;
    }

    if (Venue.trim() === "") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Venue cant be empty !",
      });
      return;
    }

    if (Lecturer.trim() === "") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Lecturer cant be empty !",
      });
      return;
    }

    // Check if the selected time slot has already been selected for the given day
    if (selectedTime.trim() !== "" && selectedDay !== "") {
      const snapshot = await getDocs(
        query(
          DatCollectinRef,
          where("selectedDay", "==", selectedDay),
          where("selectedTime", "==", selectedTime)
        )
      );
      if (snapshot.docs.length !== 0) {
        // If the selected time slot has already been selected for the given day, show an error message
        Toast.show({
          type: "error",
          text1: "Error",
          text2: `A class has already been scheduled for ${selectedDay} at ${selectedTime}.`,
        });
        return;
      }
    }

    await addDoc(DatCollectinRef, {
      selectedDay,
      selectedTime,
      Venue,
      Module,
      Lecturer,
    });
    if (addDoc) {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Class Schedule Successfully submitted!",
      });//application toast message
      navigation.navigate("Schedule List"); 
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error adding Class Schedule !",
      });
    }
  };

  return (
  <ScrollView>
    <View style={styles.container}>
      
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
            uri: "https://gifs.eco.br/wp-content/uploads/2022/08/gifs-de-calendarios-0.gif",
          }}
        />
        <View style={styles.container2}>
          <View style={styles.card}>
            <Card.Content>
              <Text
                style={styles.title}
              >
                Add Class Schedule
              </Text>
              
                <Text style={styles.text}>Day</Text>
                <Picker
                  style={styles.input}
                  selectedValue={selectedDay}
                  onValueChange={(itemValue) => setSelectedDay(itemValue)}
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
                  selectedValue={selectedTime}
                  onValueChange={(itemValue) => setSelectedTime(itemValue)}
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
                  onChangeText={(text) => setVenue(text)}
                />

                <Text style={styles.text}>Module</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter the Module"
                  onChangeText={(text) => setModule(text)}
                />

                <Text style={styles.text}>Lecturer</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter the Lecturer's name"
                  onChangeText={(text) => setLecturer(text)}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Add Class</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Schedule List")}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={styles.buttonOutlineText}>Schedule List</Text>
            </TouchableOpacity>
              
              <Toast />
            </Card.Content>
          </View>
        </View>
      
    </View></ScrollView>
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

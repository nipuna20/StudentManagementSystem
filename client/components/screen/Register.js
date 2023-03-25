import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Toast from "react-native-toast-message";
import { db } from "../firebase-config/firebase-config";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { Card } from "react-native-paper";
const { width, height } = Dimensions.get("window");

export default function Register() {
  const [data, setData] = useState("");
  const [Name, setName] = useState("");
  const [PNumber, setPNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [UserType, setUserType] = useState('S');
  const navigation = useNavigation();
  const DatCollectinRef = collection(db, "Register"); //database collection reference


  //create user function,include firebase methods
  const handleSubmit = async () => {
    if (Name.trim() === "") {
      // If the day is not selected, show an error message
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Name cant be empty !",
      });
      return;
    }

    if (PNumber.trim() === "") {
      // If the time slot is not selected, show an error message
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Phone Number cant be empty !",
      });
      return;
    }

    if (Email.trim() === "") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Email cant be empty !",
      });
      return;
    }

    if (Password.trim() === "") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Password cant be empty !",
      });
      return;
    }

    await addDoc(DatCollectinRef, {
      Name,
      PNumber,
      Email,
      Password,
      UserType,
    });
    if (addDoc) {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "User Registered Successfully!",
      });//application toast message
      navigation.navigate("Login"); 
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error Registering User!",
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container2}>
          <Card style={styles.card}>
            <Card.Content>
              <Text
                style={{
                  color: "Darkblue",
                  fontWeight: "bold",
                  fontSize: 30,
                  marginTop: 20,
                  textAlign: "center",
                }}
              >
                Register
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
                <Text style={styles.text}>Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter the Name"
                  onChangeText={(text) => setName(text)}
                />

                <Text style={styles.text}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter the Phone No"
                  onChangeText={(text) => setPNumber(text)}
                />

                <Text style={styles.text}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter the Email"
                  onChangeText={(text) => setEmail(text)}
                />

                <Text style={styles.text}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter the Password"
                  onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={styles.buttonOutlineText}>Sign In</Text>
            </TouchableOpacity>
                
              </View>
              <Toast />
            </Card.Content>
          </Card>
          
        </View>
      </ScrollView>
    </View>
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
      padding: 20,
    },
    card: {
      width: "100%",
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 20,
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
      marginTop: height * 0.02,
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
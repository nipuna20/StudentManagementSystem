import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { db } from "../../firebase-config/firebase-config";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc } from "firebase/firestore";
import { ScrollView } from 'react-native';
import { Card } from 'react-native-paper';

export default function Addfeedback() {
  const [data, setData] = useState("");
  const navigation = useNavigation();
  const DatCollectinRef = collection(db, "Feedback"); //database collection reference

  //inputs handle function
  const handleChangeText = (name, value) => {
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  //create user function,include firebase methods
  const add_data = async () => {
    try {
      await addDoc(DatCollectinRef, {
        detail: data.detail,
        name: data.name,
        topic: data.topic
      });
      if (addDoc) {
        ToastAndroid.show("successfully submited!", ToastAndroid.SHORT); //application toast message
      }
    } catch (e) {
      //error handling
      console.error("Error adding document: ", e);
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode, errorMessage);
    }
  };

  return (
      
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e5e8e8' }}>
    <Card style={{  marginBottom: 10, marginTop: 10, backgroundColor: '#d5d8dc', width: 350 }}>
      <Card.Content>
    <View style={{ flex: 1, top: 10 }}>
      <Text
        style={{
          color: "#0D0140",
          fontWeight: "bold",
          fontSize: 30,
          marginTop: 15,
          textAlign: "center",
        }}
      >
        Add FeedBack
      </Text>

      {/* user data entering form start form here */}
      <View
        style={{
          margin: 5,
          borderBottomWidth: 1,
          borderColor: "#BDBDBD",
          padding: 10,
        }}
      >
        {/* lables */}
        <Text style={styles.text}>Topic</Text>
        {/* input fields  */}
        <TextInput
          style={{
            borderColor: "#67afff",
            borderWidth: 1.5,
            borderRadius: 10,
            padding: 5,
            paddingLeft: 10,
          }}
          keyboardType="detail"
          placeholder="enter topic"
          onChangeText={(val) => handleChangeText("topic", val)}
        ></TextInput>
        {/* lables */}
        <Text style={styles.text}>Feedback</Text>
        {/* input fields  */}
        <TextInput
          style={{
            borderColor: "#67afff",
            borderWidth: 1.5,
            borderRadius: 10,
            padding: 5,
            paddingLeft: 10,
          }}
          keyboardType="detail"
          placeholder="enter feedback"
          onChangeText={(val) => handleChangeText("detail", val)}
        ></TextInput>
        {/* lables */}
        <Text style={styles.text}>Name</Text>
        {/* input fields  */}
        <TextInput
          style={{
            borderColor: "#67afff",
            borderWidth: 1.5,
            borderRadius: 10,
            padding: 5,
            paddingLeft: 10,
          }}
          placeholder="enter name"
          onChangeText={(val) => handleChangeText("name", val)}
        ></TextInput>

        {/* submit button */}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={2}
          onPress={() => add_data()}
          underlayColor="#0084fffa"
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizontal: 15 }}>
        {/* Button */}
        <TouchableOpacity
          style={{
            
            backgroundColor: "#0D47A1",
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 7,
          }}
          onPress={() => navigation.navigate("Feedback List")}
          underlayColor="#0084fffa"
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
            List 🛒
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    </Card.Content>
    </Card>
    </ScrollView>
   
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#0D0140",
    marginVertical: 5,
    fontWeight: "bold",
    fontSize: 15,
  },
  button: {
    marginTop: 15,
    backgroundColor: "#448AFF",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
  },
});

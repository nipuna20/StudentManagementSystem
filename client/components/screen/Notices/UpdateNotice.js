import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../../firebase-config/firebase-config";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  getDocs,
  updateDoc,
  getDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Card, Button, Title, Paragraph } from "react-native-paper";
import { ImageBackground } from "react-native-web";

export default function UpdateNotice({ route }) {
  const { item } = route.params;
  const id = item.id;
  const [data, setData] = useState("");
  const navigation = useNavigation();
  const initialState = {
    heading: "",
    name: "",
    date: "",
  };

  useEffect(() => {
    const updatemember = async () => {
      try {
        const docRef = await getDoc(doc(db, "Notice", id));
        // console.log("Document update data:", docRef.data());
        setData({ ...docRef.data(), id: docRef.id });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };

    updatemember();
  }, []);

  const handleChangeText = (name, value) => {
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const UpdateUser = async () => {
    try {
      await updateDoc(doc(db, "Notice", id), {
        heading: data.heading,
        name: data.name,
        date: data.date,
      });
      if (updateDoc) {
        ToastAndroid.show("Updated successfully!", ToastAndroid.SHORT);
        navigation.navigate("View Notice");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode, errorMessage);
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/bg2.png")}
      style={styles.background}
    >
      <View style={{ flex: 1, top: 20 }}>
        <View style={styles.container}>
          <Card style={styles.card}>
            <Card.Content>
              <Text
                style={{
                  color: "#066b24",
                  fontWeight: "bold",
                  fontSize: 30,
                  marginTop: 30,
                  textAlign: "center",
                  textShadowColor: "#585858",
                  textShadowOffset: { width: 5, height: 5 },
                  textShadowRadius: 10,
                }}
              >
                Update Notices
              </Text>
              <View
                style={{
                  margin: 5,
                  borderBottomWidth: 1,
                  borderColor: "#BDBDBD",
                  padding: 10,
                }}
              >
                <Text style={styles.text}>Heading</Text>
                <TextInput
                  style={{
                    borderColor: "#066b24",
                    borderWidth: 1.5,
                    borderRadius: 10,
                    padding: 5,
                    paddingLeft: 10,
                  }}
                  placeholder="enter heading"
                  value={data.heading}
                  onChangeText={(val) => handleChangeText("heading", val)}
                ></TextInput>

                <Text style={styles.text}>Body</Text>
                <TextInput
                  style={{
                    borderColor: "#066b24",
                    borderWidth: 1.5,
                    borderRadius: 10,
                    padding: 5,
                    paddingLeft: 10,
                    height: 80,
                  }}
                  placeholder="enter the content"
                  value={data.name}
                  onChangeText={(val) => handleChangeText("name", val)}
                ></TextInput>

                <Text style={styles.text}>Publisher</Text>
                <TextInput
                  style={{
                    borderColor: "#066b24",
                    borderWidth: 1.5,
                    borderRadius: 10,
                    padding: 5,
                    paddingLeft: 10,
                  }}
                  placeholder="enter Publisher"
                  value={data.date}
                  onChangeText={(val) => handleChangeText("date", val)}
                ></TextInput>
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={2}
                  onPress={() => UpdateUser()}
                  underlayColor="#0084fffa"
                >
                  <Text
                    style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}
                  >
                    Update
                  </Text>
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>
        </View>
      </View>
    </ImageBackground>
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
    backgroundColor: "#0D47A1",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
  },
  container: {
    alignContent: "center",
    margin: 37,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 0,
  },
  background: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
  container: {
    alignContent: "center",
    margin: 37,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50,
    elevation: 20,
  },
});

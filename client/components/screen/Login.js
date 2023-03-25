import React, {useState} from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Card } from "react-native-paper";
import { db } from "../firebase-config/firebase-config";
import { getDocs,collection,} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
// import { auth } from '../firebase-config/firebase-config'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         navigation.replace("Home");
//       }
//     });

//     return unsubscribe;
//   }, []);

  const handleSignUp = () => {
    navigation.navigate("Register");
  };

  const handleLogin = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Register"));
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.Email === email && userData.Password === password) {
          if (userData.UserType === "A") {
            navigation.navigate("AdminDashboard");
          } else if (userData.UserType === "S") {
            navigation.navigate("Home");
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.container2}>
        <View style={styles.card}>
          <Card.Content>
            <Image
              style={styles.logo}
              source={require("../../assets/r_logo.png")}
            />
            <Text style={styles.title}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSignUp}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
          </Card.Content>
        </View>
      </View>
    </KeyboardAvoidingView>
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
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: "contain",
    alignSelf: "center",
    marginVertical: height * 0.02,
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
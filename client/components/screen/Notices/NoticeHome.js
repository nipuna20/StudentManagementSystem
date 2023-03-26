import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebase-config/firebase-config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { ImageBackground } from "react-native-web";

export default function NoticeHome() {
  const [getData, setGetData] = useState("");
  const navigation = useNavigation();
  const DatCollectinRef = collection(db, "Notice"); //firebase databse reference
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0); //the method for refresh functions

  useEffect(() => {
    //fetch the all data from firebase and set it to usestate, this firebase method
    const getAllData = async () => {
      const data = await getDocs(DatCollectinRef);
      setGetData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      forceUpdate();
    };
    getAllData();
  }, [ignored]);

  

  return (
  
    <View style={{ flex: 1, top: 20, backgroundColor: "#c8e3d0" }}>
      <View>
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
          Notices
       
        </Text>
        {/* store feched data in list using react native flatlist */}
        <FlatList
          style={{
            margin: 5,
            height: "95%",
          }}
          data={getData}
          renderItem={({ item }) => (
            <View
              style={{
                margin: 5,
                backgroundColor: "#fff",
                padding: 10,
                borderRadius: 15,
                elevation: 10,
              }}
            >
              <Text style={styles.heading}> {item.heading}</Text>
              <Text style={styles.text}> {item.name}</Text>
              <Text style={styles.textTwo}>{item.date}</Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              ></View>
            </View>
          )}
        ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: "#7d0511",
    marginVertical: 5,
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
  },
  text: {
    color: "#0D0140",
    marginVertical: 5,
    fontSize: 18,
  },
  textTwo: {
    color: "#0D0140",
    marginVertical: 5,
    fontSize: 15,
    textAlign: "end",
  },
  button: {
    marginTop: 15,
    backgroundColor: "#448AFF",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
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
    marginLeft: 10,
    marginRight: 10,
    marginTop: 50,
    elevation: 20,
  },
});

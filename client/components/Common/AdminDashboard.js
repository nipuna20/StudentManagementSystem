import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Button, Title, Paragraph } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-web";

const AdminDashboard = () => {
  const navigation = useNavigation();
  return (
    <>
      <ScrollView>
        <View style={{ flex: 1, top: 20, backgroundColor: "#c8e3d0" }}>
          <Card style={Styles.container}>
            <Card.Content>
              <Title>Notice Management</Title>
            </Card.Content>
            <Card.Cover
              source={{
                uri: "https://i.gifer.com/VfUI.gif",
              }}
              style={{ height: 70 }} // set the height to 200 pixels
            />

            <Card.Actions>
              <TouchableOpacity
                style={{
                  marginTop: 15,
                  backgroundColor: "#066b24",
                  height: 40,
                  width: 200,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 7,
                }}
                onPress={() => navigation.navigate("Add Notice")}
                underlayColor="#0084fffa"
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}
                >
                  Add a Notice
                </Text>
              </TouchableOpacity>
            </Card.Actions>
          </Card>
          <Card style={Styles.container}>
            <Card.Content>
              <Title>Contact Management</Title>
            </Card.Content>
            <Card.Cover
              source={{
                uri: "https://i.gifer.com/VfUI.gif",
              }}
              style={{ height: 70 }}
            />

            <Card.Actions>
              <TouchableOpacity
                style={{
                  marginTop: 15,
                  backgroundColor: "#066b24",
                  height: 40,
                  width: 200,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 7,
                }}
                onPress={() => navigation.navigate("User List")}
                underlayColor="#0084fffa"
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}
                >
                  List 🛒
                </Text>
              </TouchableOpacity>
            </Card.Actions>
          </Card>
          <Card style={Styles.container}>
            <Card.Content>
              <Title>Submission Management</Title>
            </Card.Content>
            <Card.Cover
              source={{
                uri: "https://i.gifer.com/VfUI.gif",
              }}
              style={{ height: 70 }}
            />

            <Card.Actions>
              <TouchableOpacity
                style={{
                  marginTop: 15,
                  backgroundColor: "#066b24",
                  height: 40,
                  width: 200,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 7,
                }}
                onPress={() => navigation.navigate("User List")}
                underlayColor="#0084fffa"
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}
                >
                  List 🛒
                </Text>
              </TouchableOpacity>
            </Card.Actions>
          </Card>

          <Card style={Styles.container}>
            <Card.Content>
              <Title>Timetable Management</Title>
            </Card.Content>
            <Card.Cover
              source={{
                uri: "https://i.gifer.com/VfUI.gif",
              }}
              style={{ height: 70 }}
            />

            <Card.Actions>
              <TouchableOpacity
                style={{
                  marginTop: 15,
                  backgroundColor: "#066b24",
                  height: 40,
                  width: 200,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 7,
                }}
                onPress={() => navigation.navigate("View Notice")}
                underlayColor="#0084fffa"
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}
                >
                  Add a Notice
                </Text>
              </TouchableOpacity>
            </Card.Actions>
          </Card>
        </View>
      </ScrollView>
    </>
  );
};
export default AdminDashboard;

const Styles = StyleSheet.create({
  container: {
    alignContent: "center",
    margin: 37,
  },
  background: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
});

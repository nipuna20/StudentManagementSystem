import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, DatePickerAndroid, Text, ToastAndroid } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-config/firebase-config"
import { useNavigation } from '@react-navigation/native';

export default function ViewSub({ navigation, route: { params: param } }) {
  // const navigate = useNavigation();

  const [input1, setInput1] = useState(param.submission.asName);
  const [input2, setInput2] = useState(param.submission.mName);
  const [input3, setInput3] = useState(param.submission.mCode);
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  // const [data, setData] = useState({});
  const DatCollectinRef = collection(db, "Submission");



  const handleDatePress = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        mode: 'spinner',
        date: new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        setDate(new Date(year, month, day));
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };



  const handleSubmit = async () => {
    // handle form submission
    try {
      let res = await doc(param.submission.id).updateDoc(DatCollectinRef, {
        asName: input1,
        mName: input2,
        mCode: input3,
        date: date,
      });
      // console.log(res);
      if (updateDoc) {
        ToastAndroid.show("successfully submited!", ToastAndroid.SHORT); //application toast message
        navigation.navigate('Submission List');
      }
    } catch (e) {
      //error handling
      console.error("Error adding document: ", e);
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode, errorMessage);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDateTimePicker = () => {
    setShowPicker(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>View submission</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Assignment Name"
          onChangeText={setInput1}
          value={input1}
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Module Name"
          onChangeText={setInput2}
          value={input2}
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Module Code"
          onChangeText={setInput3}
          value={input3}
          editable={false}
        />
        {/* <View style={styles.dateInputContainer}>
          <Button onPress={showDateTimePicker} title="Select Date" />
          {showPicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />)}
        </View> */}
        {/* <Button title="Submit" onPress={handleSubmit} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F5FF',
    alignItems: 'center',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#2E5BFF',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2E5BFF',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  formContainer: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 30,
    paddingTop: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 50,
  },
  input: {
    height: 40,
    width: '100%',
    borderRadius: 20,
    borderColor: '#2E5BFF',
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  dateInputContainer: {
    width: '100%',
    marginBottom: 16
  },
});
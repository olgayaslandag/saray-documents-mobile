import React, { useRef, useState } from "react";
import { TextInput, View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LayoutForget from "../LayoutForget";
import { useDispatch, useSelector } from "react-redux";
import { clearCode } from "../../../store/authSlice";


export default function EnterCode() {
  const [values, setValues] = useState(["", "", "", ""]);
  const [btnShow, setBtnShow] = useState(false);
  const [enteredCode, setEnteredCode] = useState(null)
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];  
  const code = useSelector(state => state.auth.code);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  console.log(code)
  
  function handleChange(value, index) {
    if (!/^\d?$/.test(value)) return;
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }  
        
    setBtnShow(newValues.every((val) => val !== ""));

    if (newValues.every((val) => val !== "")) {
        setEnteredCode(newValues.join(""))
    }
  };
  
  function handleKeyPress(e, index) {
    if (e.nativeEvent.key === "Backspace" && !values[index] && index > 0) {
      inputRefs[index - 1].current.focus(); 
    }    
  };

  function HandleConfirm() {
    if(Number(enteredCode) === Number(code)) {
        navigation.navigate('Forget', {screen: 'EnterPass'})
        dispatch(clearCode())
    } else {
        Alert.alert("", "Doğru kodu girmediniz! ")
    }
  }

  return (
    <LayoutForget>
        <View style={styles.container}>
        {values.map((value, index) => (
            <TextInput
            key={index}
            ref={inputRefs[index]}
            style={styles.input}
            value={value}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            />
        ))}        
        </View>

        {btnShow && (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={HandleConfirm}>
                    <Text style={styles.button_text}>Onayla</Text>
                </TouchableOpacity>
            </View>
        )}
        <View style={styles.container}>
          <TouchableOpacity style={styles.button_resend}>
            <Text style={{color: 'black'}}>Tekrar Gönder</Text>
          </TouchableOpacity>
        </View>
    </LayoutForget>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10, // Elemanlar arasındaki boşluk
  },
  input: {
    width: 50,
    height: 50,
    textAlign: "center",
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  button: {
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 20, 
    borderWidth: 1, 
    width: 230, 
    height: 50, 
    borderRadius: 5,
    backgroundColor: '#000'
  },
  button_text: {
    color: 'white'
  },
  button_resend: {
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 10, 
    borderWidth: 0, 
    width: 230, 
    borderRadius: 5,
  }
});

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from 'firebase/auth';
const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, function (user){
            if(user) {
                navigation.replace('Chat');
                console.log(user.uid);
            }
        });
        return unsubscribe;
    },[])
    const onHandleLogin = () => {
        if (email !== "" && password !== "") {
          signInWithEmailAndPassword(auth, email, password)
            .then(() => console.log("Success"))
            .catch((err) => Alert.alert("Login error", err.message));
        }
      };
  return (
    <View>
        <TextInput
            placeholder="Enter your email"
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.nameInput}
         />
        <TextInput
            placeholder="Enter your password"
            label="Password"
            value={password}
            onChangeText={text => setPassword(text)}
         />
        <Button title="Sign-IN" style={styles.btn} onPress={onHandleLogin}/>
        <Button title="Sign-UP" style={styles.btn} onPress={()=> navigation.navigate('Signup')} />
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    btn:{
        width:200,
        marginTop:10,
    },
    container:{
        flex:1,
        alignItems: 'center',
        padding: 10
    }
})
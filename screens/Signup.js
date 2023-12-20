import { View, Text,StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import {auth, database} from '../config/firebase.js'
import { createUserWithEmailAndPassword } from "firebase/auth";
import {collection,addDoc,orderBy,query,onSnapshot} from 'firebase/firestore';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name, setName] = useState('');
    const onHandleSignup = () => {
        if (email !== '' && password !== '') {
      createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {addDoc(collection(database,'userNames'),{name})})
            .catch((err) => Alert.alert("Login error", err.message));
        }

      };
  return (
    <View>
        <TextInput
            placeholder="Enter your name"
            label="Name"
            value={name}
            onChangeText={text => setName(text)}
         />
        <TextInput
            placeholder="Enter your email"
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
         />
        <TextInput            
            placeholder="Enter your password"
            label="Password"
            value={password}
            onChangeText={text => setPassword(text)}
         />
        <Button title="Register" style={styles.btn} onPress={onHandleSignup} />
    </View>
  )
}

export default Signup

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
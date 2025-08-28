import * as React from 'react'
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { rootNavigationRef } from '../navigation/navigationRef';
import { apiLogin } from '../services/api/endpoints/login';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('');

    function onLoginPress() {
        apiLogin(username, password, setStatus);
    }
    function onCreateAccountPress() {
        rootNavigationRef.navigate('CreateAccount')
    }

    return (
        <View style={styles.loginPage} >
            <Text style={styles.header} >Slice</Text>
            <View style={styles.loginBox} >
                <TextInput
                style={styles.loginInput}
                onChangeText={setUsername}
                value={username}
                placeholder='username'
                placeholderTextColor={'silver'}
                autoCapitalize='none'
                />
                <TextInput
                style={styles.loginInput}
                secureTextEntry={true}
                onChangeText={setPassword}
                value={password}
                placeholder='password'
                placeholderTextColor={'silver'}
                autoCapitalize='none'
                />
                <TouchableOpacity onPress={onLoginPress}>
                    <Text style={styles.pressable}>Login</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.text} >Don't Have an Account?</Text>
            <TouchableOpacity onPress={onCreateAccountPress}>
                <Text style={styles.pressable} >Create New Account</Text>
            </TouchableOpacity>
            <Text style={[{color: 'firebrick'}, styles.text]}>{status}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    loginPage: {
        display: 'flex',
        width: '100%',
        height: '100%',
        marginTop: '50%',
        alignItems: 'center'
    },
    header: {
        fontFamily: 'HelveticaNeue-Bold',
        fontSize: 28,
        marginVertical: 36,
    },
    loginInput: {
        fontFamily: 'HelveticaNeue-Light',
        fontSize: 14,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 3,
        paddingVertical: 2,
        paddingHorizontal: 5,
        width: '80%',
        marginVertical: 5,
    },
    loginBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 16,
        width: '60%',
        paddingVertical: 14,
    },
    pressable: {
        fontFamily: 'HelveticaNeue-Medium',
        color: 'blue',
    },
    loginPressed: {
        opacity: 50,
    },
    text: {
        fontFamily: 'HelveticaNeue-Italic',
        marginTop: 16,
        marginBottom: 5,
    },
});

export default Login
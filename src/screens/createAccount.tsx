import * as React from 'react'
import { useState, useCallback } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, TextInputChangeEvent } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { APICreateProfile } from '../lib/APIOps/APIOpsProfile'

import { GenerateID } from '../lib/util/utilityfunctions';

// type defs
import { ProfileType } from '../types/profile';
import { DateType } from '../types/post';
type QuestionParams = {
    question: string,
    placeholder: string,
    value: any,
    secureTextEntry: boolean,
    stateSet: React.Dispatch<React.SetStateAction<any>>,
};
type BirthdayParams = {
    value?: DateType,
    stateSet: React.Dispatch<React.SetStateAction<DateType | undefined>>,
}

// helper functions
function Question({question, placeholder, value, secureTextEntry, stateSet} : QuestionParams) {
    return (
        <View style={styles.questionView} >
            <Text style={styles.question} >{question}</Text>
            <TextInput
            style={styles.textInput}
            placeholder={placeholder}
            placeholderTextColor={'silver'}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={stateSet}
            autoCapitalize='none'
            autoCorrect={false}
            />
        </View>
    );
}
function BirthdayInput({value, stateSet} : BirthdayParams) {
    const [day, setDay] = useState<number | ''>('');
    const [month, setMonth] = useState<number | ''>('');
    const [year, setYear] = useState<number | ''>('');

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

    return (
        <View>
            <Text style={[{marginTop: 20}, styles.question]}>Enter Your Birthday</Text>
            {/* TODO: IMPLEMENT BIRTHDAY SELECTOR */}
        </View>
    )
}

function CreateAccount(): React.JSX.Element {
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState<DateType>();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function onCreateAccountPress() {
        console.log('email: ', email);

        // sample static profile for backend dev
        const newProfile : ProfileType = {
            profileID: GenerateID(),
            username: username,
            password: password,
            birthday: {day: '18', month: '06', year: '2002'},
            email: 'will@gmail.com',
            followers: [],
            following: [],
            followerCount: 0,
            followingCount: 0,
            posts: []
        }
        APICreateProfile(newProfile);
    }

    return (
        <View style={styles.createPage} >
            <Text style={styles.header} >Create New Account</Text>
            <View style={styles.createBox} >
                <Question
                question={'Enter Your Email'}
                placeholder={'you@example.com'}
                value={email}
                secureTextEntry={false}
                stateSet={setEmail}
                />
                <Question
                question={'Create a Username'}
                placeholder={'username'}
                value={username}
                secureTextEntry={false}
                stateSet={setUsername}
                />
                <Question
                question={'Create a New Password'}
                placeholder={'password'}
                value={password}
                secureTextEntry={true}
                stateSet={setPassword}
                />
                <TextInput
                style={styles.textInput}
                placeholder={'confirm password'}
                placeholderTextColor={'silver'}
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize='none'
                autoCorrect={false}
                />
                <BirthdayInput value={birthday} stateSet={setBirthday} />
                <TouchableOpacity onPress={onCreateAccountPress}>
                    <Text style={styles.createAccount} >Create New Account</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    createPage: {
        display: 'flex',
        width: '100%',
        height: '100%',
        marginTop: '20%',
        alignItems: 'center'
    },
    header: {
        fontFamily: 'HelveticaNeue-Bold',
        fontSize: 24,
        marginVertical: 36,
    },
    createBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 16,
        width: '85%',
        paddingVertical: 14,
    },
    questionView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },

    question: {
        fontFamily: 'HelveticaNeue',
        fontSize: 14,
    },
    textInput: {
        fontFamily: 'HelveticaNeue-Light',
        fontSize: 14,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 3,
        paddingVertical: 2,
        paddingHorizontal: 5,
        width: '80%',
        marginVertical: 10,
    },
    text: {
        fontFamily: 'HelveticaNeue-Italic',
        marginTop: 16,
        marginBottom: 5,
    },
    createAccount: {
        marginVertical: 20,
        fontFamily: 'HelveticaNeue-Medium',
        color: 'blue'
    }
});


export default CreateAccount;
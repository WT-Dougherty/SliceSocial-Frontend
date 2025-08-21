import * as React from 'react'
import { useState, useEffect, useCallback } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, TextInputChangeEvent } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

import { ValidateDate } from '../util/utilityfunctions';

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
function BirthdayInput({stateSet} : BirthdayParams) {
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    
    const days : Array<{key:string, value:string}> = [];
    for (let i=1; i<=31; i++) {
        days.push({key: i.toString(), value: i.toString()});
    }
    const months = [
        {key:'1', value:'January'},
        {key:'2', value:'February'},
        {key:'3', value:'March'},
        {key:'4', value:'April'},
        {key:'5', value:'May'},
        {key:'6', value:'June'},
        {key:'7', value:'July'},
        {key:'8', value:'August'},
        {key:'9', value:'September'},
        {key:'10', value:'October'},
        {key:'11', value:'November'},
        {key:'12', value:'December'},
    ];
    const years : Array<{key:string, value:string}> = [];
    for (let i=1910; i<=2020; i++) {
        years.push({key: (i-1909).toString(), value: i.toString()});
    }

    useEffect(() => {
        stateSet( {day, month, year} );
    }, [day, month, year]);

    return (
        <View style={styles.birthdayInputContainer} >
            <SelectList 
                setSelected={(d : string) => setMonth(d)}
                placeholder='month'
                search={false}
                data={months} 
                save="value"
                fontFamily='HelveticaNeue-Light'
                boxStyles={styles.birthdayInputBox}
                inputStyles={month ? {color: 'black'} : {color: 'silver'}}

            />
            <SelectList 
                setSelected={(d : string) => setDay(d)}
                placeholder='day'
                search={true}
                searchicon={<Text></Text>}
                data={days} 
                save="value"
                fontFamily='HelveticaNeue-Light'
                boxStyles={styles.birthdayInputBox}
                inputStyles={day ? {color: 'black'} : {color: 'silver'}}
            />
            <SelectList 
                setSelected={(d : string) => setYear(d)}
                placeholder='year'
                search={true}
                searchicon={<Text></Text>}
                data={years} 
                save="value"
                fontFamily='HelveticaNeue-Light'
                boxStyles={styles.birthdayInputBox}
                inputStyles={year ? {color: 'black'} : {color: 'silver'}}
            />
        </View>
    );
}

function CreateAccount(): React.JSX.Element {
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState<DateType>();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function onCreateAccountPress() {
        console.log('email: ', email);
        console.log('birthday: ', birthday);
        console.log('valid date? ', ValidateDate(birthday? birthday : {day: '18', month: 'June', year: '2002'}))

        // sample static profile for backend dev
        const newProfile : ProfileType = {
            profileID: 'mutable',
            username: username,
            password: password,
            birthday: {day: '18', month: 'June', year: '2002'},
            email: 'will@gmail.com',
            followers: [],
            following: [],
            followerCount: 0,
            followingCount: 0,
            posts: []
        }
        // API CALL
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
                <View style={styles.questionView} >
                    <Text style={styles.question} >Enter Your Birthday</Text>
                    <BirthdayInput stateSet={setBirthday} />
                </View>
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
        marginVertical: 56,
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
    birthdayInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between',
    },
    birthdayInputBox: {
        fontSize: 14,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 3,
        paddingVertical: 2,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    createAccount: {
        marginVertical: 20,
        fontFamily: 'HelveticaNeue-Medium',
        color: 'blue'
    }
});


export default CreateAccount;
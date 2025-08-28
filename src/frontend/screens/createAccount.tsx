import * as React from 'react'
import { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

import { ValidateEmail, ValidateUsername, ValidatePassword, ValidateDate } from '../util/newAccInputValidate';
import { apiCreateAccount } from '../services/api/endpoints/createAccount';
import BackArrow from '../components/common/backArrow';
import { rootNavigationRef } from '../navigation/navigationRef';

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
    stateSet: React.Dispatch<React.SetStateAction<DateType>>,
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
        stateSet( {day: day, month: month, year: year} );
    }, [day, month, year]);

    return (
        <View style={styles.birthdayInputContainer} >
            <SelectList 
                setSelected={(d : string | undefined) => setMonth(d ?? "")}
                placeholder='month'
                search={false}
                data={months} 
                save="value"
                fontFamily='HelveticaNeue-Light'
                boxStyles={styles.birthdayInputBox}
                inputStyles={month ? {color: 'black'} : {color: 'silver'}}

            />
            <SelectList 
                setSelected={(d : string | undefined) => setDay(d ?? "")}
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
                setSelected={(d: string | undefined) => setYear(d ?? "")}
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
    const [birthday, setBirthday] = useState<DateType>({day: '', month: '', year: ''});
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState('');

    function onCreateAccountPress() {
        // input validation for email
        if (!ValidateEmail(email? email : '')) {
            setStatus('Please Enter a Valid Email');
            return;
        }
        console.log('email: ', email);

        // input validation for username
        if (!ValidateUsername(username? username : '')) {
            setStatus('Please Enter a Valid Username');
            return;
        }
        console.log('username: ', username);

        // input validation for password
        if (!ValidatePassword(password? password : '')) {
            setStatus('Please Enter a Valid Password');
            return;
        }
        if (password !== confirmPassword) {
            setStatus('Your Passwords Do Not Match');
            return;
        }
        console.log('password: ', password);

        // input validation for birthday
        if (!ValidateDate(birthday? birthday : {day: 'I', month: 'Want', year: 'Burger'})) {
            setStatus('Please Enter a Valid Birthday');
            return;
        }
        console.log('birthday: ', birthday);

        // construct profile object
        const newProfile : ProfileType = {
            userID: '',
            email: email,
            username: username,
            password: password,
            birthday: birthday,
            follows: 0,
            follow_list: []
        }
        // API CALL
        apiCreateAccount(newProfile, setStatus)
    }

    return (
        <View style={styles.createPage} >
            <BackArrow onPress={() => rootNavigationRef.goBack()}/>
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
                <Text style={[{color: 'firebrick'}, styles.question]}>{status}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    createPage: {
        display: 'flex',
        width: '100%',
        height: '100%',
        marginTop: '28%',
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
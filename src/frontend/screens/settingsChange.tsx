import { TextInput } from "react-native-gesture-handler";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";

import { RootNavScreens } from "../navigation/navigationRef";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { rootNavigationRef } from "../navigation/navigationRef";
type Props = NativeStackScreenProps<RootNavScreens, "SettingsChange">;

import BackArrow from "../components/common/backArrow";
import { apiEditProfile } from "../services/api/endpoints/editProfile";
import { ValidateEmail, ValidateUsername, ValidatePassword } from "../util/newAccInputValidate";
import { ProfileType } from "../types/profile";
import { sleep } from "../util/sleep";

function SettingsChange({route, navigation}: Props) {
    // api call to change user information
    const attribute = route.params?.attribute;
    const userID = route.params?.userID
    const newValue = route.params?.newValue;

    const [attribute1, setAttribute1] = useState('');
    const [attribute2, setAttribute2] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const resetError = () => {
        setError('');
    }

    const handleChange = async () => {
        let pp : Partial<ProfileType> = {}
        let check : boolean = true;

        // check for input validity
        if (attribute1 !== attribute2) {
            check = false;
            setError("Value Inputs Do Not Match!");
        }
        if (attribute === "username") {
            pp = {"username" : attribute1}
            if (!ValidateUsername(attribute1)) {
                check = false;
                setError("Invalid " + attribute + "!");
            }
        }
        else if (attribute === "email") {
            pp = {"email" : attribute1}
            if (!ValidateEmail(attribute1)) {
                check = false;
                setError("Invalid " + attribute + "!");
            }
        }
        else if (attribute === "password") {
            pp = {"password" : attribute1}
            if (!ValidatePassword(attribute1)) {
                check = false;
                setError("Invalid " + attribute + "!");
            }
        }
        if (check) {
            console.log("Checking...");
            const status = await apiEditProfile(userID, pp, setError);
            console.log("PATCH status: ", status);
            if (status < 300){
                setSuccess("Success!");
                await sleep(1000);
                rootNavigationRef.goBack();
            }
        }
    };

    return (
        <View style={styles.createPage} >
            <BackArrow onPress={() => rootNavigationRef.goBack()} height={92} />
            <Text style={styles.header} >Change Info</Text>
            <View style={styles.settingsBox} >
                <Text style={styles.bioLabel} >New {attribute}</Text>
                <TextInput
                    style={styles.attributeInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    multiline={false}
                    value={attribute1}
                    onChangeText={setAttribute1}
                    onChange={resetError}
                />
                <Text style={styles.bioLabel} >Confirm new {attribute}</Text>
                <TextInput
                    style={styles.attributeInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    multiline={false}
                    value={attribute2}
                    onChangeText={setAttribute2}
                    onChange={resetError}
                />
            <TouchableOpacity style={styles.changeContainer} onPress={handleChange} >
                <Text style={styles.text}>Change {attribute}</Text>
            </TouchableOpacity>
            <Text style={styles.text && {color: 'red'}}>{error}</Text>
            <Text style={styles.text && {color: 'green'}}>{success}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    createPage: {
        display: 'flex',
        width: '100%',
        height: '100%',
        marginTop: '10%',
        alignItems: 'center'
    },
    header: {
        fontFamily: 'HelveticaNeue-Bold',
        fontSize: 24,
        marginVertical: 56,
    },
    settingsBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 16,
        width: '85%',
        height: '70%',
        paddingVertical: 14,
        marginTop: -20,
    },
    optionView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: 40,
        marginTop: 20,
        borderWidth: 1.5,
        borderColor: 'grey',
        borderRadius: 4,
    },
    optionLabel: {
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 15,
    },
    bioLabel: {
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 15,
        marginTop: 30,
    },
    attributeInput: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: 40,
        marginTop: 10,
        borderWidth: 1.5,
        borderColor: 'grey',
        borderRadius: 8,
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
        marginBottom: 20,
        color: 'blue',
    },
    changeContainer: {
        marginTop: 30,
    }
});

export default SettingsChange;
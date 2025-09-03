import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import BackArrow from '../components/common/backArrow';
import { rootNavigationRef } from '../navigation/navigationRef';
import { getUserID, getAccessToken, clearAccessToken } from "../services/auth/keychain";
import { apiGetProfile } from '../services/api/endpoints/getProfile';
import { ProfileType, EmptyProfile } from '../types/profile';
import { apiEditProfile } from '../services/api/endpoints/editProfile';
import { sleep } from '../util/sleep';

function SettingsScreen() {
    const [bio, setBio] = useState('');
    const [profile, setProfile] = useState<ProfileType>(EmptyProfile);
    const [success, setSuccess] = useState('Set Bio');

    useEffect(() => {
        async function fetchProfile() {
            const jwt = await getAccessToken();
            const userID : string = await getUserID(jwt ? jwt : "NOIDFOUND");
            try {
                const res : ProfileType = await apiGetProfile(userID);
                setBio(res.bio ?? '');
                setProfile(res);

            } catch (err) {
                console.log("Error:", err instanceof Error ? err.message : err);
                Alert.alert("Something went wrong", err instanceof Error ? err.message : "Unknown error");
            }
        }
        fetchProfile()
    }, []);

    async function changeBio() {
        if (bio.length > 104) {
            setSuccess("New Bio Is Too Long!");
            await sleep(2000);
            setSuccess("Set Bio");

        } else {
            const status = await apiEditProfile(
                profile.userID,
                {bio: bio},
                () => null
            )
            if (status === 204){
                setSuccess("Bio Set!");
                await sleep(2000);
                setSuccess("Set Bio");
            }
        }
    }

    function LogOut() {
        clearAccessToken();
        rootNavigationRef.navigate("Login");
    }

    return (
        <View style={styles.createPage} >
            <BackArrow onPress={() => rootNavigationRef.goBack()} height={92} />
            <Text style={styles.header} >Settings</Text>
            <View style={styles.settingsBox} >

                <TouchableOpacity style={styles.optionView} onPress={() =>
                    rootNavigationRef.navigate('SettingsChange', { attribute: 'username', userID:profile.userID, newValue: profile.username })} >
                    <Text style={styles.optionLabel} >Change Username</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionView} onPress={() =>
                    rootNavigationRef.navigate('SettingsChange', { attribute: 'email', userID:profile.userID, newValue: profile.email })} >
                    <Text style={styles.optionLabel} >Change Email</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.optionView} onPress={() =>
                    rootNavigationRef.navigate('SettingsChange', { attribute: 'password', userID:profile.userID, newValue: profile.password })} >
                    <Text style={styles.optionLabel} >Change Password</Text>
                </TouchableOpacity>

                <Text style={styles.bioLabel} >Change Bio</Text>
                <TextInput style={styles.bioView} multiline={true} value={bio} onChangeText={setBio} />
                <TouchableOpacity onPress={changeBio}>
                    <Text
                        style={styles.text && (
                            (success === "Set Bio") ? {color: 'blue'}
                                : (success === "New Bio Is Too Long!") ? {color: "red"} : {color: "green"} )} >{success}</Text>  
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.deleteContainer} onPress={LogOut} >
                    <Text style={styles.text} >Log Out</Text>  
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
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 16,
        width: '85%',
        height: '75%',
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
        fontFamily: 'HelveticaNeue',
        fontSize: 15,
    },
    bioLabel: {
        fontFamily: 'HelveticaNeue',
        fontSize: 16,
        marginTop: 30,
    },
    bioView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: '50%',
        marginVertical: 10,
        borderWidth: 1.5,
        borderColor: 'grey',
        borderRadius: 15,
        padding: 10,
        fontFamily: 'HelveticaNeue-Light',
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
        marginBottom: 20,
        color: 'red',
    },
    deleteContainer: {
        position: 'absolute',
        bottom: 0,
    }
});

export default SettingsScreen;
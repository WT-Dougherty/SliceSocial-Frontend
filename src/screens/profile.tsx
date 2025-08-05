import * as React from 'react'
import {View, Text, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';

const settingsName : string = 'Settings';

function ProfileScreen() {
    const navigation = useNavigation();

    return (
        <View>
            <Text>Profile</Text>
            <Button onPress={() => navigation.navigate(settingsName)}>
                Settings
            </Button>
        </View>
    )
}

export default ProfileScreen;
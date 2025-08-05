import * as React from 'react'
import {View, Text, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';

function ProfileScreen() {
    const navigation = useNavigation();

    return (
        <View>
            <Text>Profile</Text>
            <Button onPress={() => navigation.navigate('Settings')}>
                Settings
            </Button>
        </View>
    )
}

export default ProfileScreen;
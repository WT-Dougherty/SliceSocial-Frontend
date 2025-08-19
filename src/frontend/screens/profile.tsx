import * as React from 'react'
import {View, Text, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';

const settingsName : string = 'Settings';

function ProfileScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.profile} >
            <Text>Profile</Text>
            <Button onPress={() => navigation.navigate(settingsName)}>
                Settings
            </Button>
        </View>
    )
}

// styles
const styles = StyleSheet.create({
  profile: {
    paddingTop: 80
  }
});

export default ProfileScreen;
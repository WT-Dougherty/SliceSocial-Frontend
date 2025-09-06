import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

function AddPostScreen() {

    return (
        <View style={styles.addPostScreen}>
            <Text style={styles.text}>Add Post</Text>
            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.photoInputBox}>
                    <Text style={styles.photoInputText}>Upload Photo</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    addPostScreen: {
        flex: 1,
        marginTop: '25%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    inputContainer: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '95%',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 6,
        padding: 8,
    },
    photoInputBox: {
        height: 80,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        borderRadius: 6,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: 'grey',
    },
    photoInputText: {
        fontSize: 12,
        color: 'grey',
    },
});

export default AddPostScreen;
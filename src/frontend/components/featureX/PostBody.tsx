import * as React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native';

// type declarations
type PostBodyParams = {
    image_url: string
};

// components
function PostBody({ image_url } : PostBodyParams ) {
    return (
        <View style={styles.postBody} >
            <Image style={styles.image} source={{ uri: image_url }} />
        </View>
    )
}

// styles
const styles = StyleSheet.create({
  postBody: {
    display: 'flex',
    alignItems: 'center'
  },
  image: {
    width: 350,
    height: 437.5,
    resizeMode: 'cover',
    borderRadius: 2,
  }
});

// final export
export default PostBody;
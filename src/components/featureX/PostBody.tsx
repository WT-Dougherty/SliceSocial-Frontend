import * as React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native';

// type declarations
import type { PostType } from '../../types/post.ts';
type PostBodyParams = {
    body: string
};

// components
function PostBody({ body } : PostBodyParams ) {
    return (
        <View style={styles.postBody} >
            <Image style={styles.image} source={{ uri: body }} />
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
    width: 300,
    height: 400,
    resizeMode: 'cover',
  }
});

// final export
export default PostBody;
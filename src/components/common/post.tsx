import * as React from 'react'
import { View, StyleSheet } from 'react-native';

// component imports
import PostHeader from '../featureX/PostHeader.tsx';
import PostBody from '../featureX/PostBody.tsx';

// type declarations
import { PostType, DateType } from '../../types/post.ts';
type PostParams = {
    post: PostType
};

// component
function Post( { post } : PostParams ) {
    return (
        <View style={styles.postStyle} >
            <PostHeader username={post.username} date={post.date} />
            <PostBody body={post.body} />
            {/* Add More Parts Here */}
        </View>
    )
}

// styles
const styles = StyleSheet.create({
  postStyle: {
    margin: 10,
    marginTop: 20,
    marginBottom: 20,
    borderStyle: "dotted",
    borderWidth: 1,
    borderColor: "red"
  }
});

// final export
export default Post;
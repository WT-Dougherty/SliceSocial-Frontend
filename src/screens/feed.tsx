import * as React from 'react'
import { StyleSheet, ScrollView } from 'react-native';

import Post from '../components/common/post';

// types
import { PostType } from '../types/post';
import { samplePost } from '../assets/SamplePosts';

function FeedScreen() {
    let posts : Array<PostType> = new Array(3).fill(samplePost);

    return (
        <ScrollView style={styles.feed} >
            { posts.map((post : PostType) => (
                <Post post={post} key={post.postID} />
            )) }
        </ScrollView>
    )
}

// styles
const styles = StyleSheet.create({
  feed: {}
});

export default FeedScreen;
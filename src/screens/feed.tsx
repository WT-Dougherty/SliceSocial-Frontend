import * as React from 'react'
import { StyleSheet, ScrollView } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import Post from '../components/common/post';

// types
import { PostType } from '../types/post';
import { samplePost } from '../assets/SamplePosts';

// sample posts
let SAMPLE_POSTS: Array<PostType> = Array.from({ length: 3 }, (_, i) => ({
    ...samplePost,
    postID: i.toString()
}));

function FeedScreen() {
    React.useEffect(() => {
        console.log(SAMPLE_POSTS);
    }, []);

    return (
        <BottomSheetModalProvider>
            <ScrollView style={styles.feed} >
                { SAMPLE_POSTS.map((post : PostType) => (
                    <Post post={post} key={post.postID} />
                )) }
            </ScrollView>
        </BottomSheetModalProvider>
    )
}

// styles
const styles = StyleSheet.create({
  feed: {}
});

export default FeedScreen;
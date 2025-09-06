import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import Post from '../components/common/post';

// types
import { CommentType, PostType } from '../types/post';

function FeedScreen() {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [comments, setComments] = useState<CommentType[]>([]);
    useEffect(() => {
        console.log("");
    }, []);

    return (
        <BottomSheetModalProvider>
            <ScrollView style={styles.feed} >
                { posts.map((post : PostType) => (
                    <Post post={post} image_url='' comments={comments} />
                )) }
            </ScrollView>
        </BottomSheetModalProvider>
    )
}

// styles
const styles = StyleSheet.create({
  feed: {
    flex: 1,
    marginVertical: 80,
  }
});

export default FeedScreen;
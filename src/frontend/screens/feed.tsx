import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, ScrollView } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import Post from '../components/common/post';
import { apiGetFriends } from '../services/api/endpoints/connections';
import { getAccessToken, getUserID } from '../services/auth/keychain';
import { apiGetUserPosts } from '../services/api/endpoints/posts';
import { apiGetPostPhoto } from '../services/api/endpoints/photos';

// types
import { CommentType, PostType } from '../types/post';

function FeedScreen() {
  const [friends, setFriends] = useState<string[]>([]);
  const [postsURL, setPostsURL] = useState<string[]>([]);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);
  useFocusEffect(
    useCallback(() => {
      let alive = true;

      (async () => {
        try {
          const jwt = await getAccessToken();
          const userID = await getUserID(jwt ?? 'NOIDFOUND');

          // 1) Friends
          const f = await apiGetFriends(userID);
          if (!alive) return;
          setFriends(f);

          // 2) Posts for all friends (batched)
          const postsByFriend = await Promise.all(
            f.map(fid => apiGetUserPosts(fid)),
          );
          const allPosts = postsByFriend.flat();
          if (!alive) return;

          // Reset before refill to prevent duplicates on refocus
          setPosts(allPosts);
          if (postsURL.length !== 0) {
            return;
          }
          setPostsURL([]);
          // 3) Post photos (batched)
          const urls = await Promise.all(
            allPosts.map(p => apiGetPostPhoto(p.postID)),
          );
          if (!alive) return;
          setPostsURL(urls);
        } catch (err) {
          console.log('Feed fetch error:', err);
        }
      })();

      // Proper cleanup
      return () => {
        alive = false;
      };
    }, []),
  );

  return (
    <BottomSheetModalProvider>
      <ScrollView style={styles.feed}>
        {posts.map((post: PostType, index) => (
          <Post
            key={post.postID}
            post={post}
            image_url={postsURL[index]}
            comments={comments}
          />
        ))}
      </ScrollView>
    </BottomSheetModalProvider>
  );
}

// styles
const styles = StyleSheet.create({
  feed: {
    flex: 1,
    marginVertical: 80,
  },
});

export default FeedScreen;

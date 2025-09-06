import { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

// component imports
import PostHeader from '../featureX/PostHeader.tsx';
import PostBody from '../featureX/PostBody.tsx';
import PostActivityBar from '../featureX/PostActivityBar.tsx';
import CommentPreview from '../featureX/CommentPreview.tsx';

// type declarations
import { CommentType, PostType } from '../../types/post.ts';
import { apiGetPostPhoto } from '../../services/api/endpoints/photos.ts';
type PostParams = {
    post: PostType,
    image_url: string,
    comments: CommentType[]
};

// component
function Post( { post, comments } : PostParams ) {
  const [IMAGEURL, setIMAGEURL] = useState('');
  useFocusEffect(
    useCallback(() => {
    async function fetchImage() {
      try {
        const PostURL : string = await apiGetPostPhoto(post.postID);
        setIMAGEURL(PostURL);
      } catch (err) {
        console.log("Error:", err instanceof Error ? err.message : err);
        Alert.alert("Something went wrong while fetching pro-pic", err instanceof Error ? err.message : "Unknown error");
      }
    }
    fetchImage()
  }, []));
  return (
      <View style={styles.postStyle} >
          <PostHeader username={post.username} date={post.posted_at} userID={post.userID} />
          <PostBody image_url={IMAGEURL} />
          <PostActivityBar comments={comments}/>
          <CommentPreview comments={comments} />
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
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "silver",
    padding: 5,
    borderRadius: 10,
  }
});

// final export
export default Post;
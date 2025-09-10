import { useCallback, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

// component imports
import PostHeader from '../featureX/PostHeader.tsx';
import PostBody from '../featureX/PostBody.tsx';
import PostActivityBar from '../featureX/PostActivityBar.tsx';
import CommentPreview from '../featureX/CommentPreview.tsx';

// type declarations
import { CommentType, PostType } from '../../types/post.ts';
type PostParams = {
  post: PostType;
  image_url: string;
  comments: CommentType[];
};

// component
function Post({ post, image_url, comments }: PostParams) {
  return (
    <View style={styles.postStyle}>
      <PostHeader
        username={post.username}
        date={post.posted_at}
        userID={post.userID}
      />
      <PostBody image_url={image_url} />
      <PostActivityBar comments={comments} />
      <Caption username={post.username} caption={post.caption} />
      <CommentPreview comments={comments} postID={post.postID} />
      {/* Add More Parts Here */}
    </View>
  );
}

function Caption({ username, caption }: { username: string; caption: string }) {
  return (
    <View style={styles.captionContainer}>
      <Text style={styles.captionText}>
        <Text style={styles.captionUsername}>{username}</Text>
        {'  '}
        {caption}
      </Text>
    </View>
  );
}

// styles
const styles = StyleSheet.create({
  postStyle: {
    margin: 10,
    marginTop: 20,
    marginBottom: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'silver',
    padding: 5,
    borderRadius: 10,
  },
  captionContainer: {
    marginTop: 6,
    marginStart: 6,
    paddingHorizontal: 6,
  },
  captionText: {
    fontSize: 14,
    color: '#000',
    lineHeight: 18,
    fontFamily: 'HelveticaNeue',
  },
  captionUsername: {
    fontWeight: '600',
    color: '#000',
    fontFamily: 'HelveticaNeue-Bold',
  },
});

// final export
export default Post;

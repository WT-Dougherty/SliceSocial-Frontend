import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// component import
import Comment from './Comment.tsx';
import { apiPostNewComment } from '../../services/api/endpoints/comments.ts';

// type declarations
import type { PostType, CommentType } from '../../types/post.ts';
import { apiGetUsername } from '../../services/api/endpoints/users.ts';
import { getAccessToken, getUserID } from '../../services/auth/keychain.ts';
import { sleep } from '../../util/sleep.ts';
type PostBodyParams = {
  comments: CommentType[];
  postID: string;
};

// components
// takes an array of 3 comments as input
function CommentPreview({ comments, postID }: PostBodyParams) {
  const [commentText, setCommentText] = useState('');
  const [username, setUsername] = useState('');

  const [submitColor, setSubmitColor] = useState('#1a73e8');
  const [toggleOff, setToggleOff] = useState(false);

  useEffect(() => {
    async function getUsername() {
      const userID = await getUserID((await getAccessToken()) ?? '');
      apiGetUsername(userID)
        .then(res => {
          setUsername(res);
        })
        .catch(e => {
          console.log(e);
        });
    }
    getUsername();
  }, []);

  async function handleSubmit() {
    if (!commentText.trim()) return;
    const res = await apiPostNewComment({
      postID: postID,
      username: username,
      comment: commentText,
    });
    console.log(res);
    setToggleOff(true);
    if (res !== 201) {
      setSubmitColor('red');
    } else {
      setSubmitColor('green');
    }
    await sleep(2000);
    setSubmitColor('#1a73e8');
    setToggleOff(false);
    setCommentText('');
  }
  return (
    <View>
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          placeholderTextColor="#9e9e9e"
          value={commentText}
          onChangeText={setCommentText}
          onSubmitEditing={handleSubmit}
        />
        <TouchableOpacity
          style={[
            styles.postButton,
            commentText.trim() || toggleOff
              ? { backgroundColor: submitColor }
              : styles.postButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!commentText.trim()}
        >
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
      {comments.map((comment: CommentType) => (
        <Comment key={comment.commentID} comment={comment} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
    gap: 8,
    width: '100%',
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    borderRadius: 16,
    width: '80%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#000',
    fontFamily: 'HelveticaNeue',
  },
  postButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  postButtonDisabled: {
    backgroundColor: '#b3d1ff',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'HelveticaNeue-Medium',
  },
});

// final export
export default CommentPreview;

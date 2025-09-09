import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// component import
import Comment from './Comment.tsx';

// type declarations
import type { PostType, CommentType } from '../../types/post.ts';
type PostBodyParams = {
  comments: CommentType[];
};

// components
// takes an array of 3 comments as input
function CommentPreview({ comments }: PostBodyParams) {
  const [commentText, setCommentText] = React.useState<string>('');

  function handleSubmit() {
    if (!commentText.trim()) return;
    // TODO: wire up to submit handler/API in the parent when available
    console.log('Submit comment:', commentText);
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
            !commentText.trim() && styles.postButtonDisabled,
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
    backgroundColor: '#1a73e8',
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

import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native';

// component import
import Comment from './Comment.tsx';

// type declarations
import type { PostType, CommentType } from '../../types/post.ts';
type PostBodyParams = {
    comments: CommentType[]
};

// components
// takes an array of 3 comments as input
function CommentPreview({ comments } : PostBodyParams ) {
    return (
      <View>
        { comments.map((comment : CommentType) => (
          <Comment key={comment.commentID} comment={comment} />
        ))}
      </View>
    )
}

// final export
export default CommentPreview;
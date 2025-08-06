import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native';

// type declarations
import type { PostType, CommentType } from '../../types/post.ts';
type PostBodyParams = {
    comments: Array<CommentType>
};

// components
function CommentPreview({ comments } : PostBodyParams ) {
    return (
        <View>
            ;
        </View>
    )
}

// styles
const styles = StyleSheet.create({
  commentPreview: {
    display: 'flex',
    alignItems: 'center'
  },
  comment: {
    width: 300,
    height: 400,
    resizeMode: 'cover',
  }
});

// final export
export default CommentPreview;
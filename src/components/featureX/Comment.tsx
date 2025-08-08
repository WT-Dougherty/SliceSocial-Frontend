import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native';

// type declarations
import type { CommentType, DateType } from '../../types/post.ts';
type CommentParams = {
    comment: CommentType
};

function Comment({ comment } : CommentParams) {
    const date : DateType = comment.date;
    
    return (
        <View style={styles.comment} >
            <View style={styles.header} >
                <Text>{comment.username}</Text>
                <Text style={styles.date} >{date.month + ' ' + date.day + ' ' + date.year}</Text>
            </View>
            <Text style={styles.body} >{comment.body}</Text>
        </View>
    )
}

// styles
const styles = StyleSheet.create({
  comment: {
    display: 'flex',
    margin: 10
  },
  header: {
    display: 'flex',
    flexDirection: 'row'
  },
  date: {
    fontSize: 10,
    marginLeft: 10
  },
  body: {}
});

// final export
export default Comment;
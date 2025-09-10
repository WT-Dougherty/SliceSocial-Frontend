import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { parseAsUTC } from '../../util/date.ts';

// type declarations
import type { CommentType } from '../../types/post.ts';
type CommentParams = {
  comment: CommentType;
};

function Comment({ comment }: CommentParams) {
  const date: Date = parseAsUTC(comment.posted_at);

  return (
    <View style={styles.comment}>
      <View style={styles.header}>
        <Text style={styles.username}>{comment.username}</Text>
        <Text style={styles.date}>
          {date.getMonth() + ' ' + date.getDate() + ', ' + date.getFullYear()}
        </Text>
      </View>
      <Text style={styles.body}>{comment.comment}</Text>
    </View>
  );
}

// styles
const styles = StyleSheet.create({
  comment: {
    display: 'flex',
    margin: 10,
    marginLeft: 16,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontFamily: 'HelveticaNeue',
    fontSize: 15,
  },
  date: {
    marginLeft: 10,
    fontFamily: 'HelveticaNeue-UltraLight',
    fontSize: 8,
  },
  body: {
    marginTop: 5,
    marginLeft: 16,
    fontFamily: 'HelveticaNeue-Light',
    fontSize: 14,
  },
});

// final export
export default Comment;

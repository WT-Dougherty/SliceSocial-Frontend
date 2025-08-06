import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native';

// type declarations
import type { DateType } from '../../types/post.ts';
type PostHeaderParams = {
    username: string,
    date: DateType
};

// component
function PostHeader({ username, date } : PostHeaderParams ) {
    return (
        <View style={styles.postHeader} >
            <Text style={styles.username} >{username}</Text>
            <Text style={styles.date} >{date.month + ' ' + date.day + ' ' + date.year}</Text>
        </View>
    )
}

// styles
const styles = StyleSheet.create({
  postHeader: {
    display: 'flex',
    flexDirection: 'row',
    margin: 8
  },
  username: {
    margin: 3,
    marginRight: 10
  },
  date: {
    margin: 3,
    marginRight: 10,
    fontSize: 10,
  }
});

// final export
export default PostHeader;
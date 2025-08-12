import * as React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';

import ProfileIcon from '../../assets/icons/ProfileIcon.tsx';

// type declarations
import type { DateType } from '../../types/post.ts';
type PostHeaderParams = {
    username: string,
    date: DateType
};

// component
function PostHeader({ username, date } : PostHeaderParams ) {
  const ProfilePhoto: string = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
  return (
    <View style={styles.postHeader} >
      <ProfileIcon photoUri={ProfilePhoto} width={28} clr={'grey'} />
      <Text style={styles.username} >{username}</Text>
      <Text style={styles.date} >{date.month + ' ' + date.day + ', ' + date.year}</Text>
    </View>
  );
}

// styles
const styles = StyleSheet.create({
  postHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
    marginLeft: 10,
  },
  username: {
    marginHorizontal: 10,
    fontFamily: "HelveticaNeue-Medium",
    fontSize: 16,
  },
  date: {
    fontFamily: "HelveticaNeue-UltraLight",
    fontSize: 8,
  }
});

// final export
export default PostHeader;
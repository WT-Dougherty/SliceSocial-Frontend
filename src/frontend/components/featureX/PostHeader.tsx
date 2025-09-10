import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import ProfileIcon from '../../assets/icons/ProfileIcon.tsx';
import { parseAsUTC } from '../../util/date.ts';

import { apiGetProPic } from '../../services/api/endpoints/photos.ts';

// type declarations
type PostHeaderParams = {
  userID: string;
  username: string;
  date: string;
};

// component
function PostHeader({ username, date, userID }: PostHeaderParams) {
  const d: Date = parseAsUTC(date);

  const [propicURL, setPropicURL] = useState('');
  useFocusEffect(
    useCallback(() => {
      async function fetchPropic() {
        setPropicURL(await apiGetProPic(userID));
      }
      fetchPropic();
    }, []),
  );
  return (
    <View style={styles.postHeader}>
      <ProfileIcon photoUri={propicURL} width={28} clr={'grey'} />
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.date}>
        {d.getMonth() + ' ' + d.getDate() + ', ' + d.getFullYear()}
      </Text>
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
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 16,
  },
  date: {
    fontFamily: 'HelveticaNeue-UltraLight',
    fontSize: 8,
  },
});

// final export
export default PostHeader;

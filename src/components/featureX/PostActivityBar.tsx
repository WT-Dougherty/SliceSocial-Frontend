import * as React from 'react'
import { useState } from 'react';
import { View, Pressable, StyleSheet, Button } from 'react-native';

import LikeIcon from '../../assets/icons/LikeIcon.svg'
import CommentIcon from '../../assets/icons/CommentIcon.svg'

function PostActivityBar() {
    const [like, setLike] = useState(false);

    function onLikePress() {
        setLike(!like);
        // TODO: API PUSH
    }
    function onCommentPress() {
        ;
    }

    return (
        <View style={styles.activityBar} >
            <Pressable onPress={onLikePress} style={styles.button} >
                <LikeIcon width={25} height={25} fill={like ? "#ff4a4aff" : "#f2f2f2ff"} />
            </Pressable>
            <Pressable onPress={onCommentPress} style={styles.button} >
                <CommentIcon width={25} height={25} fill={"#4a4a4a"} />
            </Pressable>
        </View>
    );
}

// styles
const styles = StyleSheet.create({
  activityBar: {
    margin: 5,
    display: "flex",
    flexDirection: "row"
  },
  button: {
    marginRight: 10
  }
});

export default PostActivityBar;
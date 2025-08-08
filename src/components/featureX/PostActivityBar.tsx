import * as React from 'react'
import { useState, useCallback, useMemo, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Button } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

import LikeIcon from '../../assets/icons/LikeIcon.svg'
import CommentIcon from '../../assets/icons/CommentIcon.svg'

import CommentPreview from './CommentPreview';

import { CommentType } from '../../types/post';
type PostActivityBarParams = {
    comments: Array<CommentType>
};

function PostActivityBar({ comments } : PostActivityBarParams) {

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [like, setLike] = useState(false);

    // snap points
    const snapPoints = useMemo(() => ['80%'], []);

    // callbacks
    const openComments = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const closeComments = useCallback(() => {
        bottomSheetModalRef.current?.dismiss();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    function onLikePress() {
        setLike(!like);
        // TODO: API PUSH
    }

    return (
        <View style={styles.activityBar} >
            <Pressable onPress={onLikePress} style={styles.button} >
                <LikeIcon width={25} height={25} fill={like ? "#ff4a4aff" : "#f2f2f2ff"} />
            </Pressable>
            <Pressable onPress={openComments} style={styles.button} >
                <CommentIcon width={25} height={25} fill={"#4a4a4a"} />
            </Pressable>
            
            <BottomSheetModal
            ref={bottomSheetModalRef}
            onChange={handleSheetChanges}
            snapPoints={snapPoints}
            index={1}
            backdropComponent={(props) => (
                <BottomSheetBackdrop {...props} pressBehavior="none" disappearsOnIndex={-1} />
            )}
            >
                <BottomSheetScrollView
                contentContainerStyle={styles.commentContainerStyle}>
                    <Text style={styles.commentHeader} >Comment Section</Text>
                    <CommentPreview comments={comments} />
                    <Button title='Close Comments' onPress={closeComments} />
                </BottomSheetScrollView>
            </BottomSheetModal>
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
  },
  commentHeader: {
    fontSize: 20
  },
  commentContainerStyle: {
    flex: 1,
    alignItems: 'flex-start',
    margin: 25,
    marginTop: 0,
  },
});

export default PostActivityBar;
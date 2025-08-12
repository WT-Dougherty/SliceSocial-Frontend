import * as React from 'react'
import { useState, useCallback, useMemo, useRef } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

// icons
import CommentIcon from '../../assets/icons/CommentIcon.svg'
import LikeButton from './LikeButton';

// comment popup
import CommentPreview from './CommentPreview';

// type defs
import { CommentType } from '../../types/post';
type PostActivityBarParams = {
    comments: Array<CommentType>
};

function PostActivityBar({ comments } : PostActivityBarParams) {

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // snap points
    const snapPoints = useMemo(() => ['70%', '75%'], []);

    // callbacks
    const openComments = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    return (
        <View style={styles.activityBar} >
            <LikeButton />
            <Pressable onPress={openComments} style={styles.button} >
                <CommentIcon width={25} height={25} fill={"#4a4a4a"} />
            </Pressable>
            
            <BottomSheetModal
            ref={bottomSheetModalRef}
            onChange={handleSheetChanges}
            snapPoints={snapPoints}
            index={0}
            backdropComponent={(props) => (
                <BottomSheetBackdrop {...props} pressBehavior="close" opacity={0.1} appearsOnIndex={0} disappearsOnIndex={-1} />
            )}
            >
                <BottomSheetScrollView
                contentContainerStyle={styles.commentContainerStyle}
                stickyHeaderIndices={[0]}>
                    <View style={styles.commentContainerHeader} >
                        <Text style={styles.commentHeader} >Comments</Text>
                    </View>
                    <CommentPreview comments={comments} />
                </BottomSheetScrollView>
            </BottomSheetModal>
        </View>
    );
}

// styles
const styles = StyleSheet.create({
  activityBar: {
    margin: 10,
    marginLeft: 12,
    display: "flex",
    flexDirection: "row"
  },
  button: {
    marginRight: 10
  },
  commentHeader: {
    fontFamily: "HelveticaNeue",
    fontSize: 20,
    marginBottom: 10,

  },
  commentContainerStyle: {
    flex: 1,
    alignItems: 'flex-start',
    margin: 25,
    marginTop: 0,
  },
  commentContainerHeader: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
},
});

export default PostActivityBar;
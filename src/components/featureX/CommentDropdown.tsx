import * as React from 'react'
import BottomSheet from '@gorhom/bottom-sheet';
import { useMemo } from 'react';
import { CommentType } from '../../types/post';
import { View } from 'react-native';

// component imports
import CommentPreview from './CommentPreview';

// type definitions
interface PropParam {
    comments: Array<CommentType>
}
type RefParam = BottomSheet

const CommentExpansion = React.forwardRef<RefParam, PropParam>((props, ref) => { 
    const snapPoints = useMemo(() => ['50%', '90%'], []);

    return (
        <BottomSheet
        ref={ref}
        index={0}
        enablePanDownToClose={true}
        snapPoints={snapPoints}
        >
            <View>
                <CommentPreview comments={props.comments} />
            </View>
        </BottomSheet>
    )
});

export default CommentExpansion;
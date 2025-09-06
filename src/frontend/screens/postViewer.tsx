import { RootNavScreens } from "../navigation/navigationRef";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, StyleSheet } from "react-native";
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { PostType } from "../types/post";
import Post from "../components/common/post";
import BackArrow from "../components/common/backArrow";
type Props = NativeStackScreenProps<RootNavScreens, "PostViewer">;

function PostViewer({route, navigation} : Props) {
    return (
        <BottomSheetModalProvider>
            <BackArrow height={90} onPress={() => navigation.goBack()} />
            <View style={styles.postContainer}>
                <Post
                post={route.params.post}
                image_url={route.params.url}
                comments={route.params.comments}
                />
            </View>
        </BottomSheetModalProvider>
    )
}

const styles = StyleSheet.create({
    postContainer: {
        marginTop: 100
    }
});

export default PostViewer;
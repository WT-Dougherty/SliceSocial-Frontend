import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import LikeIcon from '../../assets/icons/LikeIcon.svg';

function LikeButton() {
    const [like, setLike] = useState(false);

    function onLikePress() {
        setLike( !like );
        // TODO: API call
    }
    
    return (

        <Pressable onPress={onLikePress} style={styles.button} >
            <LikeIcon
            width={27}
            height={27}
            fill={like ? '#f2f2f2ff' : '#ff8080ff'}
            stroke={like ? '#4a4a4a' : '#ff8080ff'}
            />
        </Pressable>

    );
}

const styles = StyleSheet.create({
    button: {
        marginRight: 10,
    }
})

export default LikeButton
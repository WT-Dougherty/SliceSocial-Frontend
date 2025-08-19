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
            fill={like ? '#ff8080ff' : '#f2f2f2ff'}
            stroke={like ? '#ff8080ff' : '#4a4a4a'}
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
import {View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import { rootNavigationRef } from '../navigation/navigationRef';
import { getAccessToken, getUserID } from '../services/auth/keychain';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { apiGetProfile } from '../services/api/endpoints/getProfile';
import { apiGetPostPhoto, apiGetProPic } from '../services/api/endpoints/photos';

import ProfileIcon from '../assets/icons/ProfileIcon'
import { EmptyProfile, ProfileType } from '../types/profile';
import { CommentType, PostType } from '../types/post';
import { apiGetUserPosts } from '../services/api/endpoints/posts';

function ProfileScreen() {
  const [profilePhoto, setProfilePhoto] = useState('');
  const [posts, setPosts] = useState<PostType[]>([]);
  const [postsURL, setPostsURL] = useState<string[]>([]);
  const [postComments, setPostsComments] = useState<CommentType[]>([]);
  const [profile, setProfile] = useState<ProfileType>(EmptyProfile)
    
  useFocusEffect(
    useCallback(() => {
      async function fetchScreen() {
        const jwt = await getAccessToken();
        const userID : string = await getUserID(jwt ? jwt : "NOIDFOUND");

        // fetch profile information
        try {
          const res : ProfileType = await apiGetProfile(userID);
          setProfile(res);
        } catch (err) {
          console.log("Error:", err instanceof Error ? err.message : err);
          Alert.alert("Something went wrong while fetching profile info", err instanceof Error ? err.message : "Unknown error");
        }

        // fetch profile photo
        try {
          const proPicURL : string = await apiGetProPic(userID);
          setProfilePhoto(proPicURL);
        } catch (err) {
          console.log("Error:", err instanceof Error ? err.message : err);
          Alert.alert("Something went wrong while fetching pro-pic", err instanceof Error ? err.message : "Unknown error");
        }

        // fetch posts
        try {
          const posts : PostType[] = await apiGetUserPosts(userID);
          setPosts(posts);
        } catch (err) {
          console.log("Error:", err instanceof Error ? err.message : err);
          Alert.alert("Something went wrong while fetching posts", err instanceof Error ? err.message : "Unknown error");
        }

        // fetch posts photos
        posts.forEach(async post => {
          try {
            const url : string = await apiGetPostPhoto(post.postID);
            console.log("url: ", url);
            setPostsURL(prevArray => [...prevArray, url]);
          } catch (err) {
            console.log("Error:", err instanceof Error ? err.message : err);
            Alert.alert("Something went wrong while fetching posts", err instanceof Error ? err.message : "Unknown error");
          }
        });

      }
      fetchScreen()
    }, [])
  );

  const renderPostGrid = () => {
    return (
      <View style={styles.postsGrid}>
        {posts.map((post, index) => (
          <TouchableOpacity
          key={post.postID}
          style={styles.postPreview}
          onPress={() => rootNavigationRef.navigate("PostViewer", { post: post, url: postsURL[index], comments: postComments })}
          >
            <Image style={styles.postPreviewImage} source={{ uri: postsURL[index] }} />
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profileInfo}>
          <View style={styles.photoContainer}>
            <ProfileIcon photoUri={profilePhoto} width={100} clr={'grey'} />
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{posts.length}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{profile.follows}</Text>
              <Text style={styles.statLabel}>Follows</Text>
            </View>
          </View>
        </View>
        
        {/* Username and Bio */}
        <View style={styles.userInfo}>
          <Text style={styles.username}>{profile.username}</Text>
          <Text style={styles.bio}>{profile.bio}</Text>
        </View>
        
        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
          style={styles.editButton}
          onPress={() => rootNavigationRef.navigate("Settings")}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Posts Grid */}
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.postsSection}>
        {renderPostGrid()}
      </View>
    </ScrollView>
    </View>
  )
}

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  profileHeader: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  photoContainer: {
    marginRight: 20,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  userInfo: {
    marginBottom: 15,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  bio: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#d7d7d7ff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  postsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: 20,
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  postPreview: {
    width: '31%',
    aspectRatio: 0.8,
    marginBottom: 10,
  },
  postPreviewContent: {
    flex: 1,
    padding: 8,
    justifyContent: 'space-between',
  },
  postPreviewText: {
    fontSize: 12,
    color: '#333',
    lineHeight: 16,
  },
  postPreviewImage: {
    height: '100%',
    width: '100%',
    borderRadius: 4,
  },
});

export default ProfileScreen;
import {View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Button } from '@react-navigation/elements';
import { rootNavigationRef } from '../navigation/navigationRef';
import { getAccessToken, getUserID } from '../services/auth/keychain';
import { apiGetProfile } from '../services/api/endpoints/getProfile';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import ProfileIcon from '../assets/icons/ProfileIcon'
import { EmptyProfile, ProfileType } from '../types/profile';
import { PostType } from '../types/post';

function ProfileScreen() {
  const ProfilePhoto: string = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
  const PostPhoto: string = 'https://www.meisterdrucke.ie/kunstwerke/1000px/Caspar%20David%20Friedrich%20-%20Der%20Wanderer%20ber%20dem%20Nebelmeer%20-%20(MeisterDrucke-680291).jpg';
  const [profile, setProfile] = useState<ProfileType>(EmptyProfile)
  const [userPosts, setUserPosts] = useState<PostType[]>([]);
  
  // Mock posts for demonstration - replace with actual API call
  const mockPosts: PostType[] = [
    {
      postID: "1",
      username: profile.username,
      date: { day: "15", month: "Dec", year: "2024" },
      body: "Beautiful sunset today! 🌅",
      likes: 42,
      comments: []
    },
    {
      postID: "2", 
      username: profile.username,
      date: { day: "14", month: "Dec", year: "2024" },
      body: "Coffee and coding ☕️",
      likes: 28,
      comments: []
    },
    {
      postID: "3",
      username: profile.username,
      date: { day: "13", month: "Dec", year: "2024" },
      body: "Weekend vibes 🎉",
      likes: 67,
      comments: []
    },
    {
      postID: "4",
      username: profile.username,
      date: { day: "12", month: "Dec", year: "2024" },
      body: "New project coming soon! 🚀",
      likes: 89,
      comments: []
    },
    {
      postID: "5",
      username: profile.username,
      date: { day: "11", month: "Dec", year: "2024" },
      body: "Learning new things every day 📚",
      likes: 34,
      comments: []
    },
    {
      postID: "6",
      username: profile.username,
      date: { day: "10", month: "Dec", year: "2024" },
      body: "Great day with friends! 👥",
      likes: 56,
      comments: []
    }
  ];
    
  useFocusEffect(
    useCallback(() => {
      async function fetchProfile() {
        const jwt = await getAccessToken();
        const userID : string = await getUserID(jwt ? jwt : "NOIDFOUND");
        try {
          const res : ProfileType = await apiGetProfile(userID);
          setProfile(res);
          // Set mock posts after profile is loaded
          setUserPosts(mockPosts);
        } catch (err) {
          console.log("Error:", err instanceof Error ? err.message : err);
          Alert.alert("Something went wrong", err instanceof Error ? err.message : "Unknown error");
        }
      }
      fetchProfile()
    }, [])
  );

  const renderPostGrid = () => {
    return (
      <View style={styles.postsGrid}>
        {userPosts.map((post, index) => (
          <TouchableOpacity key={post.postID} style={styles.postPreview}>
            <Image style={styles.postPreviewImage} source={{ uri: PostPhoto }} />
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
            <ProfileIcon photoUri={profile.profilePicture || ProfilePhoto} width={100} clr={'grey'} />
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userPosts.length}</Text>
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
import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";

import images from "@/constants/images";
import SearchInput from "@/components/SearchInput";
import { Trending } from "@/components/Trending";
import { EmptyState } from "@/components/EmptyState";
import { VideoCard } from "@/components/videoCard";

import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";

const Home = () => {
  const { data, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={data}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => <VideoCard key={item.$id} video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Muhammad
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  alt="logo"
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput
              title="Search"
              value={search}
              handleChangeText={setSearch}
              placeholder="Search..."
            />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>

              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subTitle="Be The First One To Uplad a Video!"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;

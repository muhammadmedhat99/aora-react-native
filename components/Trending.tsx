import { FlatList, Text } from "react-native";
import React from "react";

interface TrendingProps {
  posts: { $id: string }[] | [];
}
export const Trending = ({ posts }: TrendingProps) => {
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <Text className="text-3xl text-white">{item.$id}</Text>
      )}
      keyExtractor={(item) => item.$id}
      horizontal={true}
    />
  );
};

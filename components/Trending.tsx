import React, { useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { icons } from "@/constants";

const zoomIn = { 0: { scale: 0.8 }, 1: { scale: 1 } };
const zoomOut = { 0: { scale: 1 }, 1: { scale: 0.8 } };

const TrandingItem = ({ item, activeItem }: any) => {
  const [play, setPlay] = useState(false);
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item?.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Text>Playing</Text>
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item?.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image source={icons.play} className="absolute size-12" />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};
export const Trending = ({ posts }: any) => {
  const [activeItem, setActiveItem] = useState(posts[1]?.$id);
  const viewableItemChanges = ({ viewableItems }: any) => {
    setActiveItem(viewableItems[0]?.$id);
  };

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <TrandingItem item={item} activeItem={activeItem} />
      )}
      keyExtractor={(item) => item.$id}
      onViewableItemsChanged={viewableItemChanges}
      horizontal={true}
    />
  );
};

import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { icons } from "@/constants";
import { useVideoPlayer, VideoView } from "expo-video";

const zoomIn = {
  0: { transform: [{ scale: 0.8 }] },
  1: { transform: [{ scale: 1 }] },
};
const zoomOut = {
  0: { transform: [{ scale: 1 }] },
  1: { transform: [{ scale: 0.8 }] },
};

const TrandingItem = ({ item, activeItem }: any) => {
  const [play, setPlay] = useState(false);

  const player = useVideoPlayer(
    `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`,
    (player) => {
      player.loop = true;
    }
  );

  useEffect(() => {
    const updatePlaying = () => {
      setPlay(player.playing);
    };
    player.addListener("playingChange", updatePlaying);
    return () => player.removeListener("playingChange", updatePlaying);
  }, [player]);
  return play ? (
    <VideoView player={player} style={styles.video} />
  ) : (
    <Animatable.View
      className="mr-[20px]"
      animation={activeItem === item?.$id ? zoomIn : zoomOut}
      duration={500}
    >
      <TouchableOpacity
        className="relative justify-center items-center"
        activeOpacity={0.7}
        onPress={() => {
          setPlay(true);
          player.play();
        }}
      >
        <ImageBackground
          source={{ uri: item?.thumbnail }}
          className="w-[208px] h-[288px] rounded-[35px] my-[20px] overflow-hidden shadow-lg shadow-black/40"
          resizeMode="cover"
        />

        <Image source={icons.play} className="absolute size-12" />
      </TouchableOpacity>
    </Animatable.View>
  );
};

export const Trending = ({ posts }: any) => {
  const [activeItem, setActiveItem] = useState(posts[1]?.$id);
  const viewableItemChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems?.length > 0) {
      setActiveItem(viewableItems[0]?.key);
    }
  }).current;

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <TrandingItem item={item} activeItem={activeItem} />
      )}
      keyExtractor={(item) => item.$id}
      onViewableItemsChanged={viewableItemChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 60,
      }}
      contentOffset={{ x: 100, y: 0 }}
      horizontal={true}
    />
  );
};

const styles = StyleSheet.create({
  video: {
    width: 208,
    height: 288,
    borderRadius: 35,
    marginVertical: 20,
    marginRight: 20,
    backgroundColor: "#ffffff10",
  },
});

import { Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "@/constants";
import { useState } from "react";

export const VideoCard = ({ video }: any) => {
  const [play, setPlay] = useState(false);
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="size-[46px] rounded-lg border border-secondary p-0.5">
            <Image
              source={{ uri: video?.creator?.avatar }}
              resizeMode="cover"
              className="size-full rounded-lg"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text className="text-white font-psemibold text-sm">
              {video?.title}
            </Text>
            <Text
              className="text-gray-100 font-pregular text-xs"
              numberOfLines={1}
            >
              {video?.creator?.username}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image
            source={icons?.menu}
            className="size-5"
            resizeMode={"contain"}
          />
        </View>
      </View>

      {play ? (
        <Text className="text-white">Playing</Text>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: video?.thumbnail }}
            className="size-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons?.play}
            className="absolute size-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

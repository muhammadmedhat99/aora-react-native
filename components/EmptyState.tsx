import { Image, Text, View } from "react-native";
import { images } from "@/constants";
import React from "react";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

interface EmptyStateProps {
  title: string;
  subTitle: string;
}

export const EmptyState = ({ title, subTitle }: EmptyStateProps) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[250px]"
        resizeMode="contain"
      />
      <Text className="text-xl text-center font-psemibold text-white mt-2">
        {title}
      </Text>
      <Text className="font-pmedium text-sm text-gray-100">{subTitle}</Text>

      <CustomButton
        className="w-full my-5"
        title="Create Video"
        onPress={() => router.push("/create")}
      />
    </View>
  );
};

import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import { router } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
export default function Index() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />

          <View className="mt-5">
            <Text className="font-pbold text-3xl text-white text-center">
              Discover Endless Possibilities{" "}
              <View className="relative">
                <Text className="font-pbold text-3xl text-center text-secondary-200">
                  Aora
                </Text>
                <Image
                  source={images.path}
                  className="w-20 h-10 absolute -bottom-5 right-0"
                  resizeMode="contain"
                />
              </View>
            </Text>

            <Text className="text-gray-100 mt-7 text-center font-pregular text-sm">
              Where Creativity meets innovation: embark on a journey of
              limitless exploration with Aora
            </Text>
          </View>

          <CustomButton
            title="Continue with email"
            onPress={() => {
              router.push("/sign-in");
            }}
            className="mt-7 w-full"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

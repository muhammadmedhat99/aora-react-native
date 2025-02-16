import React from "react";
import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
interface IFormInput {
  email: string;
  password: string;
}
const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const submitForm = async (data: IFormInput) => {
    try {
      signIn({ email: data.email, password: data.password });
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);
      reset({ email: "", password: "" });
      router.replace("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[82.5vh] px-4 my-6">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          />
          <Text className="text-2xl text-white font-psemibold mt-10">
            Login to Aora
          </Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <FormField
                title="Email"
                placeholder="Enter your email address"
                value={value}
                handleChangeText={onChange}
                otherStyle="mt-7"
                keyboardType="email-address"
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <FormField
                title="Password"
                placeholder="Enter your password"
                value={value}
                handleChangeText={onChange}
                otherStyle="mt-7"
                errorMessage={errors.password?.message}
              />
            )}
          />

          <CustomButton
            title="Sign In"
            className="mt-7"
            onPress={handleSubmit(submitForm)}
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?{" "}
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

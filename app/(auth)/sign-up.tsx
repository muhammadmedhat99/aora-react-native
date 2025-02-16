import React from "react";
import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { username: "", email: "", password: "" },
  });

  const submitForm = async (data: IFormInput) => {
    try {
      const result = await createUser(data);
      setUser(result);
      setIsLoggedIn(true);
      reset({ email: "", password: "", username: "" });
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
            Sign up to Aora
          </Text>

          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value } }) => (
              <FormField
                title="Username"
                placeholder="Enter your username"
                value={value}
                handleChangeText={onChange}
                otherStyle="mt-7"
                errorMessage={errors.username?.message}
              />
            )}
          />
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
            title="Create Account"
            className="mt-7"
            onPress={handleSubmit(submitForm)}
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Do you have an account?{" "}
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

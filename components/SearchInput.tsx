import {
  Image,
  KeyboardTypeOptions,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

interface SearchInputProps {
  title: string;
  value: string;
  handleChangeText: (text: string) => void;
  placeholder?: string;
  otherStyle?: string;
  keyboardType?: KeyboardTypeOptions;
  errorMessage?: string;
}
const SearchInput = ({
  title,
  value,
  handleChangeText,
  placeholder,
  otherStyle,
  keyboardType,
  errorMessage,
  ...props
}: SearchInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="flex-row border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center space-x-4">
      <TextInput
        value={value}
        className="flex-1 text-white font-pregular text-base mt-0.5"
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
        keyboardType={keyboardType}
      />

      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

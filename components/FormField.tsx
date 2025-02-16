import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardTypeOptions,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

interface FormFieldProps {
  title: string;
  value: string;
  handleChangeText: (text: string) => void;
  placeholder?: string;
  otherStyle?: string;
  keyboardType?: KeyboardTypeOptions;
  errorMessage?: string;
}
const FormField = ({
  title,
  value,
  handleChangeText,
  placeholder,
  otherStyle,
  keyboardType,
  errorMessage,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyle}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="flex-row border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center">
        <TextInput
          value={value}
          className="flex-1 text-white font-psemibold"
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={keyboardType}
        />

        {title === "Password" && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className=""
          >
            <Image
              source={showPassword ? icons.eyeHide : icons.eye}
              className="size-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>

      {errorMessage && (
        <Text className="text-xs font-psemibold text-red-600 px-2 mt-2">
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default FormField;

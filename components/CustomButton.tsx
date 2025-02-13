import { Text, TouchableOpacity } from "react-native";
import React from "react";
interface CustomButtonProps {
  title: string;
  className?: string;
  onPress?: () => void;
  textClassName?: string;
  isLoading?: boolean;
}
const CustomButton = ({
  title,
  className,
  onPress,
  textClassName,
  isLoading,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${className} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
      onPress={onPress}
    >
      <Text className={`text-primary font-psemibold text-lg ${textClassName}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

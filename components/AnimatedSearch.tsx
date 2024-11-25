import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Text, TouchableOpacity } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";

const placeholders: string[] = [
  'Search "milk"',
  'Search "bread"',
  'Search "eggs"',
  'Search "fruits"',
];

const AnimatedSearch: React.FC = () => {
  const [placeholderIndex, setPlaceholderIndex] = useState<number>(0);
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      // Animate out the current placeholder
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 10, // Move down slightly
          duration: 300,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // After animation completes, update the placeholder index and animate the new one in
        setPlaceholderIndex(
          (prevIndex) => (prevIndex + 1) % placeholders.length
        );

        // Reset animation values
        opacityAnim.setValue(0);
        translateYAnim.setValue(-10); // Start slightly above

        // Animate the new placeholder in
        Animated.parallel([
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(translateYAnim, {
            toValue: 0, // Move back to normal position
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [opacityAnim, translateYAnim]);

  const handlePress = () => {
    router.navigate("/search"); // Replace with actual navigation to the search screen
  };

  return (
    <TouchableOpacity
      className="flex-row items-center bg-white rounded-xl px-2 py-4  my-2 shadow w-full"
      onPress={handlePress}
    >
      <MagnifyingGlassIcon />
      <Animated.View
        style={{
          flex: 1,
          marginLeft: 8,
          transform: [{ translateY: translateYAnim }],
          opacity: opacityAnim,
        }}
      >
        <Text className="text-black text-xl">
          {placeholders[placeholderIndex]}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default AnimatedSearch;

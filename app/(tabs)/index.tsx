import CartComponent from "@/components/CartComponent";
import Homepage from "@/components/Homepage";
import "@/global.css";
import { View } from "react-native";

const Index = () => {
  return (
    <View>
      <Homepage />
      <CartComponent/>
    </View>
  );
};

export default Index;

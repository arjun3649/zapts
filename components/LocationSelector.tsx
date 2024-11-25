import address from "@/utils/AddressList";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo } from "react";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AddressItem from "./AddressItem";

interface Address {
  id: string | number;
  type: "home" | "business";
  title: string;
  distance: string;
  address: string;
}

interface LocationSelectorProps {
  onAddressSelect: (address: string) => void;
}

type LocationSelectorRef = React.ForwardedRef<BottomSheet>;

const LocationSelector = forwardRef<BottomSheet, LocationSelectorProps>(
  ({ onAddressSelect }, ref) => {
    const snapPoints = useMemo(() => ["25%", "50%", "80%", "950%"], []);

    return (
      <BottomSheet
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        index={-1}
        style={[styles.bottomSheet]}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Select location</Text>

          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={20}
              color="#888"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for area, street name..."
              placeholderTextColor="#888"
            />
          </View>

          <TouchableOpacity style={styles.currentLocationButton}>
            <Ionicons name="locate" size={20} color="#4CAF50" />
            <Text style={styles.currentLocationText}>
              Go to current location
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#888" />
          </TouchableOpacity>

          <Text style={styles.savedAddressesTitle}>Your saved addresses</Text>

          <BottomSheetScrollView>
            {(address as Address[]).map((item) => (
              <AddressItem
                key={item.id}
                type={item.type}
                title={item.title}
                distance={item.distance}
                address={item.address}
                handleclick={() => onAddressSelect(item.address)}
              />
            ))}
          </BottomSheetScrollView>
        </View>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fafafa",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  currentLocationButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  currentLocationText: {
    flex: 1,
    marginLeft: 8,
    color: "#4CAF50",
    fontWeight: "bold",
  },
  savedAddressesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4b5563",
    marginBottom: 12,
  },
});

export default LocationSelector;

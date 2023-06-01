import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

import { capitalizeEachWord } from "../../../utils/string-util";

export default PokemonListView = ({
  pokemonList = [],
  onResfresh,
  refreshing,
}) => {
  const navigation = useNavigation();

  const ListItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: "#ffffff",
          borderRadius: 14,
          borderWidth: 2,
          borderColor: "#000000",
          marginVertical: 8,
          padding: 12,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        onPress={() =>
          navigation.navigate("DetailsScreen", { pokemon_url: item?.url })
        }
      >
        <Text>{capitalizeEachWord(item?.name)}</Text>
        <Ionicons
          name="chevron-forward-circle-outline"
          size={18}
          color="#1C3666"
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      {refreshing ? <ActivityIndicator /> : null}
      <FlatList
        contentContainerStyle={{ paddingBottom: 20 }}
        data={pokemonList}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `pokemon-item-${index}`}
        renderItem={({ item, index }) => {
          return <ListItem item={item} />;
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onResfresh()}
          />
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
});

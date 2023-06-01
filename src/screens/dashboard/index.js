import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";

import {
  getInitialPokemonList,
  getNewListFromPageURL,
  getNewListFromRandomOffset,
} from "../../../api/pokemon-utils";

import PokemonListView from "./components/PokemonListView";

export default function DashboardScreen() {
  const [pokemonList, setPokemonList] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    getPokemonList();
  }, []);

  const getPokemonList = async () => {
    setRefreshing(true);
    const list = await getInitialPokemonList();
    setPokemonList(list);
    setRefreshing(false);
  };

  const onPressPage = async (url) => {
    const list = await getNewListFromPageURL(url);
    setPokemonList(list);
  };

  const onPressRandomPage = async (count) => {
    const offset = Math.random() * count;
    const list = await getNewListFromRandomOffset(offset);
    setPokemonList(list);
  };

  const renderNavButtons = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginVertical: 18,
        }}
      >
        <TouchableOpacity
          style={styles.navButtons}
          disabled={pokemonList?.previous == null ? true : false}
          onPress={() => onPressPage(pokemonList?.previous)}
        >
          <MaterialCommunityIcons
            name={
              pokemonList?.previous == null
                ? "page-previous-outline"
                : "page-previous"
            }
            size={24}
            color="#000000"
          />
          <Text>Previous Page</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButtons}
          disabled={pokemonList?.next == null ? true : false}
          onPress={() => onPressPage(pokemonList?.next)}
        >
          <MaterialCommunityIcons
            name={pokemonList?.next == null ? "page-next-outline" : "page-next"}
            size={24}
            color="#000000"
          />
          <Text>Next Page</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButtons}
          onPress={() => onPressRandomPage(pokemonList?.count)}
        >
          <FontAwesome name="random" size={24} color="#000000" />
          <Text>Random Page</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderNavButtons()}
      <PokemonListView
        pokemonList={pokemonList?.results}
        onResfresh={() => getPokemonList()}
        refreshing={refreshing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AFAFAF",
    paddingHorizontal: 16,
    paddingTop: 42,
  },
  navButtons: {
    flex: 0.3,
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    padding: 8,
  },
});

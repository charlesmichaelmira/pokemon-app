import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from "react-native";

import { capitalizeEachWord } from "../../utils/string-util";
import { getColorByType } from "../../utils/color-utils";

import { getPokemonByURL, getPokemonSpecies } from "../../../api/pokemon-utils";

export default function DetailsScreen({ route }) {
  const { pokemon_url } = route?.params;

  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState(null);
  const [pokemonSpecies, setPokemonSpecies] = useState(null);

  useEffect(() => {
    const getPokemonDetail = async () => {
      const detail = await getPokemonByURL(pokemon_url);
      setPokemon(detail);
    };

    getPokemonDetail();
  }, []);

  useEffect(() => {
    const getPokemonSpecie = async () => {
      const specie = await getPokemonSpecies(pokemon?.id);
      setPokemonSpecies(specie);
      setIsLoading(false);
    };

    if (pokemon !== null) {
      getPokemonSpecie();
    }
  }, [pokemon]);

  const getFirstENText = (arr) => {
    const firstENText = arr.find((obj) => obj.language.name === "en");
    return firstENText?.flavor_text.replace(/(?:\r\n|\r|\n|\t|\f)/g, " ");
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: getColorByType(
            pokemon !== null ? pokemon?.types[0]?.type?.name : "",
            true
          ),
        },
      ]}
    >
      {isLoading || pokemon === null || pokemonSpecies === null ? (
        <ActivityIndicator animating={isLoading} color={"#000000"} />
      ) : (
        <>
          <Text style={styles.nameText}>
            {capitalizeEachWord(pokemon?.name)}
          </Text>
          <View
            style={{
              flex: 0.5,
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 0.5, flexDirection: "column" }}>
              <Text style={{ alignSelf: "center" }}>Base</Text>
              <Image
                source={{ uri: pokemon?.sprites?.front_default }}
                resizeMode="contain"
                style={{ flex: 1 }}
              />
            </View>
            <View style={{ flex: 0.5, flexDirection: "column" }}>
              <Text style={{ alignSelf: "center" }}>Shiny</Text>
              <Image
                source={{ uri: pokemon?.sprites?.front_shiny }}
                resizeMode="contain"
                style={{ flex: 1 }}
              />
            </View>
          </View>
          <View style={styles.typeViewContainer}>
            {pokemon?.types.map((item, index) => {
              return (
                <View
                  key={`type:${index}`}
                  style={[
                    styles.typeView,
                    {
                      backgroundColor: getColorByType(item?.type?.name),
                    },
                  ]}
                >
                  <Text>{capitalizeEachWord(item?.type?.name)}</Text>
                </View>
              );
            })}
          </View>
          <View style={[styles.typeViewContainer, { marginTop: 16 }]}>
            <Text>{"#" + pokemon?.id}</Text>
            <Text>{" | "}</Text>
            <Text>{"Height: " + pokemon?.height}</Text>
            <Text>{" | "}</Text>
            <Text>{"Weight: " + pokemon?.weight}</Text>
          </View>
          <Text style={styles.descriptionText}>
            {/* {pokemonSpecies?.flavor_text_entries[0]?.flavor_text.replace(
              /(?:\r\n|\r|\n|\t|\f)/g,
              " "
            )} */}
            {getFirstENText(pokemonSpecies?.flavor_text_entries)}
          </Text>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AFAFAF",
  },
  nameText: {
    margin: 16,
    alignSelf: "center",
    fontSize: 32,
  },
  typeViewContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  typeView: {
    flex: 0.5,
    borderRadius: 16,
    alignItems: "center",
    marginHorizontal: 16,
    paddingVertical: 8,
  },
  descriptionText: {
    margin: 16,
    marginTop: 32,
    fontSize: 40,
  },
});

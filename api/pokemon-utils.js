import axios from "axios";

const POKEMON_API_URL = `https://pokeapi.co/api/v2/`; // TODO: switch to .env

export const getInitialPokemonList = async () => {
  return await axios
    .get(POKEMON_API_URL + "pokemon?limit=10")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};

export const getNewListFromPageURL = async (url) => {
  return await axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};

export const getNewListFromRandomOffset = async (offset) => {
  return await axios
    .get(POKEMON_API_URL + `pokemon?offset=${offset}&limit=10`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};

export const getPokemonByURL = async (url = null) => {
  return await axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};

export const getPokemonSpecies = async (id = null) => {
  return await axios
    .get(POKEMON_API_URL + `pokemon-species/${id}/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};

export const getColorByType = (type, opacity = false) => {
  switch (type) {
    case "normal":
      return "#A8A77A" + (opacity ? "77" : "");
      break;
    case "fire":
      return "#EE8130" + (opacity ? "77" : "");
      break;
    case "water":
      return "#6390F0" + (opacity ? "77" : "");
      break;
    case "electric":
      return "#F7D02C" + (opacity ? "77" : "");
      break;
    case "grass":
      return "#7AC74C" + (opacity ? "77" : "");
      break;
    case "ice":
      return "#96D9D6" + (opacity ? "77" : "");
      break;
    case "fighting":
      return "#C22E28" + (opacity ? "77" : "");
      break;
    case "poison":
      return "#A33EA1" + (opacity ? "77" : "");
      break;
    case "ground":
      return "#E2BF65" + (opacity ? "77" : "");
      break;
    case "flying":
      return "#A98FF3" + (opacity ? "77" : "");
      break;
    case "psychic":
      return "#F95587" + (opacity ? "77" : "");
      break;
    case "bug":
      return "#A6B91A" + (opacity ? "77" : "");
      break;
    case "rock":
      return "#B6A136" + (opacity ? "77" : "");
      break;
    case "ghost":
      return "#735797" + (opacity ? "77" : "");
      break;
    case "dragon":
      return "#6F35FC" + (opacity ? "77" : "");
      break;
    case "dark":
      return "#705746" + (opacity ? "77" : "");
      break;
    case "steel":
      return "#B7B7CE" + (opacity ? "77" : "");
      break;
    case "fairy":
      return "#D685AD" + (opacity ? "77" : "");
      break;
    default:
      return "#AFAFAF" + (opacity ? "77" : "");
      break;
  }
};

// const colours = {
//   normal: "#A8A77A",
//   fire: "#EE8130",
//   water: "#6390F0",
//   electric: "#F7D02C",
//   grass: "#7AC74C",
//   ice: "#96D9D6",
//   fighting: "#C22E28",
//   poison: "#A33EA1",
//   ground: "#E2BF65",
//   flying: "#A98FF3",
//   psychic: "#F95587",
//   bug: "#A6B91A",
//   rock: "#B6A136",
//   ghost: "#735797",
//   dragon: "#6F35FC",
//   dark: "#705746",
//   steel: "#B7B7CE",
//   fairy: "#D685AD",
// };

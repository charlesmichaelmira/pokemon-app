export function capitalizeEachWord(
  sentence = "",
  inputSeparator = " ",
  outputSeparator = " "
) {
  let splitSentence = sentence.split(inputSeparator);
  let newArr = [];
  splitSentence.forEach((word) => {
    newArr.push(word[0].toUpperCase() + word.substr(1));
  });
  return newArr.join(outputSeparator);
}

import { getRandomInt } from "../utils/number";

async function getWord() {
  try {
    const response = await fetch(
      "https://api.frontendexpert.io/api/fe/wordle-words"
    );
    if (!response.ok) {
      // Manege the error appropriately
      console.error("Error in request =>", response);
    }

    const data: string[] = await response.json();

    return data[getRandomInt(0, data.length)];
  } catch (error) {
    // Manege the error appropriately
    console.error("Error in the getWord function =>", error);
  }
}

export { getWord };

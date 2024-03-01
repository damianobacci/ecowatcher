import axios from "axios";

export async function storeLitter(litterData) {
  try {
    await axios.post(
      "https://react-http-a6dcf-default-rtdb.europe-west1.firebasedatabase.app/litter.json",
      litterData
    );
  } catch (error) {
    console.error(error);
    throw error; // rethrow to handle it outside
  }
}

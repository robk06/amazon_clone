import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-clone-41420.cloudfunctions.net/api", // The API (cloud function) URL
//   http://localhost:5001/clone-41420/us-central1/api
});

export default instance;
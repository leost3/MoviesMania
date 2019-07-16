import axios from "axios";

const KEY = `AIzaSyBu_iAGUK0MmtEZD4cIROXnULsaZ-xsYRY`;

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 5,
    key: KEY
  }
});
  
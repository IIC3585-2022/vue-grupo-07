import axios from "axios";
const url = "https://recipify.p.rapidapi.com/today-recipe";
const options = {
  headers: {
    "X-RapidAPI-Host": process.env.VUE_APP_API_HOST,
    "X-RapidAPI-Key": process.env.VUE_APP_API_KEY,
  },
};

export default {
  getRecipe() {
    return axios.get(url, options);
  },
  //   create(todo) {
  //     return axios.post(API, todo);
  //   },
};

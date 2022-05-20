import axios from "axios";
const url = "https://recipify.p.rapidapi.com/today-recipe";
const options = {
  headers: {
    "X-RapidAPI-Host": "recipify.p.rapidapi.com",
    "X-RapidAPI-Key": "22a8ca0155msh00cf1e810765559p1317a2jsn98f0516b8b3f",
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

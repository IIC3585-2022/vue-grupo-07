import { createStore } from "vuex";

export default createStore({
  state: {
    latestRecipes: [],
    allRecipes: [
      // {
      //   slug: "katsu-curry",
      //   title: "Katsu Curry",
      //   description:
      //     "A delicious curry made with chicken, potatoes, and a special sauce",
      //   ingredients: [
      //     "1 tablespoon olive oil",
      //     "1 onion, chopped",
      //     "2 cloves garlic, chopped",
      //     "1 tablespoon curry powder",
      //   ],
      //   method: [
      //     "Heat oil in a large skillet over medium heat.",
      //     "Add onion and garlic and cook, stirring often, until softened, about 5 minutes.",
      //     "Add curry powder and cook, stirring, until fragrant, about 1 minute.",
      //     "Add chicken and potatoes and cook, stirring, until heated through, about 5 minutes.",
      //   ],
      // },
    ],
  },
  mutations: {
    ADD_RECIPE(state, recipe) {
      state.allRecipes.push(recipe);
      console.log("ADDING NEW RECIPE");
    },
    UPDATE_LATEST_RECIPES(state, recipe) {
      console.log("UPDATING LATEST RECIPES");
      state.latestRecipes.push(recipe);
      if (state.latestRecipes.length > 3) {
        state.latestRecipes.shift();
      }
    },
    REMOVE_RECIPE(state, recipe) {
      console.log("DELETE RECIPE ID: " + recipe.id);
      let recipeIndex = state.allRecipes.indexOf(recipe);
      state.allRecipes.splice(recipeIndex, 1);
    },
    SAVE_LATEST(state, recipe) {
      if (!state.allRecipes.includes(recipe)) {
        console.log("SAVING RECIPE ID: "+recipe.id);
        state.allRecipes.push(recipe);
      } else {
        console.log("RECIPE ya guardada");
      }
      
    }
  },
});

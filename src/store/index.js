import { createStore } from "vuex";

export default createStore({
  state: {
    latestRecipes: [],
    allRecipes: [
      {
        id: "churrasco-italiano",
        name: "Churrasco Italiano",
<<<<<<< Updated upstream
=======
        minutes: "20",
>>>>>>> Stashed changes
        description: "Clasico churrasco italiano Chileno",
        ingredients: [
          "200 gramos de bistec de posta rosada",
          "1 palta",
          "1 Tomate",
          "1 Pan Frica",
          "Mayonesa",
        ],
        steps: [
          "Cortar el tomate en rebanadas de entre medio y 1 cm. Aliñar con sal por ambos lados.",
          "Moler las paltas y agregar sal. Revolver y probar.",
          "Tostar ligeramente el pan cortado por la mitad.",
          "Salpimentar la carne.",
          "En una sartén antiadherente calentar 1 cucharada de aceite a fuego medio-alto. Agregar la carne y cocinar por 1-2 minutos de manera que se dore por ambos lados.",
          "Poner una capa delgada de mayonesa en cada mitad de pan.",
          "Colocar  sobre el pan base: la mitad de la carne, el tomate y en la tapa la palta. Cerrar y servir con muchas servilletas.",
        ],
      },
    ],
    shopList: [],
  },

  mutations: {
    ADD_RECIPE(state, recipe) {
      state.allRecipes.push(recipe);
      console.log("ADDING NEW RECIPE");
    },
    MAKE_SHOP_LIST(state, recipes){
      state.shopList = [] 
      for(const recipe in recipes){
        state.shopList.push(recipe.ingredients);
        console.log("ADDING NEW INGRIDIENT");
      }
      console.log("MAKING NEW SHOPLIST");
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
        console.log("SAVING RECIPE ID: " + recipe.id);
        state.allRecipes.push(recipe);
      } else {
        console.log("RECIPE ya guardada");
      }
    },
  },
});

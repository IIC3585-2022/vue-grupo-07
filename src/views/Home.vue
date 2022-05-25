<template>
  <div class="home">
    <h1>My Recipes</h1>
    <button class="NR" @click="showPopup">Add new Recipe</button>
    <button @click="getRecipe">Load New Recipe</button>
    <div v-if="loading" class="loader"></div>

    <h3>Last seen Recipes</h3>
    <div class="recipes">
      <div
        class="card"
        v-for="recipe in $store.state.latestRecipes"
        :key="recipe.id"
      >
        <h2 class="card-header">{{ recipe.name }}</h2>
        <p>{{ recipe.description }}</p>
        <router-link :to="`/recipe/latest/${recipe.id}`">
          <button>View Recipe</button>
        </router-link>
        <button @click="save_latest(recipe)">Save</button>
      </div>
    </div>
    <h3>Saved Recipes</h3>
    
    <div class="recipes">
      <div
        class="card"
        v-for="recipe in $store.state.allRecipes"
        :key="recipe.id"
      >
        <h2>{{ recipe.name }}</h2>
        <p>{{ recipe.description }}</p>
        <router-link :to="`/recipe/saved/${recipe.id}`">
          <button>View Recipe</button>
        </router-link>
        <button @click="destroy(recipe)">Delete</button>
      </div>
    </div>

    <div class="add-recipe-popup" v-if="showNewRecipe">
      <NewRecipePopup @closePopup="closePopup"></NewRecipePopup>
    </div>
    <div class="add-recipe-popup" v-if="showIncomingRecipe">
      <IncomingRecipePopup :recipe="latestRecipe" @closePopup="closePopup" />
    </div>
  </div>
</template>

<script>
import recipes from "../scripts/recipes";
import IncomingRecipePopup from "../components/IncomingRecipePopup.vue";
import NewRecipePopup from "../components/NewRecipePopup.vue";
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "Home",
  setup() {
    const store = useStore();
    const loading = ref(false);
    const showNewRecipe = ref(false);
    const showIncomingRecipe = ref(false);
    const latestRecipe = ref({});

    if (localStorage.getItem("store")) {
      // Replace the state object with the stored item
      store.replaceState(
        Object.assign(store.state, JSON.parse(localStorage.getItem("store")))
      );
    }
    store.subscribe((mutation, state) => {
      // Store the state object as a JSON string
      localStorage.setItem("store", JSON.stringify(state));
    });

    return {
      loading,
      showNewRecipe,
      showIncomingRecipe,
      latestRecipe,
    };
  },
  methods: {
    async getRecipe() {
      this.loading = true;
      this.showNewRecipe = false;
      await recipes
        .getRecipe()
        .then((response) => {
          console.log(response.data);
          this.latestRecipe = response.data;
          this.loading = false;
          this.showIncomingRecipe = true;
          this.storeLatestRecipe(response.data);
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    storeLatestRecipe(recipe) {
      this.$store.commit("UPDATE_LATEST_RECIPES", recipe);
    },
    showPopup(event) {
      var typeOfPopup = event.target.className;
      if (typeOfPopup == "NR") {
        this.showNewRecipe = true;
      } else {
        this.showIncomingRecipe = true;
      }
    },
    closePopup() {
      this.showNewRecipe = false;
      this.showIncomingRecipe = false;
    },
    destroy(recipe) {
      this.$store.commit("REMOVE_RECIPE", recipe);
    },
    save_latest(recipe) {
      this.$store.commit("SAVE_LATEST", recipe);
    },
  },
  components: { IncomingRecipePopup, NewRecipePopup },
};
</script>

<style>
.home {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-size: 3rem;
  margin-bottom: 32px;
}

.recipes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.recipes .card {
  padding: 1rem;
  border-radius: 5px;
  margin: 1rem;
  background-color: #081c33;
}

.recipes .card h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.recipes .card p {
  font-size: 1.125rem;
  line-height: 1.4;
  margin-bottom: 1rem;
}

.add-recipe-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-recipe-popup .popup-content {
  background-color: #081c33;
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 768px;
  max-height: 90%;
  overflow: auto;
}

.popup-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.popup-content .group {
  margin-bottom: 1rem;
}

.popup-content .group label {
  display: block;
  margin-bottom: 0.5rem;
}

.popup-content .group input,
.popup-content .group textarea {
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
}

.popup-content .group textarea {
  height: 100px;
  resize: none;
}

.popup-content button[type="submit"] {
  margin-right: 1rem;
}

.loader {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 2s linear infinite;
}

.home button {
  margin: 1%;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

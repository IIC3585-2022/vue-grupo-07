<template>
  <div class="popup-content">
    <h2>Add new recipe</h2>

    <form @submit.prevent="addNewRecipe">
      <div class="group">
        <label>Title</label>
        <input type="text" v-model="newRecipe.name" />
      </div>

      <div class="group">
        <label>Description</label>
        <textarea v-model="newRecipe.description"></textarea>
      </div>

      <div class="group">
        <label>Ingredients</label>
        <div class="ingredient" v-for="i in newRecipe.ingredientRows" :key="i">
          <input type="text" v-model="newRecipe.ingredients[i - 1]" />
        </div>
        <button type="button" @click="addNewIngredient">Add Ingredient</button>
      </div>

      <div class="group">
        <label>Step</label>
        <div class="method" v-for="i in newRecipe.methodRows" :key="i">
          <textarea v-model="newRecipe.steps[i - 1]"></textarea>
        </div>
        <button type="button" @click="addNewStep">Add step</button>
      </div>

      <button type="submit">Add Recipe</button>
      <button class="NR" type="button" @click="hidePopup">Close</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "NewRecipePopup",
  setup() {
    const store = useStore();
    const newRecipe = ref({
      id: "",
      name: "",
      description: "",
      ingredients: [],
      steps: [],
      ingredientRows: 1,
      methodRows: 1,
    });

    return {
      newRecipe,
      store,
    };
  },
  methods: {
    hidePopup() {
      this.$emit("closePopup");
    },
    addNewRecipe() {
      this.newRecipe.id = this.newRecipe.name.toLowerCase().replace(/\s/g, "-");
      if (!this.newRecipe.id) {
        alert("Please enter a title");
        return;
      }
      this.store.commit("ADD_RECIPE", { ...this.newRecipe });
      this.newRecipe = {
        id: "",
        name: "",
        description: "",
        ingredients: [],
        steps: [],
        ingredientRows: 1,
        methodRows: 1,
      };
      this.$emit("closePopup");
    },
    addNewIngredient() {
      this.newRecipe.ingredientRows++;
    },
    addNewStep() {
      this.newRecipe.methodRows++;
    },
  },
};
</script>

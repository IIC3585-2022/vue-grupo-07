<template>
  <div class="popup-content">
    <h1>Shop List</h1>
    <hr />
    <div id="ShopListcheck" class="recipes">
      <h2>Recipes</h2>
      <ul>
        <li v-for="recipe in $store.state.allRecipes" :key="recipe.id">
          <h3> {{ recipe.name}}</h3>
            <ul>
                 <li v-for="(ingredient, i) in recipe.ingredients" :key="i">
                    {{ ingredient }}
                </li>
            </ul>
           <br>
        </li>
      </ul>
    </div>
    <button class="IR" type="button" @click="hidePopup">Close</button>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  name: "NewShopList",
  setup() {
    const store = useStore();

    return {
      store,
    };
  },
  methods: {
    hidePopup() {
      this.$emit("closePopup");
    },
  },
};

</script>

<style>

</style>

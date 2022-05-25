<template>
  <div class="incoming-recipe-popup">
    <h1>{{ recipe.name }}</h1>
    
    <p class="desc"><i>{{recipe.minutes}} min</i>  <br> {{ recipe.description }}</p>
    <hr />
    <div class="ingredients">
      <h3>Ingredients</h3>
      <ul>
        <li v-for="(ingredient, i) in recipe.ingredients" :key="i">
          {{ ingredient }}
        </li>
      </ul>
    </div>
    <div class="method">
      <h3>Method</h3>
      <ol>
        <li v-for="(step, i) in recipe.steps" :key="i">
          <span v-html="step"></span>
        </li>
      </ol>
    </div>
    <button class="IR" type="button" @click="hidePopup">Close</button>
  </div>
</template>

<script>
export default {
  name: "IncomingRecipePopup",
  props: {
    recipe: {
      type: Object,
    },
  },
  methods: {
    hidePopup() {
      this.$emit("closePopup");
    },
  },
};
</script>

<style>
.add-recipe-popup .incoming-recipe-popup {
  background-color: #081c33;
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 70%;
  max-height: 90%;
  overflow: auto;
}

.desc {
  font-size: 1.125rem;
  line-height: 1.4;
  margin-bottom: 1rem;
}

hr {
  margin-bottom: 1rem;
}

h3 {
  margin-bottom: 1rem;
}

.ingredients {
  padding: 1rem;
  background-color: #081c33;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
}

.ingredients ul li {
  list-style-position: inside;
  line-height: 1.4;
  margin-bottom: 1rem;
}

.method ol li {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  list-style-position: inside;
  border-bottom: 1px solid #eee;
}
</style>

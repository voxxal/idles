<template>
<p>you have {{ore}} ore</p>
  <button :disabled="true" v-if="cooldown > 0">
    Mine ({{ cooldown }})
  </button>
  <button v-else @click="mine">Mine</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MineInterface",
  mounted() {
    setInterval(() => {
      if (this.cooldown > 0) {
        this.cooldown--;
      }
    }, 1000);
  },
  data() {
    return {
      cooldown: 5,
      ore: 0,
    };
  },
  methods: {
    mine() {
      this.ore++;
      this.cooldown += 5;
    },
  },
});
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

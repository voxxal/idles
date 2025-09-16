<template>
  <MineInterface/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MineInterface from './components/MineInterface.vue';

export default defineComponent({
  name: 'App',
  components: {
    MineInterface
  }
});
</script>

<style>
  @import 'css/index.css';
</style>
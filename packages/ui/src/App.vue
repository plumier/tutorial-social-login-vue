<template>
  <div id="app">
    <loading></loading>
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

const default_layout = "default";

@Component
export default class App extends Vue {
  get layout() {
    return (this.$route.meta.layout || default_layout) + "-layout";
  }
}
</script>

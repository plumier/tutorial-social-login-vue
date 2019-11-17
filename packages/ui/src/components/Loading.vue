<template>
  <div class="modal" :class="{ 'is-active': isLoading }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="buttons is-centered">
        <button class="button is-primary is-loading is-large">Loading</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LoaderStore from "../store/modules/loader";

@Component
export default class Loading extends Vue {
  get isLoading() {
    return LoaderStore.isLoading;
  }
}
</script>

<style scoped>
.modal-background {
  background-color: rgba(10, 10, 10, 0.3);
}
</style>

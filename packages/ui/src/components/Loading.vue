<template>
  <div class="modal" :class="{ 'is-active': isLoading }">
    <div class="modal-background"></div>
    <div class="modal-content loading-content">
      <div class="box has-text-centered">
        <h4 class="title is-4 has-text-primary">
          <font-awesome-icon icon="spinner" pulse></font-awesome-icon
          >&nbsp;&nbsp;Loading
        </h4>
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
  background-color: rgba(0, 0, 0, 0.1);
}

.loading-content {
  width: 200px;
}
</style>

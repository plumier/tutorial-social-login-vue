<template>
  <div class="">
    <page-header></page-header>
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PageHeader from "@/components/layouts/Header.vue";

@Component({
  components: {
    PageHeader
  }
})
export default class DefaultLayout extends Vue {}
</script>

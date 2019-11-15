<template>
  <div>This is Home</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserApi from "../api/user";
import { ResponseApi } from "../api/apibase";
import { User } from "../../../server/src/model/model";

@Component
export default class Home extends Vue {
  async created() {}
}
</script>

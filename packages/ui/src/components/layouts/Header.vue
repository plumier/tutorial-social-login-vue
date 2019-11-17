<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item has-text-white is-size-3" href="#">
        <font-awesome-icon icon="feather-alt"></font-awesome-icon>
        <span style="margin-left: 10px;">Note it!</span>
      </a>
      <a
        @click="showMobileNavbar = !showMobileNavbar"
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="navbarBasicExample"
      class="navbar-menu"
      :class="{ 'is-active': showMobileNavbar }"
    >
      <div class="navbar-start">
        <router-link to="/home" class="navbar-item">
          Home
        </router-link>
        <router-link to="/about" class="navbar-item">
          About
        </router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="level is-mobile">
            <div class="level-left">
              <figure class="image is-48x48" style="margin-right: 10px;">
                <img class="is-rounded" :src="userAvatar" />
              </figure>
              <div>
                <p class="">{{ userFullName }}</p>
                <p class="is-size-7">
                  <a class="has-text-link" href="#" @click="logout">Logout</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserStore from "../../store/modules/users";

@Component
export default class Header extends Vue {
  showMobileNavbar: boolean = false;

  get userFullName() {
    return UserStore.userFullName;
  }
  get userAvatar() {
    return UserStore.userAvatar;
  }

  async logout() {
    await UserStore.logoutUser();
    this.$router.replace("/");
  }
}
</script>

<style scoped>
.navbar-item img {
  max-height: 48px;
}
.navbar-burger {
  height: unset;
}
</style>

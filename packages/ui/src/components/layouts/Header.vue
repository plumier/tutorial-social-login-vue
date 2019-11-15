<template>
  <nav class="navbar is-light" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img
          src="https://bulma.io/images/bulma-logo.png"
          width="112"
          height="28"
        />
      </a>

      <a
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

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item">
          Ngapain?
        </a>
        <a class="navbar-item">
          About
        </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <div class="media">
              <div class="media-left">
                <figure class="image is-32x32">
                  <img class="is-rounded" :src="userAvatar" />
                </figure>
              </div>
              <div class="media-content">
                <p class="is-size-5">{{ userFullName }}</p>
              </div>
            </div>
          </a>
          <div class="navbar-dropdown">
            <a class="navbar-item" @click="logout">
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserStore from "../../store/modules/users";
import { User } from "../../../../server/src/model/model";

@Component
export default class Header extends Vue {
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

<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <div class="column has-text-centered">
              <span class="has-text-primary is-size-3" href="#">
                <font-awesome-icon icon="feather-alt"></font-awesome-icon>
                <span style="margin-left: 10px;">Note it!</span>
              </span>
            </div>
            <form action="" @submit.prevent="login" class="box">
              <article v-if="errors !== ''" class="message is-danger">
                <div class="message-body">{{ errors }}</div>
              </article>
              <div class="field">
                <label for="" class="label">Email</label>
                <div class="control has-icons-left">
                  <input
                    v-model="email"
                    type="email"
                    placeholder="johndoe@gmail.com"
                    class="input"
                  />
                  <span class="icon is-small is-left">
                    <font-awesome-icon icon="envelope" />
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Password</label>
                <div class="control has-icons-left">
                  <input
                    v-model="password"
                    type="password"
                    placeholder="*******"
                    class="input"
                  />
                  <span class="icon is-small is-left">
                    <font-awesome-icon icon="lock" />
                  </span>
                </div>
              </div>
              <div class="field">
                <button class="button is-primary is-fullwidth">
                  Login
                </button>
              </div>
              <div class="columns is-mobile has-text-centered">
                <div class="column">
                  <a href="javascript:void(0)" @click="googleDialog">
                    <font-awesome-icon :icon="['fab', 'google']" size="2x" />
                  </a>
                </div>
                <div class="column">
                  <a href="javascript:void(0)" @click="facebookDialog">
                    <font-awesome-icon :icon="['fab', 'facebook']" size="2x" />
                  </a>
                </div>
                <div class="column">
                  <a href="javascript:void(0)" @click="githubDialog">
                    <font-awesome-icon :icon="['fab', 'github']" size="2x" />
                  </a>
                </div>
              </div>
            </form>
            <div class="column has-text-centered">
              Not a member click
              <router-link to="/register">here</router-link> to register
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AuthApi from "../api/auth";
import { ResponseApi } from "../api/apibase";
import UserStore from "../store/modules/users";
import { dialog } from "../utils/dialog";

@Component
export default class Login extends Vue {
  email: string = "";
  password: string = "";
  errors: any = "";

  async created() {
    // Social login popup handler
    window.addEventListener("message", this.socialLoginHandler)
    await AuthApi.getIdentity();
    if (await UserStore.isAuthenticated()) {
      this.$router.replace("/home");
    }
  }

  async socialLoginHandler(
    evt: MessageEvent
  ) {
    //make sure the sender dialog is in the same origin with the app
    if (
      evt.origin === window.location.origin &&
      evt.data.status === "Success"
    ) {
      if (evt.source && "close" in evt.source) evt.source.close()
      if (await UserStore.isAuthenticated()) {
        this.$router.replace("/home");
      } else {
        alert("social login failed!");
      }
    }
  }

  async login() {
    const response: ResponseApi<any> = await AuthApi.login({
      email: this.email,
      password: this.password
    });
    if (response.success) {
      if (await UserStore.isAuthenticated()) {
        this.$router.replace("/home");
      } else {
        alert("social login failed!");
      }
    } else {
      this.errors = response.exceptions;
    }
  }

  facebookDialog() {
    dialog("auth/facebook/login");
  }

  googleDialog() {
    dialog("auth/google/login");
  }

  githubDialog() {
    dialog("auth/github/login");
  }
}
</script>

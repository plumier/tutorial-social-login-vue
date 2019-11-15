<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen">
            <form action="" class="box">
              <div class="field">
                <label for="" class="label">Email</label>
                <div class="control has-icons-left">
                  <input
                    type="email"
                    placeholder="e.g. bobsmith@gmail.com"
                    class="input"
                    required
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
                    type="password"
                    placeholder="*******"
                    class="input"
                    required
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
            <div class="column">
              Not a member click <a href="">here to register</a>
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

@Component
export default class Login extends Vue {
  async created() {
    // Social login popup handler
    (window as any).onLogin = this.socialLoginHandler;

    let response: ResponseApi<any> = await AuthApi.getIdentity();
    if (!response.success) {
      alert(response.exceptions);
    }

    if (await UserStore.isAuthenticated()) {
      this.$router.replace("/home");
    }
  }

  async socialLoginHandler(
    sender: Window,
    params: { status: "Success" | "Failed"; accessToken: string }
  ) {
    sender.close();
    //make sure the sender dialog is in the same origin with the app
    if (
      sender.location.origin === window.location.origin &&
      params.status === "Success"
    ) {
      if (await UserStore.isAuthenticated()) {
        this.$router.replace("/home");
      } else {
        alert("social login failed!");
      }
    }
  }

  dialog(url: string, w = 600, h = 500) {
    const y = window.top.outerHeight / 2 + window.top.screenY - h / 2;
    const x = window.top.outerWidth / 2 + window.top.screenX - w / 2;
    window.open(
      url,
      "Social Login",
      "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" +
        w +
        ", height=" +
        h +
        ", top=" +
        y +
        ", left=" +
        x
    );
  }

  facebookDialog() {
    this.dialog("auth/dialogs/facebook");
  }

  googleDialog() {
    this.dialog("auth/dialogs/google");
  }

  githubDialog() {
    this.dialog("auth/dialogs/github");
  }
}
</script>

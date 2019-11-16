<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-7-tablet is-6-desktop is-5-widescreen">
            <h4 class="title is-4 has-text-centered">
              Registration Form
            </h4>
            <form action="" @submit.prevent="submitForm" class="box">
              <div class="field">
                <label for="name" class="label">Name</label>
                <div class="control">
                  <input v-model="register.name" type="text" class="input" />
                </div>
                <p class="help is-danger">{{ validation.name }}</p>
              </div>
              <div class="field">
                <label for="" class="label">Email</label>
                <div class="control">
                  <input v-model="register.email" type="email" class="input" />
                </div>
                <p class="help is-danger">{{ validation.email }}</p>
              </div>
              <div class="field">
                <label for="" class="label">Password</label>
                <div class="control">
                  <input
                    v-model="register.password"
                    type="password"
                    class="input"
                  />
                </div>
                <p class="help is-danger">{{ validation.password }}</p>
              </div>
              <div class="field">
                <label for="" class="label">Confirm Password</label>
                <div class="control">
                  <input
                    v-model="register.confirmPassword"
                    type="password"
                    class="input"
                  />
                </div>
                <p class="help is-danger">{{ validation.confirmPassword }}</p>
              </div>
              <div class="field is-grouped is-grouped-right">
                <div class="buttons">
                  <router-link class="button is-text" to="/"
                    >Cancel</router-link
                  >
                  <button class="button is-primary">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserApi from "../api/user";
import { ResponseApi } from "../api/apibase";
import {
  User,
  RegisterValidationMessage,
  RegisterSubmit
} from "../model/model";

@Component
export default class Register extends Vue {
  register: RegisterSubmit = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  validation: RegisterValidationMessage = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  async submitForm() {
    const response: ResponseApi<User> = await UserApi.registerUser(
      this.register
    );
    if (!response.success) {
      this.validation = this.getValidationMessage(response.exceptions);
    } else {
      alert(
        "Registration successfull! Now you can login using your registered username."
      );
      this.$router.push("/");
    }
  }

  getValidationMessage(data: { path: string[]; messages: string[] }[]) {
    const result: { [key: string]: string } = {};
    for (const item of data) {
      result[item.path[item.path.length - 1]] = item.messages[0];
    }
    return result as any;
  }
}
</script>

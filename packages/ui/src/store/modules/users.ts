import {
  getModule,
  Module,
  MutationAction,
  VuexModule,
  Action
} from "vuex-module-decorators";
import store from "@/store";
import { User } from "../../../../server/src/model/model";
import UserApi from "@/api/user";
import AuthApi from "@/api/auth";

@Module({
  namespaced: true,
  name: "users",
  store,
  dynamic: true
})
class UsersModule extends VuexModule {
  user: User | null = null;

  get userFullName() {
    return (this.user && this.user.name) || null;
  }

  get userAvatar() {
    return (this.user && this.user.picture) || "";
  }

  @MutationAction
  async loadUser() {
    const response = await UserApi.getCurrentUser();
    if (response.success) {
      return { user: response.result };
    }
    return { user: <User | null>null };
  }

  @MutationAction
  async logoutUser() {
    await AuthApi.logout();
    return { user: <User | null>null };
  }

  @Action
  async isAuthenticated(): Promise<boolean> {
    const response = await AuthApi.isAuthenticated();
    if (response.result.authenticated && this.user === null) {
      await this.loadUser();
    }
    return response.result.authenticated;
  }
}

export default getModule(UsersModule);

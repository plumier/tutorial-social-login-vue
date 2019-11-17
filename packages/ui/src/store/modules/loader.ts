import {
  getModule,
  Module,
  MutationAction,
  VuexModule
} from "vuex-module-decorators";
import store from "@/store";

@Module({
  namespaced: true,
  name: "loader",
  store,
  dynamic: true
})
class LoaderModule extends VuexModule {
  loading: boolean = false;

  get isLoading() {
    return this.loading;
  }

  @MutationAction
  async showLoading() {
    return { loading: true };
  }

  @MutationAction
  async hideLoading() {
    return { loading: false };
  }
}

export default getModule(LoaderModule);

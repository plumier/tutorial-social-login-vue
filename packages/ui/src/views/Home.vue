<template>
  <section class="section">
    <input
      class="input is-rounded"
      type="text"
      placeholder="Something to do? type here.."
      v-model="newTodo"
      @keyup.enter="addTodo"
      style="margin-bottom: 15px;"
    />
    <table class="table is-fullwidth is-striped">
      <tr v-for="todo in todos" :key="todo.id">
        <td class="col-action">
          <a
            @click="checkTodo(todo)"
            :class="{
              'has-text-success': todo.completed,
              'has-text-grey-lighter': !todo.completed
            }"
            ><font-awesome-icon icon="check-circle"></font-awesome-icon
          ></a>
        </td>
        <td :class="{ completed: todo.completed }">
          {{ todo.title }}
        </td>
        <td class="col-action">
          <div class="buttons">
            <a @click="deleteTodo(todo)" class="has-text-danger"
              ><font-awesome-icon icon="trash-alt"></font-awesome-icon
            ></a>
          </div>
        </td>
      </tr>
    </table>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ResponseApi } from "../api/apibase";
import TodoApi from "../api/todo";
import { Todo } from "../model/model";

@Component
export default class Home extends Vue {
  todos: Array<Todo> = [];
  newTodo: string = "";

  async created() {
    this.getTodos();
  }

  async getTodos() {
    const response: ResponseApi<Array<Todo>> = await TodoApi.getTodos();
    if (response.success) {
      this.todos = response.result;
    } else {
      console.log(response.exceptions);
    }
  }

  async addTodo() {
    if (this.newTodo !== "") {
      const response: ResponseApi<Todo> = await TodoApi.addTodo({
        title: this.newTodo
      });
      if (response.success) {
        this.getTodos();
        this.newTodo = "";
      } else {
        console.log(response.exceptions);
      }
    }
  }

  async checkTodo(item: Todo) {
    const response: ResponseApi<Todo> = await TodoApi.checkTodo(
      item.id,
      !item.completed
    );
    if (response.success) {
      this.getTodos();
    } else {
      console.log(response.exceptions);
    }
  }

  async deleteTodo(item: Todo) {
    if (confirm("Are you sure you want to delete selected todo?")) {
      const response: ResponseApi<Todo> = await TodoApi.deleteTodo(item.id);
      if (response.success) {
        this.getTodos();
      } else {
        console.log(response.exceptions);
      }
    }
  }
}
</script>

<style scoped>
.col-action {
  width: 40px;
}
.completed {
  text-decoration: line-through;
  color: rgba(0, 0, 0, 0.3);
}
</style>

import { ResponseApi, callApi } from "@/api/apibase";
import { Todo } from "@/model/model";

export default {
  async getTodos(): Promise<ResponseApi<Array<Todo>>> {
    return await callApi({
      url: "api/v1/todos",
      method: "get"
    });
  },
  async getTodo(id: string): Promise<ResponseApi<Todo>> {
    return await callApi({
      url: `api/v1/todos/${id}`,
      method: "get"
    });
  },
  async addTodo(data: any): Promise<ResponseApi<Todo>> {
    return await callApi({
      url: "api/v1/todos",
      method: "post",
      data: data
    });
  },
  async checkTodo(id: string, completed: boolean): Promise<ResponseApi<Todo>> {
    return await callApi({
      url: `api/v1/todos/${id}`,
      method: "put",
      data: { completed }
    });
  },
  async deleteTodo(id: string): Promise<ResponseApi<Todo>> {
    return await callApi({
      url: `api/v1/todos/${id}`,
      method: "delete"
    });
  }
};

import React, { useState } from "react";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

const Todo = () => {
  const [title, setTitle] = useState("");

  const { status, data, error } = useQuery("todos", () => {
    return fetch("http://localhost:5000/todo").then((res) => res.json());
  });
  const queryClient = useQueryClient();
  const updateTodoMutation = useMutation(
    (payload) => {
      console.log(payload);
      return fetch(`http://localhost:5000/todo/${payload.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: payload.completed,
        }),
      }).then((res) => res.json());
    },
    {
      onSuccess: () => {
        console.log("success");
        queryClient.invalidateQueries("todos");
      },
    }
  );
  const createTodoMutation = useMutation(
    (payload) => {
      console.log(payload);
      return fetch(`http://localhost:5000/todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: payload.name,
          completed: payload.completed,
        }),
      }).then((res) => res.json());
    },
    {
      onSuccess: () => {
        console.log("success");
        queryClient.invalidateQueries("todos");
      },
    }
  );
  const deleteTodoMutation = useMutation(
    (payload) => {
      console.log(payload);
      return fetch(`http://localhost:5000/todo/${payload.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    },
    {
      onSuccess: () => {
        console.log("success");
        queryClient.invalidateQueries("todos");
      },
    }
  );

  if (status === "loading") return <div>Loading...</div>;
  console.log(data);
  return (
    <div className="max-w-xl mx-auto">
      <div>
        <h1 className="text-xl font-bold text-center">Todo</h1>
      </div>
      <div className="w-full flex justify-between">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Type here"
          className="input input-bordered focus:outline-none w-full max-w-xs"
        />
        <button
          onClick={() => {
            createTodoMutation.mutate({
              name: title,
              completed: false,
            });
          }}
          className="btn btn-md "
        >
          Create
        </button>
      </div>
      <div className="max-h-[600px] overflow-y-auto">
        {data?.tasks?.map((task: any) => (
          <div key={task.id} className="form-control border-b-2">
            <label className="cursor-pointer label">
              <span className={`label-text text-lg ${task.completed ? "line-through":""}`}>{task.name}</span>
              <div className="flex items-center space-x-2">
                <input
                  defaultChecked={task.completed}
                  type="checkbox"
                  className="checkbox checkbox-secondary"
                  onChange={(e) => {
                    updateTodoMutation.mutate({
                      id: task.id,
                      completed: e.target.checked,
                    });
                  }}
                />
                <button
                  onClick={() => {
                    deleteTodoMutation.mutate({ id: task.id });
                  }}
                  className=""
                >
                  remove
                </button>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;

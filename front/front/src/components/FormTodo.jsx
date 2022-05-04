/**
 * importaciones React
 */

import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

/**
 * constante para manejar el Api
 */
const FormTodo = () => {
  const HOST_API = "http://localhost:8080/api";

  const initialState = {
    list: [],
    item: {},
  };

  /**
   * uso del context para pasar datos de manera global
   */
  const Store = createContext(initialState);
  /**
   * formulario para ingresar los ToDos
   */
  const Form = () => {
    const formRef = useRef(null);
    const {
      dispatch,
      state: { item },
    } = useContext(Store);
    const [state, setState] = useState(item);

    /**
     * 
     * funcion para el manejo del boton Agregar ToDo
     */
    const onAdd = (event) => {
      event.preventDefault();

      const request = {
        name: state.name,
        id: null,
        completed: false,
      };

      fetch(HOST_API + "/todo", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((todo) => {
          dispatch({ type: "add-item", item: todo });
          setState({ name: "" });
          formRef.current.reset();
        });
    };

    /**
     * 
     * funcion para el manejo del boton Editar ToDo
     */
    const onEdit = (event) => {
      event.preventDefault();

      const request = {
        name: state.name,
        id: item.id,
        completed: item.completed,
      };

      fetch(HOST_API + "/todo", {
        method: "PUT",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((todo) => {
          dispatch({ type: "update-item", item: todo });
          setState({ name: "" });
          formRef.current.reset();
        });
    };
    /**
     * Creacion del formulario donde se escribe el nuevo  ToDo
     */
    return (
      <div>
        <form ref={formRef}>
          <input
            className="input-group-sm mb-3 "
            placeholder="Agrega una nueva Tarea"
            type="text"
            name="name"
            defaultValue={item.name}
            onChange={(event) => {
              setState({ ...state, name: event.target.value });
            }}
          ></input>
          {item.id && (
            <button className="btn btn-success" onClick={onEdit}>
              Actualizar
            </button>
          )}
          {!item.id && (
            <button className="btn btn-secondary ms-2" onClick={onAdd}>
              Agregar
            </button>
          )}
        </form>
      </div>
    );
  };
  /**
   *  funcion List para agregar OnDelete para eliminar Todo
   *  y finishTodo para poner en True o False el ToDo
   * @returns una tabla con los Todo y sus respectivas caracteristicas
   */
  const List = () => {
    const { dispatch, state } = useContext(Store);

    useEffect(() => {
      fetch(HOST_API + "/todos")
        .then((response) => response.json())
        .then((list) => {
          dispatch({ type: "update-list", list });
        });
    }, [state.list.length, dispatch]);

    const onDelete = (id) => {
      fetch(HOST_API + "/" + id + "/todo", {
        method: "DELETE",
      }).then((list) => {
        dispatch({ type: "delete-item", id });
      });
    };

    const finishTodo = (event, todo) => {
      const request = {
        id: todo.id,
        name: todo.name,
        completed: event.target.checked,
      };
      fetch(HOST_API + "/todo", {
        method: "PUT",
        body: JSON.stringify(request),
        headers: {
          "content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((todo) => {
          dispatch({ type: "update-item", item: todo });
        });
    };

    const onEdit = (todo) => {
      dispatch({ type: "edit-item", item: todo });
    };
    return (
      <table className="table">
        <thead>
          <tr>
            <td> ID </td>
            <td> Nombre </td>
            <td>Eliminar ToDo</td>
            <td>Editar Todo</td>
            <td>Terminada la tarea?</td>
          </tr>
        </thead>
        <tbody>
          {state.list.length > 0 ? (
            state.list.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.name}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDelete(todo.id)}
                  >
                    Eliminar
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => onEdit(todo)}
                  >
                    Editar
                  </button>
                </td>
                <td><input className="form-check-input mt-0"   type="checkbox" defaultChecked={todo.completed} onChange ={(e)=>{
                  finishTodo(e, todo)
                }} /></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>Sin Tareas a realizar</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };
  /**
   * State hace referncia al estado en el cual se encuentra el DOM antes y durante
   * cualquier evento o peticion realizada
   * @param  state 
   * @param  action 
   * @returns  state
   */
  function reducer(state, action) {
    switch (action.type) {
      case "update-item":
        const listUpdateEdit = state.list.map((item) => {
          if (item.id === action.item.id) {
            return action.item;
          }
          return item;
        });
        return { ...state, list: listUpdateEdit, item: {} };
      case "update-completed":
        const updateCompleted = state.list.filter((item) => {
          return item.completed !== action.completed;
        });
        return { ...state, list: updateCompleted };
      case "delete-item":
        const listUpdate = state.list.filter((item) => {
          return item.id !== action.id;
        });
        return { ...state, list: listUpdate };
      case "update-list":
        return { ...state, list: action.list };
      case "edit-item":
        return { ...state, item: action.item };
      case "add-item":
        const newList = state.list;
        newList.push(action.item);
        return { ...state, list: newList };
      default:
        return state;
    }
  }

  const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
      <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
    );
  };

  return (
    <div className="container mt-3">
      <StoreProvider>
        <Form />
        <List />
      </StoreProvider>
    </div>
  );
};

export default FormTodo;

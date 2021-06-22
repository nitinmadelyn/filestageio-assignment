import Config from "./Config/Config";
import { fetchRequest } from "./Utilities/CommonFunctions";
import { useState, useEffect } from "react";
import useStyles from "./Assets/CssClasses";
import { Container, Paper, Box, Typography } from "@material-ui/core";
import Header from "./Components/Header/Header";
import AddTodo from "./Components/AddTodo/AddTodo";
import TodosList from "./Components/TodosList/TodosList";
import queryString from "querystring";
import Filters from "./Components/Filters/Filters";
import Moment from "moment";

function Todos() {
  const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [page, setPage] = useState(1);
  const [hasMoreTodos, setHasMoreTodos] = useState(true);

  function handleFilters(date) {
    setPage(1);
    setHasMoreTodos(true);
    setDueDate(Moment(date).format("yyyy-MM-DD"));
  }

  useEffect(() => {
    if (dueDate || dueDate == null) {
      fetchData();
    }
  }, [dueDate]);

  useEffect(() => {
    try {
      fetchData();
    } catch (err) {
      throw Error(err);
    }
  }, []);

  function clearDate() {
    setHasMoreTodos(true);
    setDueDate(null);
    setPage(1);
  }

  function fetchData() {
    const query = queryString.encode({ page, dueDate });
    return fetchRequest({
      method: "GET",
      path: "todo/",
      queryString: "?" + query,
    }).then((res) => {
      res.pagination.pageNumber == 1
        ? setTodos(res.items)
        : setTodos([...todos, ...res.items]);
      setPage(res.pagination.pageNumber + 1);
      if (
        res.pagination.pageNumber >= res.pagination.totalPages &&
        res.pagination.totalPages != 0
      ) {
        setHasMoreTodos(false);
      }
    });
  }

  function addTodo(text) {
    if (!text) return;

    fetchRequest({ method: "POST", path: "todo/", body: { text } }).then(
      (todo) => (todos.length < 20 ? setTodos(() => [...todos, todo]) : null)
    );
  }

  return (
    <Container maxWidth="md">
      <Header />
      <AddTodo
        addTodo={addTodo}
        newTodoText={newTodoText}
        setNewTodoText={setNewTodoText}
      />
      <Filters
        dueDate={dueDate}
        handleFilter={handleFilters}
        clearDate={clearDate}
      />
      {Array.isArray(todos) && todos.length > 0 ? (
        <TodosList
          todos={todos}
          setTodos={setTodos}
          fetchData={fetchData}
          hasMoreTodos={hasMoreTodos}
        />
      ) : null}
    </Container>
  );
}

export default Todos;

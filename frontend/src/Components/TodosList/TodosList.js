import Config from "../../Config/Config";
import { fetchRequest } from "../../Utilities/CommonFunctions";
import { Paper, Box, Typography } from "@material-ui/core";
import TodosItem from "../TodosItem/TodosItem";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import InfiniteScroll from "react-infinite-scroll-component";
import useStyles from "../../Assets/CssClasses";

export default function TodosList(props) {
  const classes = useStyles();
  const { todos, setTodos } = props;

  const SortableItem = SortableElement(({ todo }) => (
    <TodosItem
      todos={todo}
      toggleTodoCompleted={toggleTodoCompleted}
      deleteTodo={deleteTodo}
    />
  ));

  const SortableList = SortableContainer(({ items }) => {
    return (
      <Box display="flex" flexDirection="column" alignItems="stretch">
        <InfiniteScroll
          scrollThreshold={1}
          dataLength={20}
          next={props.fetchData}
          hasMore={props.hasMoreTodos}
          loader={<h3>Loading...</h3>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You've caught them all.</b>
            </p>
          }
        >
          {todos.map((todo, i) => (
            <SortableItem key={`item-${todo.id}`} index={i} todo={todo} />
          ))}
        </InfiniteScroll>
      </Box>
    );
  });

  const onSortTodos = ({ oldIndex, newIndex }) => {
    if (oldIndex === newIndex) return;

    const id = todos[oldIndex].id;
    const positionBetween = findPositionBetween(todos, oldIndex, newIndex);

    fetchRequest({
      method: "PUT",
      path: "todo/",
      queryString: id,
      body: {
        positionBetween,
      },
    }).then((res) => {
      if (typeof res.position !== "undefined") {
        todos[oldIndex].position = res.position;
      }
      setTodos(arrayMove(todos, oldIndex, newIndex));
    });
  };

  function findPositionBetween(todos, oldIndex, newIndex) {
    if (newIndex === 0) {
      todos[oldIndex].position = todos[0].position - 0.01;
      setTodos(todos);
      return [todos[oldIndex].position];
    }

    if (todos.length === newIndex + 1) {
      todos[oldIndex].position = todos[newIndex].position + 0.01;
      setTodos(todos);
      return [todos[oldIndex].position];
    }

    const prevPosition = todos[newIndex - 1].position;
    const nextPosition = todos[newIndex].position;

    return [prevPosition, nextPosition];
  }

  function toggleTodoCompleted(id) {
    fetchRequest({
      method: "PUT",
      path: "todo/",
      queryString: id,
      body: {
        completed: !todos.find((todo) => todo.id === id).completed,
      },
    }).then(() => {
      const newTodos = [...todos];
      const modifiedTodoIndex = newTodos.findIndex((todo) => todo.id === id);
      newTodos[modifiedTodoIndex] = {
        ...newTodos[modifiedTodoIndex],
        completed: !newTodos[modifiedTodoIndex].completed,
      };
      setTodos(newTodos);
    });
  }

  function deleteTodo(id) {
    fetchRequest({ method: "DELETE", path: "todo/", queryString: id }).then(
      () => {
        setTodos(todos.filter((todo) => todo.id !== id));
      }
    );
  }

  return (
    <>
      {todos.length > 0 && (
        <Paper className={classes.todosContainer}>
          <SortableList items={todos} onSortEnd={onSortTodos} />
        </Paper>
      )}
    </>
  );
}

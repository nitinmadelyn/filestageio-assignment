import { Button, Icon, Paper, Box, TextField } from "@material-ui/core";
import useStyles from "../../Assets/CssClasses";

export default function AddTodo(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.addTodoContainer}>
      <Box display="flex" flexDirection="row">
        <Box flexGrow={1}>
          <TextField
            id={"addTodoInput"}
            fullWidth
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                props.addTodo(event.target.value);
                event.target.value = "";
              }
            }}
          />
        </Box>
        <Button
          className={classes.addTodoButton}
          startIcon={<Icon>add</Icon>}
          onClick={() => props.addTodo(props.newTodoText)}
        >
          Add
        </Button>
      </Box>
    </Paper>
  );
}

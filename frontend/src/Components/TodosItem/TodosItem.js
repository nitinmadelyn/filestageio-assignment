import { useState } from "react";
import { fetchRequest } from "../../Utilities/CommonFunctions";
import { Typography, Button, Icon, Box, Checkbox } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import Moment from "moment";
import useStyles from "../../Assets/CssClasses";

export default function TodosItem(props) {
  const classes = useStyles();
  const { id, text, completed, dueDate } = props.todos;
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dueDate);

  const handleDateChange = (dueDate, id) => {
    fetchRequest({
      method: "PUT",
      path: "todo/",
      queryString: id,
      body: { dueDate: Moment(dueDate).format("yyyy-MM-DD") },
    }).then((res) => {
      setSelectedDate(dueDate);
    });
  };

  return (
    <Box
      id={"todo-" + id}
      display="flex"
      flexDirection="row"
      alignItems="center"
      className={classes.todoContainer}
    >
      <Checkbox
        checked={completed}
        onChange={() => props.toggleTodoCompleted(id)}
      ></Checkbox>
      <Box flexGrow={1}>
        <Typography
          className={completed ? classes.todoTextCompleted : ""}
          variant="body1"
        >
          {text}
        </Typography>
      </Box>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          autoOk
          value={selectedDate}
          open={open}
          className={classes.datepicker}
          onChange={(e) => handleDateChange(e, id)}
          minDate={Moment.utc()}
          onClose={() => setOpen((isOpen) => !isOpen)}
        />

        <Button
          className={classes.deleteTodo}
          startIcon={<Icon>schedule</Icon>}
          onClick={() => setOpen((isOpen) => !isOpen)}
        >
          Due Date
        </Button>
      </MuiPickersUtilsProvider>
      <Button
        className={classes.deleteTodo}
        startIcon={<Icon>delete</Icon>}
        onClick={() => props.deleteTodo(id)}
      >
        Delete
      </Button>
    </Box>
  );
}

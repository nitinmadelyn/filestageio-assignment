import { Typography, Button, Icon, Paper, Box } from "@material-ui/core";
import useStyles from "../../Assets/CssClasses";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import Moment from "moment";

export default function Filters(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.todosContainer}>
      <Box>
        <Typography className={classes.sortText}>Filter By Due Date</Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            autoOk
            value={props.dueDate}
            format={"yyyy-MM-dd"}
            onChange={props.handleFilter}
            minDate={Moment.utc()}
            invalidDateMessage={""}
          />
        </MuiPickersUtilsProvider>
        {props.dueDate ? (
          <Button
            className={classes.clearIcon}
            onClick={props.clearDate}
            title={"Clear"}
            startIcon={<Icon>close</Icon>}
          ></Button>
        ) : (
          ""
        )}
      </Box>
    </Paper>
  );
}

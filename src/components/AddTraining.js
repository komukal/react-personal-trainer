import { Button } from "@material-ui/core";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
function AddTraining(props) {
  const [open, setOpen] = React.useState(false);
  const [training, setTraining] = React.useState({
    date: "",
    activity: "",
    duration: "",
    customer: "",
  });
  const inputChanged = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const handleOpen = () => {
    setTraining({ ...training, customer: props.customerLink });
    setOpen(true);
  };

  const handleSave=()=>{
      props.addCustomerTraining(training);
      handleClose();
  }
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        onClick={handleOpen}
      >
        Add Training
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add training</DialogTitle>
        <DialogContent>
          <TextField
            id="datetime-local"
            label="Next appointment"
            name="date"
            margin="dense"
            type="datetime-local"
            onChange={inputChanged}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            margin="dense"
            label="Activity"
            value={training.activity}
            name="activity"
            onChange={inputChanged}
          />
          <TextField
            margin="dense"
            label="Duration (min)"
            value={training.duration}
            name="duration"
            onChange={inputChanged}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddTraining;

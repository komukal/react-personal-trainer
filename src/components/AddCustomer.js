import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
function AddCustomer(props) {
  const [open, setOpen] = React.useState(false);
  const [customer, setCustomer] = React.useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });

  const inputChanged = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    props.addCustomer(customer);
    handleClose();
  };

  return (
    <div>
      {" "}
      <Button
        style={{ marginTop: 10 }}
        variant="outlined"
        color="primary"
        onClick={handleOpen}
      >
        Add customer
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Car</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Firstname"
            value={customer.firstname}
            name="firstname"
            onChange={inputChanged}
          />
          <TextField
            margin="dense"
            label="Lastname"
            value={customer.lastname}
            name="lastname"
            onChange={inputChanged}
          />

          <TextField
            margin="dense"
            label="Street Address"
            value={customer.streetaddress}
            name="streetaddress"
            onChange={inputChanged}
            fullWidth={true}
          />
          <TextField
            margin="dense"
            label="Postal Code"
            value={customer.postcode}
            name="postcode"
            onChange={inputChanged}
          />
          <TextField
            margin="dense"
            label="City"
            value={customer.city}
            name="city"
            onChange={inputChanged}
          />
          <TextField
            margin="dense"
            label="Email"
            value={customer.email}
            name="email"
            onChange={inputChanged}
            fullWidth={true}
          />
          <TextField
            margin="dense"
            label="Phone number"
            value={customer.phone}
            name="phone"
            onChange={inputChanged}
            fullWidth={true}
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

export default AddCustomer;

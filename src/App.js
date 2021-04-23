import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Customerlist from "./components/Customerlist";
import Trainingslist from "./components/Trainingslist";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SportsHandballIcon from "@material-ui/icons/SportsHandball";
import GroupIcon from '@material-ui/icons/Group';
function App() {
  /******
   *
   * nav drawer functions
   *
   */

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button component="a" href="/customers">
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Customers" />

        </ListItem>
        <ListItem button component="a" href="/trainings">
          <ListItemIcon>
            <SportsHandballIcon />
          </ListItemIcon>
          <ListItemText primary="Training" />

        </ListItem>
      </List>
    </div>
  );

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          {["left"].map((anchor) => (
            <React.Fragment key={anchor}>
              <IconButton onClick={toggleDrawer(anchor, true)} color="inherit">
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}

          <Typography variant="h6">Personal Trainer</Typography>
        </Toolbar>
      </AppBar>
      <Router>
        <Switch>
          <Route exact path="/" component={Customerlist} />
          <Route path="/customers" component={Customerlist} />
          <Route path="/trainings" component={Trainingslist} />
          <Route path="*" render={() => <h1>Page not found</h1>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

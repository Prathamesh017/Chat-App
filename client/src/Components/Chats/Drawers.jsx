import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import axios from "axios";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import "./chat.css";

function TemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });
  const [users, setUsers] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [searchText, setSearchText] = React.useState("");

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  let loggedUser = JSON.parse(localStorage.getItem("user"));

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const searchUser = async () => {
    try {
      if (!searchText) {
        return;
      }
      let config = {
        headers: { Authorization: `Bearer ${loggedUser.token}` },
        params: {
          searchText: searchText,
        },
      };

      const user = await axios.get("http://localhost:3000/api/user", config);
      setUsers(user.data.data);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, true)}
      onKeyDown={toggleDrawer(anchor, true)}
    >
      <div
        className="input"
        style={{
          display: "flex",
          width: "100%",
          height: "10vh",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Search (Try Guest)"
          style={{
            border: "2px solid black",
            width: "60%",
            borderRadius: "20px",
            padding: "5px 5px 5px 5px",
          }}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        ></input>
        <Button
          variant="contained"
          size="small"
          color="success"
          onClick={searchUser}
        >
          GO
        </Button>
      </div>

      <Divider />

      {users.length > 0 &&
        users.map((user, index) => {
          return (
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItemButton
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}
              >
                <ListItem>
                  <ListItemAvatar>
                    <img
                      src={user.image}
                      width="50px"
                      height="50px"
                      style={{ borderRadius: "50%" }}
                      alt="mp"
                    />
                  </ListItemAvatar>
                  <ListItemText primary={user.name} secondary="Jan 9, 2014" />
                </ListItem>
              </ListItemButton>
            </List>
          );
        })}
    </Box>
  );

  return (
    <div>
      <Button variant="contained" onClick={toggleDrawer("left", true)}>
        Search User
      </Button>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </div>
  );
}

export default TemporaryDrawer;

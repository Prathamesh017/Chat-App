import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useContext } from "react";
import { chatContext } from "../../../Context/context";
import axios from "axios";
import { Alert } from "@mui/material";
import "../chat.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minHeight: 400,
  width: {
    xs: 300,
    sm: 400,
  },
  height: {
    xs: "auto",
    sm: "auto",
  },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};
// single or group chat modal
export function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState();
  const [groupName, setGroupName] = React.useState("");
  const [error, setError] = React.useState({
    showToast: false,
    showToastStatus: "",
    message: "",
  });
  const [users, setUsers] = React.useState([]);

  const { selectChat } = useContext(chatContext);
  const [existingGroupMembers, setExistingGroupMember] = React.useState(
    selectChat[0].users
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setUsers([]);
    setGroupName("");
    setError({ showToast: false, showToastStatus: "", message: "" });
  };
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  React.useEffect(() => {
    fetchImage();
  }, [selectChat]);

  async function fetchImage() {
    let image = selectChat[0].image;
    if (image.includes("anonymous-avatar")) {
      return setImage(image);
    }
    const res = await fetch(image);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImage(imageObjectURL);
  }
  const searchUser = async (searchText) => {
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

      const user = await axios.get(
        "https://chat-app-backend-production-b904.up.railway.app/api/user",
        config
      );
      setUsers(user.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateGroupName = async () => {
    if (!groupName) {
      setError((err) => ({
        ...err,
        showToast: true,
        showToastStatus: "error",
        message: "Please Enter GroupName",
      }));
      return;
    }
    try {
      await axios.put(
        "https://chat-app-backend-production-b904.up.railway.app/api/chat/group/rename",

        {
          chatId: selectChat[0].chatId,
          name: groupName,
        },
        {
          headers: { Authorization: `Bearer ${loggedUser.token}` },
        }
      );
      setError((err) => ({
        ...err,
        showToast: true,
        showToastStatus: "success",
        message: "Group Name Updated",
      }));
    } catch (error) {
      throw new Error(error);
    }
  };

  const UpdateFromGroup = async (new_user, operation) => {
    let users;
    if (operation === "remove") {
      if (existingGroupMembers.length <= 1) {
        if (!groupName) {
          setError((err) => ({
            ...err,
            showToast: true,
            showToastStatus: "error",
            message: "Group Should Have At least One Member",
          }));
          return;
        }
      }
      users = existingGroupMembers.filter(
        (existingGroupMember) => existingGroupMember._id !== new_user._id
      );
      setExistingGroupMember(users);
    } else if (operation === "add") {
      users = [...existingGroupMembers, new_user];
      setExistingGroupMember((user) => {
        return [...user, new_user];
      });
    }

    try {
      await axios.put(
        "https://chat-app-backend-production-b904.up.railway.app/api/chat/group/update",

        {
          chatId: selectChat[0].chatId,
          users: users,
        },
        {
          headers: { Authorization: `Bearer ${loggedUser.token}` },
        }
      );
      setError((err) => ({
        ...err,
        showToast: true,
        showToastStatus: "success",
        message: "Group Updated",
      }));
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div>
      <Button endIcon={<RemoveRedEyeIcon />} onClick={handleOpen}></Button>

      {!selectChat[0].isGroupChat ? (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} st>
            <div className="modal">
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                style={{
                  textAlign: "center",
                  marginTop: "-20px",
                  marginBotton: "20px",
                  textTransform: "capitalize",
                }}
              >
                {selectChat[0].name}
              </Typography>
              <img src={image} className="profile-image" alt="pt"></img>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Email:<br></br>
                {selectChat[0].email}
              </Typography>
            </div>
          </Box>
        </Modal>
      ) : (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} st>
            <div className="modal">
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                style={{
                  textAlign: "center",
                  marginTop: "-20px",
                  marginBotton: "20px",
                  textTransform: "capitalize",
                  fontSize: "20px",
                }}
              >
                {selectChat[0].name} Members
                <p>
                  {existingGroupMembers &&
                    existingGroupMembers.length > 0 &&
                    existingGroupMembers.map((user) => {
                      return (
                        <button
                          style={{
                            backgroundColor: "violet",
                            padding: "5px",
                            border: "none ",
                            margin: "5px",
                          }}
                          onClick={() => {
                            UpdateFromGroup(user, "remove");
                          }}
                        >
                          <p>
                            {user.name}
                            <span style={{ marginLeft: "5px", color: "white" }}>
                              X
                            </span>
                          </p>
                        </button>
                      );
                    })}
                </p>
              </Typography>
              <div className="group-inputs">
                <input
                  type="text"
                  placeholder="Enter Group Name"
                  onChange={(e) => {
                    setGroupName(e.target.value);
                  }}
                ></input>
                <Button
                  style={{
                    backgroundColor: "#00FF00",
                    width: "80%",
                    height: "40px",
                    border: "none",
                    color: "white",
                  }}
                  onClick={updateGroupName}
                >
                  Update Group Name
                </Button>
                <input
                  type="text"
                  placeholder="Add users"
                  onChange={(e) => {
                    searchUser(e.target.value);
                  }}
                ></input>
              </div>

              <div
                class="select-users"
                style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}
              ></div>
              <div className="users-list">
                {users.length > 0 ? (
                  users.map((user, index) => {
                    return (
                      <div
                        className="list-item-user"
                        onClick={() => {
                          UpdateFromGroup(user, "add");
                        }}
                      >
                        <div className="list-item-left">
                          <img
                            src={user.image}
                            width="30px"
                            height="30px"
                            style={{ borderRadius: "50%" }}
                            alt="mp"
                          />
                        </div>
                        <div className="list-item-right">
                          <div>{user.name}</div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>
                    No Users Found.<span>Search Again</span>
                  </p>
                )}
              </div>
            </div>

            <div
              className="button-bottom"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            ></div>
            {error.showToast && (
              <Alert
                severity={error.showToastStatus}
                style={{ marginTop: "20px" }}
              >
                {error.message}{" "}
              </Alert>
            )}
          </Box>
        </Modal>
      )}
    </div>
  );
}

export default BasicModal;

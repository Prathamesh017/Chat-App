import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import '../chat.css'
import AddIcon from '@mui/icons-material/Add'
import axios from 'axios'
import Alert from '@mui/material/Alert'
import { useContext } from 'react'
import { chatContext } from '../../../Context/context'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minHeight: 400,
  width: {
    xs: 300,
    sm: 400,
  },
  height: {
    xs: 'auto',
    sm: 'auto',
  },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
}

export function GroupChatModal() {
  const [open, setOpen] = React.useState(false)
  const [groupName, setGroupName] = React.useState('')
  const [users, setUsers] = React.useState([])
  const [groupUsers, setGroupUsers] = React.useState([])
  const [error, setError] = React.useState({
    showToast: false,
    showToastStatus: '',
    message: '',
  })
  const { setAllChats } = useContext(chatContext)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  let loggedUser = JSON.parse(localStorage.getItem('user'))

  const searchUser = async (searchText) => {
    try {
      if (!searchText) {
        return
      }
      let config = {
        headers: { Authorization: `Bearer ${loggedUser.token}` },
        params: {
          searchText: searchText,
        },
      }

      const user = await axios.get(
        'https://chat-app-backends-jy4z.onrender.com/api/user',
        config,
      )
      setUsers(user.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  const removeUserFromGroup = (name) => {
    let filterUsers = groupUsers.filter((user) => {
      return user.name !== name
    })
    setGroupUsers(filterUsers)
  }
  const createGroupChat = async () => {
    if (!groupName) {
      setError((err) => ({
        ...err,
        showToast: true,
        showToastStatus: 'error',
        message: 'please set group name',
      }))
      return
    }
    if (groupUsers.length < 2) {
      setError((err) => ({
        ...err,
        showToast: true,
        showToastStatus: 'error',
        message: 'Please Add Atleast 2 members in group',
      }))
      return
    }

    try {
      const newGroupchat = await axios.post(
        'https://chat-app-backends-jy4z.onrender.com/api/chat/group',

        {
          name: groupName,
          users: groupUsers,
        },
        {
          headers: { Authorization: `Bearer ${loggedUser.token}` },
        },
      )

      let users = newGroupchat.data.data[0].usersInChat.filter((user) => {
        return user._id !== loggedUser.id
      })

      let newUser = [
        {
          chatId: newGroupchat.data.data[0]._id,
          name: newGroupchat.data.data[0].chatName,
          image:
            'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
          isGroupChat: true,
          users: users,
        },
      ]

      setAllChats((existingChats) => [...existingChats, newUser])
    } catch {}
  }

  return (
    <div>
      <Button
        variant="contained"
        endIcon={<AddIcon />}
        style={{
          backgroundColor: '#64748B',
          size: {
            xs: 'small',
            sm: 'medium',
          },
        }}
        onClick={handleOpen}
      >
        New Group Chat
      </Button>
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
                textAlign: 'center',
                marginTop: '-20px',
                marginBotton: '20px',
                textTransform: 'capitalize',
                fontSize: '20px',
              }}
            >
              Create Group Chat
            </Typography>
            <div className="inputs">
              <input
                type="text"
                placeholder="Enter Group Name"
                onChange={(e) => {
                  setGroupName(e.target.value)
                }}
              ></input>
              <input
                type="text"
                placeholder="search users"
                onChange={(e) => {
                  searchUser(e.target.value)
                }}
              ></input>
            </div>

            <div
              class="select-users"
              style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}
            >
              {groupUsers.length > 0 &&
                groupUsers.map((user) => {
                  return (
                    <button
                      style={{
                        backgroundColor: 'violet',
                        padding: '5px',
                        border: 'none ',
                        marginTop: '5px',
                      }}
                      onClick={() => {
                        removeUserFromGroup(user.name)
                      }}
                    >
                      <p>
                        {user.name}
                        <span style={{ marginLeft: '5px', color: 'white' }}>
                          X
                        </span>
                      </p>
                    </button>
                  )
                })}
            </div>
            <div className="users-list">
              {users.length > 0 ? (
                users.map((user, index) => {
                  return (
                    <div
                      className="list-item-user"
                      onClick={() => {
                        setGroupUsers((existingUsers) => [
                          ...existingUsers,
                          user,
                        ])
                      }}
                    >
                      <div className="list-item-left">
                        <img
                          src={user.image}
                          width="30px"
                          height="30px"
                          style={{ borderRadius: '50%' }}
                          alt="mp"
                        />
                      </div>
                      <div className="list-item-right">
                        <div>{user.name}</div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <>
                  <p>
                    No Users Found.<span>Search Again</span>
                  </p>
                </>
              )}
            </div>
          </div>

          <div
            className="button-bottom"
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '20px',
            }}
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: '#FFA500',
                size: {
                  xs: 'small',
                  sm: 'medium',
                },
              }}
              onClick={createGroupChat}
            >
              Create Chat
            </Button>
          </div>
          {error.showToast && (
            <Alert
              severity={error.showToastStatus}
              style={{ marginTop: '20px' }}
            >
              {error.message}{' '}
            </Alert>
          )}
        </Box>
      </Modal>
    </div>
  )
}

export default GroupChatModal

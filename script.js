const baseUrl = 'http://localhost:3000'
const usernameInput = document.querySelector("#username-input")
const imageInput = document.querySelector("#image-input")
const loginContainer = document.querySelector("#login-container")
const mainContainer = document.querySelector(".main_container")

const state = {
  users: null,
  current_user: null
}

loginSetup = () => {
  fetch(baseUrl + "/users")
    .then(response => response.json())
    .then(data => state.users = data)
  const loginForm = document.querySelector("#login-form")
  loginForm.addEventListener("submit", logUserIn)
}

findOrCreateUser = (event) => {
  let currentUser = state.users.find(user => user.name === usernameInput.value)
  if (!currentUser) {
    createUser().then(data => {
      currentUser = data
      state.users.push(currentUser)
      state.current_user = currentUser
    })
  }
  state.current_user = currentUser
}

createUser = () => {
  return fetch(baseUrl + "/users", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: usernameInput.value,
      url: imageInput.value
    })
  }).then(response => response.json())
}

openRealTalkApp = () => {
  loginContainer.style.display = "none"
  mainContainer.style.display = "flex"
}

loadUserInfo = () => {
  state.current_user.
}

logUserIn = (event) => {
  event.preventDefault()

  findOrCreateUser(event)
  // loadUserInfo()
  openRealTalkApp()
}

// 1 - Create Login Method :
// - check whether a user already exists - add name validation
// - if not, create a new user
// - fetch all that users chat history
// - load chats into the chat menu on the left hand side

// 2 - Create user drop down menu:
//  - logged in user can choose any other user via drop down
// - check if a chat for those two users already exists
// - if not, create a new chat and and switch to that Window

// 3 - Allow user to switch to preexisting chat
// - if a user clicks on anyone in the left hand chat menu, their chat with that person is loaded into the message window
// - this also adds an event listener to the input field, allowing them to add a  message to this chat
// - this also starts the setinterval method so that the chat automatically updates

// 4- Allow user to add messages to chats
// - if a user types into the chat box and presses enter, the message is added to the current chat

// 5 - build setinterval refresh method

// fetchChats = (id) => {
//   fetch(baseUrl + "users/" + id).then(response => response.json())
// }
//
// getJackChats = () => {
//   fetchChats(1).then(data => {
//     data.user_chats.forEach(chat => {
//       fetch(baseUrl + "chats/" + chat.chat_id)
//     })
//   })
// }

document.onload = loginSetup()

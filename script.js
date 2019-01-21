const baseUrl = 'http://localhost:3000/'
const usernameInput = document.querySelector("#username-input")

const state = {
  user_id: null,
  name: null,
  chats: null,
}

loginSetup = () => {
  const loginForm = document.querySelector("#login-form")
  loginForm.addEventListener("submit", logUserIn)
}

logUserIn = (event) => {
  const userName = usernameInput.value)
  if ()
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

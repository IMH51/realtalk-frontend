const baseUrl = 'http://localhost:3000'
const usernameInput = document.querySelector("#username-input")
const imageInput = document.querySelector("#image-input")
const loginContainer = document.querySelector("#login-container")
const mainContainer = document.querySelector(".main_container")
const createImageButton = document.querySelector("#create-image-button")
const userChatList = document.querySelector("#user-chat-list")
const messageList = document.querySelector(".messages")
const submitMessageButton = document.querySelector("#message-submit-button")
const messageInput = document.querySelector("#create_message")

const state = {
  users: null,
  current_user: null
}

toggleImageInput = (event) => {
      event.preventDefault()
       if(imageInput.style.display == 'none')
          imageInput.style.display = 'block';
       else
          imageInput.style.display = 'none';
    }

createImageButton.addEventListener("click", toggleImageInput)


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

getAllChats = (id) => {
  return fetch(baseUrl + "/user_chats").then(response => response.json())
}

renderMessage = (message) => {
  let messageToRender = document.createElement("li")
  messageToRender.classList = "message"
  messageToRender.dataset.id = message.user_id
  let messageUser = state.users.find(user => user.id == messageToRender.dataset.id)
  let displayName
  messageToRender.innerHTML = `
    <img class="message_usr_image" src="${messageUser.url}"></img>
    <p class="message_text">${message.content}</p>
  `
  if (messageToRender.dataset.id == state.current_user.id) {
    messageToRender.classList.add("sender_message")

  } else {
    messageToRender.classList.add("receiver_message")
  }
  messageList.appendChild(messageToRender)
}

renderNewMessage = (event) => {
  event.preventDefault()
  console.log(messageInput.value)
}

renderFullChatInWindow = (event) => {
  event.preventDefault()
  messageList.innerHTML = ""
  let chatToRender = state.current_user.chats.find(chat => chat.id == event.target.dataset.id)
  chatToRender.messages.forEach(renderMessage)
  submitMessageButton.addEventListener("click", renderNewMessage)
}

renderChatButtonInMenu = (user, chat) => {
  let newButton = document.createElement("li")
  newButton.innerText = user.name
  newButton.dataset.id = chat.chat_id
  userChatList.appendChild(newButton)
  newButton.addEventListener("click", renderFullChatInWindow)
}

loadUserInfo = () => {
  state.current_user.user_chats.forEach(chat => {
    getAllChats().then(data => {
      let selectedChat = data.find(userChat => (userChat.chat_id === chat.chat_id) && (userChat.user_id !== state.current_user.id))
      let otherChatUser = state.users.find(user => user.id === selectedChat.user_id)
      renderChatButtonInMenu(otherChatUser, selectedChat)
    })
  })
}

logUserIn = (event) => {
  event.preventDefault()
  findOrCreateUser(event)
  loadUserInfo()
  openRealTalkApp()
}


// add user picture to chat menu Window
// display current user name and picture in sidebar

// 2 - Create user drop down menu:
//  - logged in user can choose any other user via drop down
// - check if a chat for those two users already exists
// - if not, create a new chat and and switch to that Window

// 3 - Allow user to switch to preexisting chat
// - this also adds an event listener to the input field, allowing them to add a  message to this chat
// - this also starts the setinterval method so that the chat automatically updates

// 4- Allow user to add messages to chats
// - if a user types into the chat box and presses enter, the message is added to the current chat
// use state for creating message object??

// 5 - build setinterval refresh method


document.onload = loginSetup()

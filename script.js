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
let userImage = document.querySelector(".user_image")
let userDisplayName = document.querySelector(".user_display_name")
let chatSearchInput = document.querySelector("#chat_search_input")

const state = {
  users: null,
  current_user: null
}

toggleImageInput = (event) => {
      event.preventDefault()
       if(imageInput.style.display == 'block')
          imageInput.style.display = 'none'
       else
          imageInput.style.display = 'block'
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
  let currentUser = state.users.find(user => user.name == usernameInput.value)
  if (!currentUser) {
    createUser().then(data => {
      currentUser = data
      state.users.push(currentUser)
      state.current_user = currentUser
      // userImage.src = state.current_user.url
      // userDisplayName.innerText = state.current_user.name
      loadUserInfo()
    })
  } else {
      state.current_user = currentUser
      loadUserInfo()
    }
  }
  // state.current_user = currentUser


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
  chatSearchInput.addEventListener('keypress', () => {
    event.preventDefault()
    if (event.keyCode === 13){
      findOrCreateNewChat(event)
    } else {
      chatSearchInput.value += event.key
    }
  })
  chatSearchInput.addEventListener('submit', findOrCreateNewChat)
}
/* findOrCreateNewChat */
findUser = (event) => {
  event.preventDefault()

  let foundUser = state.users.find(user => user.name == chatSearchInput.value)
  console.log(foundUser)

    if (!foundUser) {
      alert("User doesn't exist!")
    }
    else {
      findChat(foundUser)
    }
    chatSearchInput.value = ""
}

findChat = (foundUser) => {
  let chatMatch
  foundUser.chats.forEach(foundChat => {
    state.current_user.chats.forEach(userChat => {
      if (foundChat.id == userChat.id){
        chatMatch =  userChat
        renderFoundChatInWindow(chatMatch, foundUser)
      }
      else {
        createNewChat(foundUser)
      }
    })
  })
  console.log(chatMatch)
  // if (!chatMatch){
  //     createNewChat(foundUser)
  // }
  // iterating through logged users chats.
  // for each chat, we get the id
  //then search all user chats with the chat id and found user id.
  // if found, call renderFullChatInWindow, and set that chat to be the activechat
  //if not found, create a new Chat and 2 new UserChat with the same new Chat id
  // then renderFullChatInWindow and refresh+append the chat menu with that chat as the activechat
}

/*  post requests to API */
createNewChat = (foundUser) => {
  let newChat
  let currentUserChat
  let foundUserChat

  fetch(baseUrl+ '/chats', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({})
  })
  .then(response => response.json())
  .then(data => newChat = data)

  console.log(newChat)

}

/*                       */
renderFoundChatInWindow = (chatMatch, foundUser) => {
  messageList.innerHTML = ""
  chatMatch.messages.forEach(renderMessage)
  submitMessageButton.addEventListener("click", renderNewMessage)
  let currentActiveButton = document.querySelector('#user-chat-list li#active_user')
    if (currentActiveButton) {
      currentActiveButton.id = ""
    }
  let selectedButton = document.querySelector(`#user-chat-list li[data-id="${foundUser.id}"]`)
  debugger
  selectedButton.id = 'active_user'
  console.log(selectedButton)
}

findOrCreateNewChat = (event) => {
  event.preventDefault()
  findUser(event)
}



/* Rendering messages from the corresponding chat upon click */
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
  newButton.innerHTML = `<img class="message_usr_image" src="${user.url}"></img>${user.name}`
  newButton.dataset.id = chat.chat_id
  userChatList.appendChild(newButton)
  newButton.addEventListener("click", (event) => {
    newButton.id = "active_user"
    renderFullChatInWindow(event)
  })
}

loadUserInfo = () => {
  userImage.src = `${state.current_user.url}`
  userDisplayName.innerText = state.current_user.name
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
  // loadUserInfo()
  openRealTalkApp()
}


// 2 - Create chat drop down menu:
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

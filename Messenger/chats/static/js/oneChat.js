const form = document.querySelector(".messageForm")
const chatGroupPk = document.getElementById("backBtn").value
console.log(chatGroupPk)
// Вказуємо адресу websocket, щоб сервер розумів куди ми хочемо підключитися
const socketUrl = `ws://${window.location.host}/chats/chat/${chatGroupPk}/`
// Створюємо об'єкт класу "WebSocket" при його створенні відбувається надсилання запиту підключення на сервер
const socket = new WebSocket(socketUrl)
let backBtn = document.querySelector("#backBtn")
let messages = document.querySelector(".mainGroup")


form.addEventListener("submit", (event) => {
    // Запобігаємо надсилання форми на сервер та перезавантаження сторінки
    event.preventDefault()
    // Отримуємо текст повідомлення, який написав користувач
    let message = document.getElementById("id_message").value
    // Надсилаємо повідомлення через websocket на сервер, щоб повідомлення прийшло іншим користувачам та переробляємо об'єкт у json рядок
    socket.send(JSON.stringify({ "message": message }))
    console.log("gbewoirnjmuonrjb")
    // Видаляємо усі дані, вказані у формі
    form.reset()
})

backBtn.addEventListener("click", () => {
    window.location.href = "/chats/"
})

socket.addEventListener("message", function (event) {
    const messageObject = JSON.parse(event.data)
    const messageElem = document.createElement("div")
    messageElem.classList = "message"

    messageElem.innerHTML = `<div class="message">
                <img src="${messageObject["user_avatar"]}" class="avatarMessage">
                <div class="nonAvatar">
                    <p class="authorUsename">${messageObject["first_name"]} ${messageObject["last_name"]}</p>
                    <p class="messageContent">${messageObject["message"]}</p>
                </div>
            </div>`
    messages.append(messageElem)
    messages.scrollTo(-1, document.body.scrollHeight);
})

messages.scrollTo(-1, document.body.scrollHeight);
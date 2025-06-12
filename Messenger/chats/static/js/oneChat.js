const form = document.querySelector(".messageForm")
const chatGroupPk = document.getElementById("backBtn").value
console.log(chatGroupPk)
// Вказуємо адресу websocket, щоб сервер розумів куди ми хочемо підключитися
const socketUrl = `ws://${window.location.host}/chats/chat/${chatGroupPk}/`
// Створюємо об'єкт класу "WebSocket" при його створенні відбувається надсилання запиту підключення на сервер
const socket = new WebSocket(socketUrl)
let backBtn = document.querySelector("#backBtn")
let messages = document.querySelector(".mainGroup")


function scrollToBottom(element) {
    element.scrollTo(0, element.scrollHeight);
}

form.addEventListener("submit", (event) => {
    // Запобігаємо надсилання форми на сервер та перезавантаження сторінки
    event.preventDefault()
    // Отримуємо текст повідомлення, який написав користувач
    let message = document.getElementById("id_message").value
    if (message != "") {

        // Надсилаємо повідомлення через websocket на сервер, щоб повідомлення прийшло іншим користувачам та переробляємо об'єкт у json рядок
        socket.send(JSON.stringify({ "message": message }))
        console.log("gbewoirnjmuonrjb")
        // Видаляємо усі дані, вказані у формі
        form.reset()
    }
})

backBtn.addEventListener("click", () => {
    window.location.href = "/chats/"
})

socket.addEventListener("message", function (event) {
    const messageObject = JSON.parse(event.data)
    const messageElem = document.createElement("div")
    messageElem.classList = "message"
    let dateTime = new Date(messageObject['date_time'])
    let dateTimeLocal = dateTime.toLocaleString()

    messageElem.innerHTML = `<div class="message">
                <img src="${messageObject["user_avatar"]}" class="avatarMessage">
                <div class="nonAvatar">
                    <div class = "usernameAndTextcontent">
                        <p class="authorUsename">${messageObject["first_name"]} ${messageObject["last_name"]}</p>
                        <p class="messageContent">${messageObject["message"]}</p>
                    </div>
                    <p class="datetime">${dateTimeLocal.split(",")[1].split(":")[0]}:${dateTimeLocal.split(",")[1].split(":")[1]}</p >
                </div >
            </div > `
    messages.append(messageElem)
    const datesAndTimes = document.querySelectorAll('.datetime')
    // Перебираємо отримані HTML-елементи з датами та часом
    for (let dt of datesAndTimes) {
        // Створюємо новий об'єкт класу "Date" з даними дати у фоматі iso
        let dateAndTime = new Date(dt.textContent)
        // переробляємо час у локальний час користувача
        let dateAndTimeLocal = dateAndTime.toLocaleString()
        // вказуємо час повідомлення
        dt.textContent = `${dateTimeLocal.split(",")[1].split(":")[0]}:${dateTimeLocal.split(",")[1].split(":")[1]}`
    }
    scrollToBottom(messages)
})

scrollToBottom(messages)

const datesAndTimes = document.querySelectorAll('.datetime')
// Перебираємо отримані HTML-елементи з датами та часом
for (let dt of datesAndTimes) {
    // Створюємо новий об'єкт класу "Date" з даними дати у фоматі iso
    let dateAndTime = new Date(dt.textContent)
    // переробляємо час у локальний час користувача
    let dateAndTimeLocal = dateAndTime.toLocaleString()
    // вказуємо час повідомлення
    dt.textContent = `${dateAndTimeLocal.split(",")[1].split(":")[0]}:${dateAndTimeLocal.split(",")[1].split(":")[1]}`
}


let groupCreateFirst = document.querySelector(".group-create")
let groupCreateSecond = document.querySelector(".group-create-2-step")

let skipBtn = document.querySelector(".skipBtn")
let nextBtn = document.querySelector(".next")

let imageInput = document.querySelector(".ImageInput")
let imagesDiv = document.querySelector(".GroupAvatarDiv")

let createChat = document.querySelector(".create-chat-btn")
let cancelBgBlur = document.querySelectorAll("#cancel-bg-blur")
let backgroundBlur = document.querySelector(".background-blur")

let goToBack = document.querySelector(".skipBtn-2-step")

let createGroupForm = document.querySelector("#create_group")

let groupList = document.querySelectorAll(".profiles-text")



groupList.forEach(element => {
    element.addEventListener("click", () => {
        window.location.href = `/chats/chat/${element.id}`
    })
});

goToBack.addEventListener("click", () => {
    groupCreateFirst.style.display = "flex"
    groupCreateSecond.style.display = "none"
})


createChat.addEventListener("click", () => {
    backgroundBlur.style.display = "flex"
})

cancelBgBlur.forEach(element => {
    element.addEventListener("click", () => {
        backgroundBlur.style.display = "none"
    })
});

skipBtn.addEventListener("click", () => {
    groupCreateFirst.style.display = "none"
    groupCreateSecond.style.display = "flex"
})

nextBtn.addEventListener("click", () => {
    groupCreateFirst.style.display = "none"
    groupCreateSecond.style.display = "flex"
})


function displayImage(input, div, filesList) {
    div.innerHTML = ''

    let file = filesList[0]
    let createImage = document.createElement("img")
    createImage.classList.add("GroupAvatar")
    createImage.id = "imageForPost"
    if (file) {
        createImage.setAttribute('src', URL.createObjectURL(file));
        div.appendChild(createImage)
    }

}


imageInput.addEventListener('change', function (event) {
    displayImage(imageInput, imagesDiv, imageInput.files);
});



let addedCheckbox = document.querySelectorAll(".addedCheckbox")
let arrayOfUsers = ""
let create_group = document.querySelector("#create_group")

let group_id = document.querySelector(".group_id").value

let choosedUsers = document.querySelector(".choosedUsers")

create_group.addEventListener("submit", (event) => {
    addedCheckbox.forEach(element => {
        if (element.checked) {
            choosedUsers.value += `${element.value}_`
        }
    });

    let input_find = document.querySelector(".input_find").value

    $.ajax({
        url: `add/${arrayOfUsers}/${group_id}`,
        type: 'POST',
        data: {
            'csrfmiddlewaretoken': document.querySelector('[name=csrfmiddlewaretoken]').value,
            "group_name": input_find
        },
        success: function (response) {
            console.log(response)
        }
    })
})

let profilesList = document.querySelectorAll(".profile")

console.log(profilesList)

profilesList.forEach(element => {
    element.addEventListener("click", () => {
        console.log(element.id)

        window.location.href = `create_chat/${element.id}/`
    })

});

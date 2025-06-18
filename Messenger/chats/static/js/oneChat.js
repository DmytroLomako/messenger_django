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
    element.scrollTo(0, element.scrollHeight)
}



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
    window.location.reload()
})

scrollToBottom(messages)

const datesAndTimes = document.querySelectorAll('.datetime')
// Перебираємо отримані HTML-елементи з датами та часом
for (let dt of datesAndTimes) {
    // Створюємо новий об'єкт класу "Date" з даними дати у фоматі iso
    let dateAndTime = new Date(dt.textContent)
    let dateAndTimeLocal = dateAndTime.toLocaleString()
    if (dateAndTimeLocal != "Invalid Date") {
        console.log(dateAndTimeLocal)
        dt.textContent = `${dateAndTimeLocal.split(",")[1].split(":")[0]}:${dateAndTimeLocal.split(",")[1].split(":")[1]}`
    }
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
})

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
})

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
        createImage.setAttribute('src', URL.createObjectURL(file))
        div.appendChild(createImage)
    }

}
function displayImageAbsolute(input, div, filesList) {
    div.innerHTML = ''
    let file = filesList[0]
    let createImage = document.createElement("img")
    createImage.classList.add("MessageImage")
    createImage.id = "MessageImage"
    if (file) {
        createImage.setAttribute('src', URL.createObjectURL(file))
        div.appendChild(createImage)
    }

}



imageInput.addEventListener('change', function (event) {
    displayImage(imageInput, imagesDiv, imageInput.files)
})

document.querySelector(".sendImg2").addEventListener("change", () => {
    displayImageAbsolute(document.querySelector(".sendImg2"), document.querySelector(".imagesMessageDiv"), document.querySelector(".sendImg2").files)
})

async function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
        reader.readAsDataURL(file)
    })
}

form.addEventListener("submit", async (event) => {
    event.preventDefault()
    const message = document.getElementById("id_message").value.trim()

    if (!message) return

    let imageData = null
    const fileInput = document.querySelector(".sendImg2")
    if (fileInput.files.length > 0) {
        try {
            imageData = await fileToBase64(fileInput.files[0])
        } catch (error) {
            console.error("File conversion error:", error)
            alert("Ошибка при обработке файла")
            return
        }
    }
    socket.send(JSON.stringify({
        message: message,
        images: imageData
    }))

    form.reset()
})

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
    })

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

        window.location.href = `/chats/create_chat/${element.id}/`
    })

})



let dotsMenu = document.querySelector(".dotsDiv")
let editBtns = document.querySelector(".edit")
let deleteBtns = document.querySelector(".delete")
dotsMenu.addEventListener("click", () => {
    if (dotsMenu.style.width == "200px") {
        dotsMenu.style.width = "0"
        dotsMenu.style.height = "30px"
        editBtns.style.display = "none"
        deleteBtns.style.display = "none"
    } else {
        dotsMenu.style.width = "200px"
        dotsMenu.style.height = "75px"
        dotsMenu.style.backgroundColor = "white"
        editBtns.style.display = "flex"
        deleteBtns.style.display = "flex"
    }
})

deleteBtns.addEventListener("click", () => {
    window.location.href = `/chats/delete_group/${deleteBtns.id}`
})

async function addFileToInput(filePath, inputElement) {
    try {
        let response = await fetch(filePath)
        let blob = await response.blob()
        let file = new File([blob], 'filename.txt', { type: blob.type })

        let dataTransfer = new DataTransfer()
        dataTransfer.items.add(file)
        inputElement.files = dataTransfer.files
    } catch (error) {
        console.error('Error adding file to input:', error)
    }
}


editBtns.addEventListener("click", () => {
    backgroundBlur.style.display = "flex"
    document.querySelector(".formType").setAttribute("value", "redact")
    document.querySelectorAll(".addedCheckbox").forEach(element => {
        let string_of_members = document.querySelector(".list_of_members").getAttribute("value")
        let listOfMembers = string_of_members.split("_")
        listOfMembers.pop()
        console.log(listOfMembers, element.value)
        if (listOfMembers.includes(element.value)) {
            element.setAttribute("checked", true)
        }
    })
    document.querySelector("#nameInput").setAttribute("value", document.querySelector(".groupName").textContent)
    document.querySelector(".GroupAvatar").setAttribute("src", document.querySelector(".avatarGroup").src)
    let inputFile = document.querySelector("#inputAvatarGroup")
    addFileToInput(document.querySelector(".avatarGroup").src, inputFile)
    document.querySelector(".NameTitle").textContent = "Редагування групи"
    document.querySelector(".NameTitle").textContent = "Редагування групи"
})

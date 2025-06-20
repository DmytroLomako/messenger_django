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

let groupList = document.querySelectorAll(".profles")
const countRequestsFriends = document.querySelector(".count-requests-friends");
const requestFriendsDiv = document.querySelector(".requests-friends")



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

if (countRequestsFriends.textContent == 0) {
    requestFriendsDiv.style.display = "none"
} else {
    requestFriendsDiv.style.display = "flex"
}
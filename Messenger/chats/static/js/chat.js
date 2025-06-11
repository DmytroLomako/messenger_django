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
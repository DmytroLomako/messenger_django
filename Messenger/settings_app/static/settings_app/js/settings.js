const passwordField = document.getElementById('id_password');

const editBtnHeader = document.querySelector(".edit-information-btn-header")
const editBtnHeaderImage = document.querySelector(".edit-information-btn-header img")
const imageInput = document.querySelector("#imageInput")
const imageInputDiv = document.querySelector(".avatarDiv label img")
let inputs = document.querySelectorAll(".input")
const editBtnMain = document.querySelector(".edit-information-btn-main")
const editBtnSign = document.querySelector(".edit-information-btn-sign")
const forSignImage = document.querySelector(".signImage")
const signInput = document.querySelector("#signInput")

if (passwordField) {
    const wrapper = document.createElement('div');
    wrapper.className = 'password-wrapper';
    passwordField.parentNode.insertBefore(wrapper, passwordField);
    wrapper.appendChild(passwordField);
    const eyeIcon = document.createElement('span');
    eyeIcon.className = 'eye-icon eye-closed';
    wrapper.appendChild(eyeIcon);

    eyeIcon.addEventListener('click', function () {
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            eyeIcon.className = 'eye-icon eye-open';
        } else {
            passwordField.type = 'password';
            eyeIcon.className = 'eye-icon eye-closed';
        }
    });
}


editBtnHeader.addEventListener("click", () => {
    if (editBtnHeader.type == "submit") {
        const imageInput = document.querySelector("#imageInput")
        imageInput.type = "file"
        editBtnHeader.innerHTML = "<img class = 'editImg' src = '/static/images/check_mark.png'>Підтердити"
        editBtnHeader.type = "button"
    } else {
        const imageInput = document.querySelector("#imageInput")
        imageInput.type = "file"
        editBtnHeader.type = "submit"
    }
})

imageInput.addEventListener("change", () => {
    let file = imageInput.files[0]
    if (file) {
        imageInputDiv.setAttribute('src', URL.createObjectURL(file));
    }
})



editBtnMain.addEventListener("click", (event) => {
    if (editBtnMain.type == "submit") {
        editBtnMain.innerHTML = "<img class = 'editImg' src = '/static/images/check_mark.png'>Підтердити"
        editBtnMain.type = "button"

        inputs.forEach(element => {
            console.log(element)
            element.removeAttribute("readonly")
        });
    } else {
        editBtnMain.type = "submit"
    }
})

editBtnSign.addEventListener("click", () => {
    if (editBtnSign.type == "submit") {
        const signInput = document.querySelector("#signInput")
        signInput.type = "file"
        editBtnSign.innerHTML = "<img class = 'editImg' src = '/static/images/check_mark.png'>Підтердити"
        editBtnSign.type = "button"
    } else {
        const signInput = document.querySelector("#signInput")
        signInput.type = "file"
        editBtnSign.type = "submit"
    }
})

signInput.addEventListener("change", () => {
    let file = signInput.files[0]
    if (file) {
        forSignImage.setAttribute('src', URL.createObjectURL(file));
    }
})

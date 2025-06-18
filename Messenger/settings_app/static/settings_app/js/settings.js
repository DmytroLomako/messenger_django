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
const nameAndSurname = document.querySelector(".name-and-surname-text")
const signText = document.querySelector(".sign-text")
const allSignDiv = document.querySelector(".signature-options-div")
const signOnlyDiv = document.querySelector(".signature-only-div")
const editSignBtn = document.querySelector(".edit-sign-btn")
const signatureImgDiv = document.querySelector(".signature-img-div")
const paintSign = document.querySelector(".paint-sign")
const paintSignGetContext = paintSign.getContext("2d")
const colorPicker = document.querySelector(".color-picker")

let drawing = false;
let currentColor = '#070A1C';
paintSignGetContext.strokeStyle = currentColor;


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


const title = document.querySelector(".title")
const headerDivEdit = document.querySelector(".card-profile-div")
const labelUsername = document.querySelector(".username")
const username = document.querySelector("#inputUsername")
const usernameP = document.querySelector(".username")

editBtnHeader.addEventListener("click", () => {
    if (editBtnHeader.type == "submit") {
        const imageInput = document.querySelector("#imageInput")
        const imageInput2 = document.querySelector(".divPhoto")
        title.style.display = "block"
        imageInput2.style.display = "flex"
        imageInput.type = "file"
        editBtnHeader.innerHTML = "<img class = 'editImg' src = '/static/images/check_mark.png'>Підтердити"
        editBtnHeader.type = "button"
        labelUsername.style.display = "flex"
        username.style.display = "flex"
        usernameP.style.display = "none"
    } else {
        $.ajax({
            url: `/save_username/${document.querySelector("#inputUsername").value}/`,
            type: 'POST',
            data: {
                'csrfmiddlewaretoken': document.querySelector('[name=csrfmiddlewaretoken]').value
            },
            success: function (response) {
                console.log(response)
            }
        })
        const imageInput = document.querySelector("#imageInput")
        title.style.display = "none"
        imageInput.type = "file"
        editBtnHeader.type = "submit"
        imageInput2.style.display = "none"
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
        nameAndSurname.style.opacity = "100%"
        signText.style.opacity = "100%"
        allSignDiv.style.height = "49vw"
        signOnlyDiv.style.height = "50vw"
        editSignBtn.style.display = "flex"
        signatureImgDiv.style.border = "1px solid #81818D"
        signatureImgDiv.style.borderStyle = "dotted"
    } else {
        const signInput = document.querySelector("#signInput")
        const paintSign = document.querySelector(".paint-sign")
        const paintSignSave = paintSign.toDataURL('images/png');
        const csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value;
        paintSign.toBlob(function (blob) {

            var formData = new FormData();
            formData.append('sign', blob, 'signature.png');
            formData.append('csrfmiddlewaretoken', csrf_token);

            console.log('Размер файла:', blob.size);
            $.ajax({
                url: '/settings/save_sign',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function () {
                    window.location.reload()
                }
            });
        })

    }
})

editSignBtn.addEventListener("click", (event) => {
    event.preventDefault()
    editSignBtn.style.display = "none"
    if (forSignImage.style.display != null) {
        forSignImage.style.display = "none"
    }
    signatureImgDiv.style.width = "21vw"
    signatureImgDiv.style.height = "25vh"
    paintSign.style.display = "flex"
    colorPicker.style.display = "flex"

    paintSign.addEventListener('mousedown', startDraw);
    paintSign.addEventListener('mousemove', draw);
    paintSign.addEventListener('mouseup', stopDraw);
    paintSign.addEventListener('mouseleave', stopDraw);

    const colors = document.querySelectorAll('.color');
    colors.forEach(color => {
        color.addEventListener('click', () => {
            colors.forEach(c => c.classList.remove('active'));
            color.classList.add('active');
            currentColor = color.getAttribute('data-color');
            paintSignGetContext.strokeStyle = currentColor;
        })
    });

    function startDraw(e) {
        drawing = true;
        paintSignGetContext.beginPath();
        paintSignGetContext.moveTo(e.offsetX, e.offsetY);
    }

    function draw(e) {
        if (!drawing) return;
        paintSignGetContext.lineTo(e.offsetX, e.offsetY);
        paintSignGetContext.stroke();
    }

    function stopDraw() {
        drawing = false;
        paintSignGetContext.closePath();
    }
})

signInput.addEventListener("change", () => {
    let file = signInput.files[0]
    if (file) {
        forSignImage.setAttribute('src', URL.createObjectURL(file));
    }
})

let bgBlur = document.querySelector('.background-blur')


const btnPassword = document.querySelector(".edit-password-btn-main")
const personalForm = document.querySelector(".personal-information-form")
const passwordForm = document.querySelector(".password-form")
const personalInformDiv = document.querySelector(".personal-information-div")
const passwordDiv1 = document.querySelector(".password-div-1")
const passwordText = document.querySelector(".password-text-name")
const passwordTextForm = document.querySelector(".password-text-name-form")
const checkBoxImg = document.querySelector(".checkbox-img")
const checkBoxImg2 = document.querySelector(".checkbox-img-2")

btnPassword.addEventListener("click", (event) => {
    let password2 = document.querySelector(".password2")
    if (passwordTextForm.style.display == "flex") {
        if (document.querySelector(".password1").value != "") {
            $.ajax({
                url: `/settings/send_email_password_verify`,
                type: 'POST',
                data: {
                    'csrfmiddlewaretoken': document.querySelector('[name=csrfmiddlewaretoken]').value
                },
                success: function (response) {
                    console.log(response)
                }
            })
            document.querySelector(".password1-hide").value = document.querySelector(".password1").value
            document.querySelector(".password2-hide").value = document.querySelector(".password2").value
            bgBlur.style.display = "flex"
        } else {
            window.location.reload()
        }
    } else {

        // btnPassword.innerHTML = "<button class='edit-password-btn-main redact' type='submit'><img class='editImg' src='/static/images/edit2.png' %}' alt='' type='button'>Змінити пароль</button>"
        passwordDiv1.innerHTML += "<input type='password' name='password2' class = 'password2' placeholder=''><img src='' alt=''></img>"
        passwordText.innerHTML = "<p class='password-text-name'>Новий пароль</p>"
    }
    personalForm.style.display = "none"
    personalInformDiv.style.border = "1px solid #543C52"
    passwordTextForm.style.display = "flex"
    btnPassword.style.backgroundColor = "#E9E5EE"
    passwordForm.style.marginTop = "0"

})

let cancelBgBlur = document.getElementById('cancel-bg-blur')
cancelBgBlur.addEventListener('click', function () {
    bgBlur.style.display = 'none'
    window.location.reload()
})

const Inputs = document.querySelectorAll(".input-verify")

console.log(Inputs)

Inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        if (input.value.length === 1 && index < Inputs.length - 1) {
            Inputs[index + 1].focus()
        }
    })
    input.addEventListener('keydown', (event) => {
        if (event.key === "Backspace" && input.value === "" && index > 0) {
            Inputs[index - 1].focus()
        }
    })
})
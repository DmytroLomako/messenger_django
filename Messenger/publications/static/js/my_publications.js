let buttonSend = document.querySelector('.submit')
let input = document.querySelector('.areaInput')
let bgBlur = document.querySelector('.background-blur')
let cancelBgBlur = document.getElementById('cancel-bg-blur')
let tags = document.getElementsByName("tags")[0]
let textForm = document.getElementsByName("text")[0]
let addTag = document.getElementById("add-tag-btn")
let tagsField = document.getElementById("field")
let selectTags = document.getElementById("id_tags")
let divAddTags = document.querySelector(".beforeBtton")
let imagesDiv = document.querySelector(".for-images")
let imageInput = document.querySelector('.image-input')
let dotsMenu = document.querySelectorAll(".dotsDiv")
let editBtns = document.querySelectorAll(".edit")
let deleteBtns = document.querySelectorAll(".delete")
let blurRedact = document.querySelector(".background-blur-redact")
let cancelBgBlurRedact = document.querySelector("#cancel-bg-blur-redact")


let listFiles = []

for (let count = 0; count < dotsMenu.length; count++) {
    dotsMenu[count].addEventListener("click", () => {
        console.log(count)
        if (dotsMenu[count].style.width == "175px") {
            dotsMenu[count].style.width = "30px"
            dotsMenu[count].style.height = "30px"
            editBtns[count].style.display = "none"
            deleteBtns[count].style.display = "none"
        } else {
            dotsMenu[count].style.width = "175px"
            dotsMenu[count].style.height = "75px"
            dotsMenu[count].style.backgroundColor = "white"
            editBtns[count].style.display = "flex"
            deleteBtns[count].style.display = "flex"
        }
    })
}


imageInput.addEventListener('change', function () {
    console.log(imageInput.files.length)

    for (let count = 0; count < imageInput.files.length; count++) {
        console.log(imageInput.files[count])
        let file = imageInput.files[count]
        let divImage = document.createElement("div")
        divImage.classList.add("divImageDelete")
        let createImage = document.createElement("img")
        let deleteBtn = document.createElement("img")
        deleteBtn.src = "/static/images/delete.png"
        deleteBtn.classList.add("deleteBtn")
        deleteBtn.id = "delete" + count
        divImage.id = count
        listFiles.push(imageInput.files[count])
        createImage.id = "imageForPost"
        if (file) {
            createImage.setAttribute('src', URL.createObjectURL(file));
            divImage.appendChild(createImage)
            divImage.appendChild(deleteBtn)
            imagesDiv.appendChild(divImage)
        }
    }


    let deleteBtnsArray = document.querySelectorAll(".deleteBtn")
    let allImages = document.querySelectorAll(".divImageDelete")

    deleteBtnsArray.forEach(element => {
        element.addEventListener("click", () => {
            document.getElementById(Number(element.id.split("delete")[1])).remove()
        })
    });
});

let allTags = selectTags.textContent.split("\n")
let finalAllTags = []

allTags.forEach((element) => {
    if (element != "") {
        finalAllTags.push(element.trim())
    }
})

console.log(finalAllTags)
if (buttonSend) {
    buttonSend.addEventListener('click', function () {
        if (input.value) {
            bgBlur.style.display = 'flex'
            let contentInput = bgBlur.querySelector('textarea')
            contentInput.textContent = input.value
        }
    })
}
cancelBgBlur.addEventListener('click', function () {
    bgBlur.style.display = 'none'
})

if (addTag) {
    addTag.addEventListener("click", () => {
        tagsField.style.display = tagsField.style.display === "block" ? "none" : "block";
        let hashtagsInnerHtml = document.getElementsByClassName("hashtag")
    })
}

selectTags.addEventListener("change", (event) => {
    divAddTags.textContent = ''
    selectTags.querySelectorAll('option').forEach((option) => {
        if (option.selected) {
            let hashTagElement = document.createElement("div")
            let hashTagText = document.createElement("p")
            hashTagElement.classList.add("hashTag")
            hashTagText.classList.add("hashTagText")
            hashTagText.textContent = finalAllTags[option.value - 1]
            hashTagElement.appendChild(hashTagText)
            divAddTags.appendChild(hashTagElement)
        }
    })
})

let likeButtons = document.querySelectorAll('.like-button')
likeButtons.forEach((button) => {
    button.addEventListener('click', function () {
        if (!button.classList.contains("liked")) {
            document.querySelector(`#like${button.id}`).src = "/static/images/liked.png"
        } else {
            document.querySelector(`#like${button.id}`).src = "/static/images/likes.png"
        }
        let likeCount = button.querySelector('b')
        let isLiked = button.classList.contains('liked')
        if (isLiked) {
            likeCount.textContent = parseInt(likeCount.textContent) - 1
            button.classList.remove('liked')
        } else {
            likeCount.textContent = parseInt(likeCount.textContent) + 1
            button.classList.add('liked')
        }
        console.log(button.getAttribute("value"))
        $.ajax({
            url: `${button.getAttribute("value")}`,
            type: 'POST',
            data: {
                'csrfmiddlewaretoken': document.querySelector('[name=csrfmiddlewaretoken]').value
            },
            success: function (response) {
                console.log(response)
            }
        })
    })
})

let likesImages = document.querySelectorAll(".likesImg")


deleteBtns.forEach((button) => {
    button.addEventListener("click", function () {
        let postObject = document.querySelector(`#post${button.id}`)
        console.log(`post${button.id}`)
        postObject.remove()
    })
})



editBtns.forEach(element => {
    element.addEventListener("click", () => {
        console.log("feadweg")
        blurRedact.style.display = "flex"
        $.ajax({
            url: `redact/${element.id}`,
            type: 'POST',
            data: {
                'pk': element.id
            },
            success: function (response) {
                console.log(response)
                response["post"]
            }
        })
    })
})

cancelBgBlurRedact.addEventListener('click', () => {
    blurRedact.style.display = 'none'
})
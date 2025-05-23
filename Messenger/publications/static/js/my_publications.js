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


imageInput.addEventListener('change', function () {
    let file = imageInput.files[0]
    let createImage = document.createElement("img")
    createImage.id = "imageForPost"
    if (file) {
        createImage.setAttribute('src', URL.createObjectURL(file));
        imagesDiv.appendChild(createImage)
    }

});

let allTags = selectTags.textContent.split("\n")
let finalAllTags = []

allTags.forEach((element) => {
    if (element != "") {
        finalAllTags.push(element.trim())
    }
})


console.log(finalAllTags)
buttonSend.addEventListener('click', function () {
    if (input.value) {
        bgBlur.style.display = 'flex'
        let contentInput = bgBlur.querySelector('textarea')
        contentInput.textContent = input.value
    }
})
cancelBgBlur.addEventListener('click', function () {
    bgBlur.style.display = 'none'
})


addTag.addEventListener("click", () => {
    tagsField.style.display = "block"

    let hashtagsInnerHtml = document.getElementsByClassName("hashtag")

})

selectTags.addEventListener("change", (event) => {
    tagsField.style.display = "none"

    let hashTagElement = document.createElement("p")
    hashTagElement.classList.add("hashTag")
    hashTagElement.textContent = finalAllTags[event.target.value - 1]
    divAddTags.appendChild(hashTagElement)

    console.log(selectTags.textContent)
})
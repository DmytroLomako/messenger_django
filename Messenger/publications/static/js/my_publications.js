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

if (imageInput){
    imageInput.addEventListener('change', function () {
        let file = imageInput.files[0]
        let createImage = document.createElement("img")
        createImage.id = "imageForPost"
        if (file) {
            createImage.setAttribute('src', URL.createObjectURL(file));
            imagesDiv.appendChild(createImage)
        }
    
    });
}

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

if (addTag){
    addTag.addEventListener("click", () => {
        tagsField.style.display = tagsField.style.display === "block" ? "none" : "block";
        let hashtagsInnerHtml = document.getElementsByClassName("hashtag")
    })
}

selectTags.addEventListener("change", (event) => {
    divAddTags.textContent = ''
    selectTags.querySelectorAll('option').forEach((option) => {
        if (option.selected) {
            let hashTagElement = document.createElement("p")
            hashTagElement.classList.add("hashTag")
            hashTagElement.textContent = finalAllTags[option.value - 1]
            divAddTags.appendChild(hashTagElement)
        }
    })
})

let likeButtons = document.querySelectorAll('.like-button')
likeButtons.forEach((button) => {
    button.addEventListener('click', function () {
        let likeCount = button.querySelector('b')
        let isLiked = button.classList.contains('liked')
        if (isLiked) {
            likeCount.textContent = parseInt(likeCount.textContent) - 1
            button.classList.remove('liked')
        } else {
            likeCount.textContent = parseInt(likeCount.textContent) + 1
            button.classList.add('liked')
        }
        console.log(button.id)
        $.ajax({
            url: `${button.id}`,
            type: 'POST',
            data: {
                'csrfmiddlewaretoken': document.querySelector('[name=csrfmiddlewaretoken]').value
            },
            success: function(response){
                console.log(response)
            }
        })
    })
})
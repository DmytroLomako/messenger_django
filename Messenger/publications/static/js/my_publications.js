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


let listFiles = []

for (let count = 0; count < dotsMenu.length; count++) {
    dotsMenu[count].addEventListener("click", () => {
        console.log(count)
        if (dotsMenu[count].style.width == "150px") {
            dotsMenu[count].style.width = "30px"
            dotsMenu[count].style.height = "30px"
            editBtns[count].style.display = "none"
            deleteBtns[count].style.display = "none"
        } else {
            dotsMenu[count].style.width = "150px"
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
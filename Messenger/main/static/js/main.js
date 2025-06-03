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
let divAddTagsRedact = document.querySelector(".beforeBttonRedact")
let imagesDiv = document.querySelector(".for-images")
let imageInput = document.querySelector('.image-input')
let imagesDivRedact = document.querySelector(".for-images-redact")
let imageInputRedact = document.querySelector('.image-input-redact')
let dotsMenu = document.querySelectorAll(".dotsDiv")
let editBtns = document.querySelectorAll(".edit")
let deleteBtns = document.querySelectorAll(".delete")
let blurRedact = document.querySelector(".background-blur-redact")
let cancelBgBlurRedact = document.querySelector("#cancel-bg-blur-redact")
let postPkInput = document.querySelector(".postPkInput")

let selectRedact = document.querySelectorAll("#tagsHiddenRedact select option")
let addTagBtnRedact = document.getElementById("add-tag-btn-redact")
let tagsHiddenRedact = document.getElementById("tagsHiddenRedact")
let tagsHiddenRedactSelect = document.getElementById("tagsHiddenRedact select")

let imagesPost = document.querySelector(".postImage1")

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
    imagesDiv.innerHTML = ''
    listFiles = []
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
            delete listFiles[Number(element.id.split("delete")[1])];
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
        console.log(":wgbemweorpim")
        tagsField.style.display = tagsField.style.display === "block" ? "none" : "block";
        let hashtagsInnerHtml = document.getElementsByClassName("hashtag")
    })
}

if (addTagBtnRedact) {
    addTagBtnRedact.addEventListener("click", () => {
        console.log(":wgbemweorpim")
        tagsHiddenRedact.style.display = tagsHiddenRedact.style.display === "block" ? "none" : "block";
        let hashtagsInnerHtml = document.getElementsByClassName("hashtag")
    })
}

selectTags.addEventListener("change", (event) => {
    console.log("l,kphwrm")
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
        imagesDiv.innerHTML = ''
        listFiles = []
        console.log(imagesPost)
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
        blurRedact.style.display = "flex"
        postPkInput.value = element.id
        $.ajax({
            url: `/publications/redact/${element.id}/`,
            type: 'POST',
            data: {
                'pk': element.id,
                'csrfmiddlewaretoken': document.querySelector('[name=csrfmiddlewaretoken]').value
            },
            success: function (response) {
                let post = JSON.parse(response)[0]["fields"]
                console.log(post)
                document.querySelector(".title").value = post["title"]
                document.querySelector(".subject").value = post["subject"]
                document.querySelector(".textField").textContent = post["text"]
                document.querySelector(".link").value = post["article_link"]

                let tagsFromPost = post["tags"]

                tagsFromPost.forEach(element => {
                    if (selectRedact[element - 1]) {
                        selectRedact[element - 1].selected = true;
                    }
                })

                let selectedTags = []
                selectRedact.forEach(element => {
                    if (element.selected == true) {
                        selectedTags.push(element)
                    }
                });

                let list_tags = []
                selectedTags.forEach(element => {
                    list_tags.push(element.value)
                });

                document.querySelector(".tags-list").value = `${list_tags}`

                selectRedact.forEach((option) => {
                    if (option.selected) {
                        let hashTagElement = document.createElement("div")
                        let hashTagText = document.createElement("p")
                        hashTagElement.classList.add("hashTag")
                        hashTagText.classList.add("hashTagText")
                        hashTagText.textContent = finalAllTags[option.value - 1]
                        hashTagElement.appendChild(hashTagText)
                        divAddTagsRedact.appendChild(hashTagElement)
                    }
                })


            }
        })
    })
})


tagsHiddenRedact.addEventListener("change", (event) => {
    console.log("l,kphwrm")
    divAddTagsRedact.textContent = ''
    let selectedTags = []
    selectRedact.forEach(element => {
        if (element.selected == true) {
            selectedTags.push(element)
        }
    });

    let list_tags = []
    selectedTags.forEach(element => {
        list_tags.push(element.value)
    });
    console.log(list_tags)
    document.querySelector(".tags-list").value = `${list_tags}`
    tagsHiddenRedact.querySelectorAll('option').forEach((option) => {
        if (option.selected) {
            let hashTagElement = document.createElement("div")
            let hashTagText = document.createElement("p")
            hashTagElement.classList.add("hashTag")
            hashTagText.classList.add("hashTagText")
            hashTagText.textContent = finalAllTags[option.value - 1]
            hashTagElement.appendChild(hashTagText)
            divAddTagsRedact.appendChild(hashTagElement)
        }

    })

})


cancelBgBlurRedact.addEventListener('click', () => {
    blurRedact.style.display = 'none'
})
let sendBtnModal = document.querySelector(".sendBtnModal")

sendBtnModal.addEventListener("click", function (event) {
    console.log(listFiles)
    const dataTransfer = new DataTransfer();
    listFiles.forEach((file) => {
        if (file) {
            dataTransfer.items.add(file)
        }
    });
    imageInput.files = dataTransfer.files;


})


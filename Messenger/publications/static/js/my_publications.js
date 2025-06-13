let buttonSend = document.querySelector('.submitJs')
let input = document.querySelector('.areaInput')
let bgBlur = document.querySelector('.background-blur')
let cancelBgBlur = document.getElementById('cancel-bg-blur')
let tags = document.getElementsByName("tags")[0]
let textForm = document.getElementsByName("text")[0]
let addTag = document.getElementById("add-tag-btn")
let tagsField = document.getElementById("field")
let selectTags = document.getElementById("id_tags")
let selectTagsAll = document.querySelector("#id_tags option")
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
let imageTags = document.querySelector(".imageTags")
let inputAddTag = document.querySelector(".inputAddTag")

let selectRedact = document.querySelectorAll("#tagsHiddenRedact select option")
let addTagBtnRedact = document.getElementById("add-tag-btn-redact")
let tagsHiddenRedact = document.getElementById("tagsHiddenRedact")
let tagsHiddenRedactSelect = document.getElementById("tagsHiddenRedact select")

let imagesPost = document.querySelector(".postImage1")

let formCratePost = document.querySelector(".publication-creation")

let listFiles = []
let listFilesRedact = []

let listTags = ["#Відпочинок", "#Натхнення", "#Життя", "#Природа", "#Читання", "#Спокій", "#Гармонія", "#Музика", "#Фільми", "#Подорожі"]

for (let count = 0; count < dotsMenu.length; count++) {
    dotsMenu[count].addEventListener("click", () => {
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

function updateDeleteButtons() {
    let deleteBtnsArray = document.querySelectorAll(".deleteBtn")
    deleteBtnsArray.forEach(element => {
        element.addEventListener("click", () => {
            console.log(Number(element.id.split("delete")[1]))
            console.log(listFilesRedact)
            delete listFilesRedact[Number(element.id.split("delete")[1])]
            console.log(listFilesRedact)
            delete listFiles[Number(element.id.split("delete")[1])];
            document.getElementById(Number(element.id.split("delete")[1])).remove()
        })
    });
}

function displayImage(input, div, filesList) {
    div.innerHTML = ''
    filesList.length = 0
    for (let count = 0; count < input.files.length; count++) {
        let file = input.files[count]
        let divImage = document.createElement("div")
        divImage.classList.add("divImageDelete")
        let createImage = document.createElement("img")
        let deleteBtn = document.createElement("img")
        deleteBtn.src = "/static/images/delete.png"
        deleteBtn.classList.add("deleteBtn")
        deleteBtn.id = "delete" + count
        divImage.id = count
        filesList.push(input.files[count])
        createImage.id = "imageForPost"
        if (file) {
            createImage.setAttribute('src', URL.createObjectURL(file));
            divImage.appendChild(createImage)
            divImage.appendChild(deleteBtn)
            div.appendChild(divImage)
        }
    }
    updateDeleteButtons();
}


imageInput.addEventListener('change', function () {
    displayImage(imageInput, imagesDiv, listFiles);
});

imageInputRedact.addEventListener('change', function () {
    displayImage(imageInputRedact, imagesDivRedact, listFilesRedact);
})

let allTags = selectTags.textContent.split("\n")
let finalAllTags = []

allTags.forEach((element) => {
    if (element != "") {
        finalAllTags.push(element.trim())
    }
})

if (buttonSend) {
    buttonSend.addEventListener('click', function () {
        if (input.value) {
            bgBlur.style.display = 'flex'
            let contentInput = bgBlur.querySelector('textarea')
            let allOptions = document.querySelectorAll(".showTagsBtn #field #id_tags option")
            contentInput.textContent = input.value

            document.querySelectorAll(".divAddTags .beforeBtton .hashTag").forEach(element => {
                element.addEventListener("click", () => {
                    if (!allOptions[parseInt(element.getAttribute("value")) - 1].getAttribute('selected')) {

                        allOptions[parseInt(element.getAttribute("value")) - 1].setAttribute('selected', true)
                        let pElement = document.createElement("p")
                        pElement.classList.add("hashTagText")
                        pElement.setAttribute("value", parseInt(element.getAttribute("value")) - 1)
                        pElement.textContent = element.querySelector(".hashTagText").textContent
                        textArea = document.querySelector(".input-div-text")
                        textArea.appendChild(pElement)
                    } else {
                        allOptions[parseInt(element.getAttribute("value")) - 1].removeAttribute('selected')

                        document.querySelectorAll(".input-div-text .hashTagText").forEach(element2 => {
                            console.log(element2.getAttribute("value"))
                            console.log(`125412t31t ${element.getAttribute("value") - 1}`)
                            if (element2.getAttribute("value") == element.getAttribute("value") - 1) {
                                element2.remove()
                            }
                        });
                    }
                })
            });

            // for (let count = 0; count <= 9; count++) {
            //     alloptions[count].setAttribute("selected", true)
            //     console.log(alloptions[count])
            // }
        }
    })
}
cancelBgBlur.addEventListener('click', function () {
    bgBlur.style.display = 'none'
})





if (addTag) {
    addTag.addEventListener("click", () => {

        inputAddTag.style.display = inputAddTag.style.display === "block" ? "none" : "block";
        console.log(imageTags.src)
        if (imageTags.src.split("/")[imageTags.src.split("/").length - 1] == `add_tag.png`) {
            imageTags.src = "/static/images/submit.png"
            inputAddTag.value = ""
        } else {
            if (!inputAddTag.value.includes("#")) {
                finalHashTag = `#${inputAddTag.value}`
            }
            if (finalHashTag != "#") {
                let hashTagElement = document.createElement("div")
                let hashTagText = document.createElement("p")
                hashTagElement.classList.add("hashTag")
                hashTagText.classList.add("hashTagText")

                let option = document.createElement("option")

                let allOptions = document.querySelectorAll(".showTagsBtn #field #id_tags option")

                let valueOption = parseInt(allOptions[allOptions.length - 1].value) + 1
                if (document.querySelectorAll("#field #id_tags option").length - 1 == 0) {
                    valueOption = 0
                }
                hashTagElement.setAttribute("value", valueOption)


                hashTagText.textContent = finalHashTag
                option.textContent = finalHashTag
                listTags.push(finalHashTag)


                option.value = valueOption


                selectTags.appendChild(option)



                hashTagElement.appendChild(hashTagText)
                divAddTags.appendChild(hashTagElement, imageTags)

                $.ajax({
                    url: document.querySelector(".urlToCreateTag").value,
                    type: 'POST',
                    data: {
                        'csrfmiddlewaretoken': document.querySelector('[name=csrfmiddlewaretoken]').value,
                        'list_tags': finalHashTag,
                        'page-to-return': "publications"
                    },
                    success: function (response) {
                        console.log(response)
                    }
                })
                allOptions = document.querySelectorAll(".showTagsBtn #field #id_tags option")
                document.querySelectorAll(".divAddTags .beforeBtton .hashTag").forEach(element => {
                    element.addEventListener("click", () => {
                        if (parseInt(element.value) <= 9) {
                            console.log(allOptions[parseInt(element.getAttribute("value")) - 1].getAttribute('selected'))
                            if (allOptions[parseInt(element.getAttribute("value")) - 1].getAttribute('selected')) {

                                allOptions[parseInt(element.getAttribute("value")) - 1].setAttribute('selected', true)
                                let pElement = document.createElement("p")
                                pElement.classList.add("hashTagText")
                                pElement.setAttribute("value", parseInt(element.getAttribute("value")) - 1)
                                pElement.textContent = element.querySelector(".hashTagText").textContent
                                textArea = document.querySelector(".input-div-text")
                                textArea.appendChild(pElement)
                            } else {
                                allOptions[parseInt(element.getAttribute("value")) - 1].removeAttribute('selected')
                                document.querySelectorAll(".input-div-text .hashTagText").forEach(element2 => {
                                    console.log(element2.getAttribute("value"))
                                    console.log(`125412t31t ${element.getAttribute("value") - 1}`)
                                    if (element2.getAttribute("value") == element.getAttribute("value") - 1) {
                                        element2.remove()
                                    }
                                });
                            }
                        } else {
                            console.log(!allOptions[parseInt(element.getAttribute("value")) - 1].getAttribute('selected'))
                            if (!allOptions[parseInt(element.getAttribute("value")) - 1].getAttribute('selected')) {

                                allOptions[parseInt(element.getAttribute("value")) - 1].setAttribute('selected', true)
                                let pElement = document.createElement("p")
                                pElement.classList.add("hashTagText")
                                pElement.setAttribute("value", parseInt(element.getAttribute("value")) - 1)
                                pElement.textContent = element.querySelector(".hashTagText").textContent
                                textArea = document.querySelector(".input-div-text")
                                textArea.appendChild(pElement)
                            } else {
                                allOptions[parseInt(element.getAttribute("value")) - 1].removeAttribute('selected')
                                document.querySelectorAll(".input-div-text .hashTagText").forEach(element2 => {
                                    console.log(element2.getAttribute("value"))
                                    console.log(`125412t31t ${element.getAttribute("value") - 1}`)
                                    if (element2.getAttribute("value") == element.getAttribute("value") - 1) {
                                        element2.remove()
                                    }
                                });
                            }
                        }
                    })
                });
            }
            imageTags.src = "/static/images/add_tag.png"



        }
    })
}



// if (addTag) {
//     addTag.addEventListener("click", () => {
//         tagsField.style.display = tagsField.style.display === "block" ? "none" : "block";
//         let hashtagsInnerHtml = document.getElementsByClassName("hashtag")
//     })
// }

// if (addTagBtnRedact) {
//     addTagBtnRedact.addEventListener("click", () => {
//         tagsHiddenRedact.style.display = tagsHiddenRedact.style.display === "block" ? "none" : "block";
//         let hashtagsInnerHtml = document.getElementsByClassName("hashtag")
//     })
// }

// selectTags.addEventListener("change", (event) => {
//     divAddTags.textContent = ''
//     selectTags.querySelectorAll('option').forEach((option) => {
//         if (option.selected) {
//             let hashTagElement = document.createElement("div")
//             let hashTagText = document.createElement("p")
//             hashTagElement.classList.add("hashTag")
//             hashTagText.classList.add("hashTagText")
//             hashTagText.textContent = finalAllTags[option.value - 1]
//             hashTagElement.appendChild(hashTagText)
//             divAddTags.insertBefore(hashTagElement, imageTags)
//         }
//     })
// })




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
        postObject.remove()
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



editBtns.forEach(element => {
    element.addEventListener("click", () => {
        imagesDiv.innerHTML = ''
        listFiles = []
        for (let count = 0; count < imageInput.files.length; count++) {
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
                console.log(JSON.parse(response))
                let post = JSON.parse(response)[0]["fields"]
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

                let images = JSON.parse(response).slice(1);
                listFiles = [];
                images.forEach((element, index) => {
                    const existingImageUrl = element.fields.image;
                    if (existingImageUrl) {
                        fetch(`/media/${existingImageUrl}`)
                            .then(response => response.blob())
                            .then(blob => {
                                const file = new File([blob], existingImageUrl.split('/').pop(), { type: blob.type });
                                listFilesRedact.push(file);
                            });
                        let divImage = document.createElement("div")
                        divImage.classList.add("divImageDelete")
                        let createImage = document.createElement("img")
                        let deleteBtn = document.createElement("img")
                        deleteBtn.src = "/static/images/delete.png"
                        deleteBtn.classList.add("deleteBtn")
                        deleteBtn.id = "delete" + index
                        divImage.id = index
                        createImage.id = "imageForPost"
                        createImage.src = `/media/${existingImageUrl}`;
                        divImage.appendChild(createImage)
                        divImage.appendChild(deleteBtn)
                        imagesDivRedact.appendChild(divImage)
                    }
                })
                updateDeleteButtons();

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

formCratePost.addEventListener("submit", function (event) {
    const dataTransfer = new DataTransfer();
    listFiles.forEach((file) => {
        if (file) {
            dataTransfer.items.add(file)
        }
    });
    imageInput.files = dataTransfer.files;
})
document.querySelector('.publication-redact').addEventListener('submit', (event) => {
    const dataTransferRedact = new DataTransfer();
    listFilesRedact.forEach((file) => {
        if (file) {
            dataTransferRedact.items.add(file)
        }
    });
    imageInputRedact.files = dataTransferRedact.files;
})

document.querySelectorAll(".liked img").forEach(element => {
    element.src = "/static/images/liked.png"
});


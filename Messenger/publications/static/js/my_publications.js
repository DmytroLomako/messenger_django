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
let tagsList = document.querySelector(".tags-list")


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
            delete listFilesRedact[Number(element.id.split("delete")[1])]
            delete listFiles[Number(element.id.split("delete")[1])];
            document.getElementById(Number(element.id.split("delete")[1])).remove()
        })
    });
}

function displayImage(input, div, filesList) {
    let len = filesList.length
    for (let count = 0; count < input.files.length; count++) {
        let file = input.files[count]
        let divImage = document.createElement("div")
        divImage.classList.add("divImageDelete")
        let createImage = document.createElement("img")
        let deleteBtn = document.createElement("img")
        deleteBtn.src = "/static/images/delete.png"
        deleteBtn.classList.add("deleteBtn")
        deleteBtn.id = "delete" + (count + len)
        divImage.id = (count + len)
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
    console.log(listFiles)
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
function isPostInViewport(post) {
    const rect = post.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= window.innerHeight
    );
}


document.querySelector(".PostPostInput").addEventListener("scroll", () => {
    document.querySelectorAll(".PostPostInput .post").forEach(post => {
        if (!post.dataset.viewed && isPostInViewport(post)) {
            post.dataset.viewed = 'true';
            $.ajax({
                url: `/publications/view_post/${post.getAttribute("value")}/`,
                type: 'POST',
                data: {
                    'csrfmiddlewaretoken': document.querySelector('[name=csrfmiddlewaretoken]').value
                },
                success: function (response) {
                    console.log(response)
                }
            });
        }
    });
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

                        let hashtagsConteiner = document.querySelector(".hashTagTextDiv")


                        if (hashtagsConteiner == null) {
                            let hashtagsConteinerElement = document.createElement("div")
                            hashtagsConteinerElement.classList.add("hashTagTextDiv")
                            document.querySelectorAll(".field")[1].appendChild(hashtagsConteinerElement)
                        }

                        hashtagsConteiner = document.querySelector(".hashTagTextDiv")

                        let pElement = document.createElement("p");
                        pElement.classList.add("hashTagText");
                        pElement.setAttribute("value", parseInt(element.getAttribute("value")) - 1);
                        pElement.textContent = element.querySelector(".hashTagText").textContent;

                        // const textArea = document.querySelector(".input-div-text") || document.querySelectorAll(".field")[1];
                        hashtagsConteiner.appendChild(pElement);
                    } else {
                        allOptions[parseInt(element.getAttribute("value")) - 1].removeAttribute('selected')

                        document.querySelectorAll(".field .hashTagText").forEach(element2 => {
                            console.log(element2.getAttribute("value"))
                            console.log(`125412t31t ${element.getAttribute("value") - 1}`)
                            if (element2.getAttribute("value") == element.getAttribute("value") - 1) {
                                element2.remove()
                            }
                        });
                    }
                })
            });
        }
    })
}
cancelBgBlur.addEventListener('click', function () {
    bgBlur.style.display = 'none'
})


if (addTag) {
    addTag.addEventListener("click", () => {
        inputAddTag.style.display = inputAddTag.style.display === "block" ? "none" : "block";

        if (imageTags.src.split("/")[imageTags.src.split("/").length - 1] == `add_tag.png`) {
            imageTags.src = "/static/images/submit.png"
            inputAddTag.value = ""
        } else {
            let finalHashTag = inputAddTag.value;
            if (!finalHashTag.includes("#")) {
                finalHashTag = `#${finalHashTag}`;
            }

            if (finalHashTag != "#") {

                let hashTagElement = document.createElement("div");
                let hashTagText = document.createElement("p");
                hashTagElement.classList.add("hashTag");
                hashTagText.classList.add("hashTagText");

                let option = document.createElement("option");
                let allOptions = document.querySelectorAll(".showTagsBtn #field #id_tags option");


                let valueOption = allOptions.length > 0 ?
                    parseInt(allOptions[allOptions.length - 1].value) + 1 : 0;

                hashTagElement.setAttribute("value", valueOption);
                hashTagText.textContent = finalHashTag;
                option.textContent = finalHashTag;
                option.value = valueOption;

                selectTags.appendChild(option);
                hashTagElement.appendChild(hashTagText);
                divAddTags.appendChild(hashTagElement, imageTags);


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
                });


                hashTagElement.addEventListener("click", function () {
                    const optionIndex = parseInt(this.getAttribute("value"));
                    const option = document.querySelector(`.showTagsBtn #field #id_tags option[value="${optionIndex}"]`);


                    if (!option.hasAttribute('selected')) {
                        option.setAttribute('selected', true);
                        let hashtagsConteiner = document.querySelector(".hashTagTextDiv")



                        if (hashtagsConteiner == null) {
                            let hashtagsConteinerElement = document.createElement("div")
                            hashtagsConteinerElement.classList.add("hashTagTextDiv")
                            document.querySelectorAll(".field")[4].appendChild(hashtagsConteinerElement)
                        }

                        hashtagsConteiner = document.querySelector(".hashTagTextDiv")

                        let pElement = document.createElement("p");
                        pElement.classList.add("hashTagText");
                        pElement.setAttribute("value", optionIndex);
                        pElement.textContent = this.querySelector(".hashTagText").textContent;

                        // const textArea = document.querySelector(".input-div-text") || document.querySelectorAll(".field")[1];
                        hashtagsConteiner.appendChild(pElement);
                    } else {
                        option.removeAttribute('selected');
                        const selector = optionIndex <= 9 ?
                            ".input-div-text .hashTagText" : ".field .hashTagText";

                        document.querySelectorAll(selector).forEach(element2 => {
                            if (parseInt(element2.getAttribute("value")) === optionIndex) {
                                element2.remove();
                            }
                        });
                    }
                });
            }
            imageTags.src = "/static/images/add_tag.png";
        }
    });
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
        imagesDivRedact.innerHTML = '';
        listFilesRedact = [];
        divAddTagsRedact.innerHTML = '';
        document.querySelector("#tagsHiddenRedact select").innerHTML = '';

        blurRedact.style.display = "flex";
        postPkInput.value = element.id;

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
                // document.querySelector(".subject").value = post["subject"]
                document.querySelector("#id_content").innerHTML = post["content"]
                // document.querySelector(".link").value = post["article_link"]

                document.querySelector(".publication-redact .title").value = post.title;
                document.querySelector(".publication-redact textarea[name='content']").value = post.content


                let tagsFromPost = post.tags || [];
                let allTagsOptions = document.querySelectorAll("#id_tags option");
                allTagsOptions.forEach(option => {
                    let newOption = option.cloneNode(true);
                    selectTagsRedact.appendChild(newOption);


                    if (tagsFromPost.includes(parseInt(option.value))) {
                        newOption.selected = true;
                        console.log(option.value)

                        tagsList.value += `${option.value}_`

                        let hashTagElement = document.createElement("div");
                        let hashTagText = document.createElement("p");
                        hashTagElement.classList.add("hashTag");
                        hashTagText.classList.add("hashTagText");
                        hashTagElement.setAttribute("value", option.value);
                        hashTagText.textContent = option.text;
                        hashTagElement.appendChild(hashTagText);
                        divAddTagsRedact.appendChild(hashTagElement);
                        hashTagElement.addEventListener("click", function () {
                            const optionIndex = parseInt(this.getAttribute("value"));
                            const option = document.querySelector(`#tagsHiddenRedact select option[value="${optionIndex}"]`);

                            if (!option.hasAttribute('selected')) {
                                option.setAttribute('selected', true);
                                let hashtagsConteiner = document.querySelector(".publication-redact .hashTagTextDiv");

                                if (!hashtagsConteiner) {
                                    hashtagsConteiner = document.createElement("div");
                                    hashtagsConteiner.classList.add("hashTagTextDiv");
                                    document.querySelector(".publication-redact .field").appendChild(hashtagsConteiner);
                                }

                                let pElement = document.createElement("p");
                                pElement.classList.add("hashTagText");
                                pElement.setAttribute("value", optionIndex);
                                pElement.textContent = this.querySelector(".hashTagText").textContent;
                                hashtagsConteiner.appendChild(pElement);
                            } else {
                                option.removeAttribute('selected');
                                document.querySelectorAll(".publication-redact .hashTagTextDiv .hashTagText").forEach(el => {
                                    if (parseInt(el.getAttribute("value")) === optionIndex) {
                                        el.remove();
                                    }
                                });
                            }
                        });
                    }
                });

                let list_tags = []
                selectedTags.forEach(element => {
                    list_tags.push(element.value)
                });

                document.querySelector(".tags-list").value = `${list_tags}`
                console.log(JSON.parse(response), JSON.parse(response).slice(1))
                let images = JSON.parse(response).slice(1);
                listFiles = [];
                listFilesRedact = [];

                const fetchPromises = images.map(async (element, index) => {
                    const existingImageUrl = element.fields.file;
                    if (existingImageUrl) {
                        const response = await fetch(`/media/${existingImageUrl}`);
                        const blob = await response.blob();
                        const file = new File([blob], existingImageUrl.split('/').pop(), { type: blob.type });
                        return { file, existingImageUrl, index };
                    }
                    return null;
                });

                Promise.all(fetchPromises).then(results => {
                    results.forEach(result => {
                        if (result) {
                            listFilesRedact.push(result.file);
                            let divImage = document.createElement("div")
                            divImage.classList.add("divImageDelete")
                            let createImage = document.createElement("img")
                            let deleteBtn = document.createElement("img")
                            deleteBtn.src = "/static/images/delete.png"
                            deleteBtn.classList.add("deleteBtn")
                            deleteBtn.id = "delete" + result.index
                            divImage.id = result.index
                            createImage.id = "imageForPost"
                            createImage.src = `/media/${result.existingImageUrl}`;
                            divImage.appendChild(createImage)
                            divImage.appendChild(deleteBtn)
                            imagesDivRedact.appendChild(divImage)
                        }
                    });
                    updateDeleteButtons();
                });

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
        });
    });
});



const addTagRedact = document.getElementById("add-tag-btn-redact");
const inputAddTagRedact = document.querySelector(".inputAddTagRedact");
const imageTagsRedact = document.querySelector(".imageTagsRedact");
const divAddTagsRedact = document.querySelector(".beforeBttonRedact");
const selectTagsRedact = document.querySelector("#tagsHiddenRedact select");
const optionTagsRedact = document.querySelectorAll("#tagsHiddenRedact select option");
if (addTagRedact) {
    addTagRedact.addEventListener("click", () => {

        const addTagRedact = document.getElementById("add-tag-btn-redact");
        const inputAddTagRedact = document.querySelector(".inputAddTagRedact");
        const imageTagsRedact = document.querySelector(".imageTagsRedact");
        const divAddTagsRedact = document.querySelector(".beforeBttonRedact");
        const selectTagsRedact = document.querySelector("#tagsHiddenRedact select");
        const optionTagsRedact = document.querySelectorAll("#tagsHiddenRedact select option");

        if (!inputAddTagRedact) {
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = "#";
            input.classList.add("inputAddTagRedact");
            divAddTagsRedact.appendChild(input);
            input.style.display = "block";
        } else {
            inputAddTagRedact.style.display = inputAddTagRedact.style.display === "block" ? "none" : "block";
        }

        if (imageTagsRedact.src.split("/").pop() === "add_tag.png") {
            imageTagsRedact.src = "/static/images/submit.png";
            if (inputAddTagRedact) inputAddTagRedact.value = "";
        } else {
            let finalHashTag = inputAddTagRedact.value;
            if (!finalHashTag.includes("#")) {
                finalHashTag = `#${finalHashTag}`;
            }

            if (finalHashTag !== "#") {
                let hashTagElement = document.createElement("div");
                let hashTagText = document.createElement("p");
                hashTagElement.classList.add("hashTag");
                hashTagText.classList.add("hashTagText");

                let option = document.createElement("option");
                let allOptions = document.querySelectorAll("#tagsHiddenRedact select option");

                let valueOption = allOptions.length > 0 ?
                    parseInt(allOptions[allOptions.length - 1].value) + 1 : 0;

                hashTagElement.setAttribute("value", valueOption);
                hashTagText.textContent = finalHashTag;
                option.textContent = finalHashTag;
                option.value = valueOption;

                selectTagsRedact.appendChild(option);
                hashTagElement.appendChild(hashTagText);

                divAddTagsRedact.appendChild(hashTagElement);

                $.ajax({
                    url: document.querySelector(".urlToCreateTag").value,
                    type: 'POST',
                    data: {
                        'csrfmiddlewaretoken': document.querySelector('[name=csrfmiddlewaretoken]').value,
                        'list_tags': finalHashTag,
                        'page-to-return': "publications"
                    },
                    success: function (response) {
                        console.log(response);
                    }
                });

                hashTagElement.addEventListener("click", function () {
                    const optionIndex = parseInt(this.getAttribute("value"));
                    const option = document.querySelector(`#tagsHiddenRedact select option[value="${optionIndex}"]`);

                    if (!option.hasAttribute('selected')) {
                        option.setAttribute('selected', true);
                        tagsList.value += `${option.value}_`
                        let hashtagsConteiner = document.querySelector(".publication-redact .hashTagTextDiv");

                        if (!hashtagsConteiner) {
                            let hashtagsConteinerElement = document.createElement("div");
                            hashtagsConteinerElement.classList.add("hashTagTextDiv");
                            document.querySelectorAll(".publication-redact .field")[1].appendChild(hashtagsConteinerElement);
                            hashtagsConteiner = hashtagsConteinerElement;
                        }

                        let pElement = document.createElement("p");
                        pElement.classList.add("hashTagText");
                        pElement.setAttribute("value", optionIndex);
                        pElement.textContent = this.querySelector(".hashTagText").textContent;

                        hashtagsConteiner.appendChild(pElement);
                    } else {
                        option.removeAttribute('selected');
                        document.querySelectorAll(".publication-redact .hashTagTextDiv .hashTagText").forEach(element2 => {
                            if (parseInt(element2.getAttribute("value")) === optionIndex) {
                                element2.remove();
                            }
                        });
                    }
                });
            }


            imageTagsRedact.src = "/static/images/add_tag.png";
            if (inputAddTagRedact) inputAddTagRedact.style.display = "none";
        }
    });
}



cancelBgBlurRedact.addEventListener('click', () => {
    blurRedact.style.display = 'none'
    listFilesRedact = []
    imagesDivRedact.innerHTML = ''
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
    console.log(imageInput.files.length)
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





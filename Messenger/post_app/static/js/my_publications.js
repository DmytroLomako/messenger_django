const buttonSend = document.querySelector('.submitJs');
const input = document.querySelector('.areaInput');
const bgBlur = document.querySelector('.background-blur');
const cancelBgBlur = document.getElementById('cancel-bg-blur');
const tags = document.getElementsByName("tags")[0];
const textForm = document.getElementsByName("text")[0];
const addTag = document.getElementById("add-tag-btn");
const tagsField = document.getElementById("field");
const selectTags = document.getElementById("id_tags");
const selectTagsAll = document.querySelector("#id_tags option");
const divAddTags = document.querySelector(".beforeBtton");
const imagesDiv = document.querySelector(".for-images");
const imageInput = document.querySelector('.image-input');
const imagesDivRedact = document.querySelector(".for-images-redact");
const imageInputRedact = document.querySelector('.image-input-redact');
const dotsMenu = document.querySelectorAll(".dotsDiv");
const editBtns = document.querySelectorAll(".edit");
const deleteBtns = document.querySelectorAll(".delete");
const blurRedact = document.querySelector(".background-blur-redact");
const cancelBgBlurRedact = document.querySelector("#cancel-bg-blur-redact");
const postPkInput = document.querySelector(".postPkInput");
const imageTags = document.querySelector(".imageTags");
const imageLinks = document.querySelector('.imageLinks');
const inputAddTag = document.querySelector(".inputAddTag");
const tagsList = document.querySelector(".tags-list");

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

function addLink(linkImg) {
    let linkDiv = linkImg.parentElement.parentElement;
    let clonedLinkDiv = linkDiv.cloneNode(true);
    if (clonedLinkDiv.querySelector('.label')) {
        clonedLinkDiv.querySelector('.label').remove()
    }
    if (clonedLinkDiv.querySelector('.cancelLink')) {
        clonedLinkDiv.querySelector('.cancelLink').remove()
    }
    console.log(clonedLinkDiv)
    clonedLinkDiv.querySelector('#id_links').value = ''
    clonedLinkDiv.querySelector('.imageLinks').addEventListener("click", () => addLink(clonedLinkDiv.querySelector('.imageLinks')))
    linkDiv.parentElement.insertBefore(clonedLinkDiv, linkDiv.nextSibling);
    let cancelLink = document.createElement('img')
    cancelLink.src = document.getElementById('cancelLinkInput').value
    cancelLink.classList.add('cancelLink')
    clonedLinkDiv.querySelector('.field').appendChild(cancelLink)
    cancelLink.addEventListener("click", () => deleteLink(cancelLink))
    linkDiv.querySelector('.imageLinks').remove()
}

function deleteLink(link) {
    let imageLinks = link.parentElement.querySelector('.imageLinks')
    let linkDiv = link.parentElement.parentElement
    if (imageLinks) {
        let prevLinkDiv = linkDiv.previousElementSibling
        if (prevLinkDiv.querySelector('.cancelLink')) {
            prevLinkDiv.querySelector('.field').insertBefore(imageLinks, prevLinkDiv.querySelector('.cancelLink'))
        } else {
            prevLinkDiv.querySelector('.field').appendChild(imageLinks)
        }
        imageLinks.addEventListener("click", () => addLink(imageLinks))
    }
    linkDiv.remove()
}

if (imageLinks) {
    imageLinks.addEventListener("click", () => addLink(imageLinks))
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
                            document.querySelectorAll(".field")[2].appendChild(hashtagsConteinerElement)
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
                            document.querySelectorAll(".field")[2].appendChild(hashtagsConteinerElement)
                        }

                        hashtagsConteiner = document.querySelector(".hashTagTextDiv")

                        let pElement = document.createElement("p");
                        pElement.classList.add("hashTagText");
                        pElement.setAttribute("value", optionIndex);
                        pElement.textContent = this.querySelector(".hashTagText").textContent;

                        // const textArea = document.querySelector(".input-div-text") || document.querySelectorAll(".field")[2];
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
        let postObject = document.querySelector("#post" + button.id);
        postObject.remove();

        $.ajax({
            url: button.getAttribute("value"),
            type: 'POST',
            data: {
                'csrfmiddlewaretoken': document.querySelector('[name=csrfmiddlewaretoken]').value
            },
            success: function (response) {
                console.log(response);
            }
        });
    });
});

editBtns.forEach((button) => {
    button.addEventListener("click", function () {
        imagesDivRedact.innerHTML = '';
        listFilesRedact = [];
        divAddTagsRedact.innerHTML = '';
        document.querySelector("#tagsHiddenRedact select").innerHTML = '';

        blurRedact.style.display = "flex";
        postPkInput.value = button.id;

        $.ajax({
            url: "/publications/redact/" + button.id + "/",
            type: 'POST',
            data: {
                'pk': button.id,
                'csrfmiddlewaretoken': document.querySelector('[name=csrfmiddlewaretoken]').value
            },
            success: function (response) {
                let data = JSON.parse(response.post);
                let links = JSON.parse(response.links);
                let post = data[0].fields;

                document.querySelector(".publication-redact .title").value = post.title;
                document.querySelector(".publication-redact textarea[name='content']").value = post.content;
                document.querySelector(".publication-redact #id_topic").value = post.topic;
                let tagsFromPost = post.tags || [];
                let tagsList = document.querySelector(".tags-list");
                tagsList.value = '';

                let linkElement = document.querySelector('.publication-redact #id_links');
                let linkDiv = linkElement.parentElement.parentElement;
                links.forEach((link, index) => {
                    let clonedLinkDiv = linkDiv.cloneNode(true)
                    clonedLinkDiv.querySelector("input").value = link.fields.url
                    if (index != 0) {
                        if (links.length - 1 == index) {
                            let imageLink = document.createElement('img')
                            imageLink.src = document.querySelector('.imageLinks').src
                            imageLink.classList.add('imageLinks')
                            imageLink.addEventListener("click", () => addLink(imageLink))
                            clonedLinkDiv.querySelector('.field').appendChild(imageLink)
                        }
                        let cancelLink = document.createElement('img')
                        cancelLink.src = document.getElementById('cancelLinkInput').value
                        cancelLink.classList.add('cancelLink')
                        cancelLink.addEventListener("click", () => deleteLink(cancelLink))
                        clonedLinkDiv.querySelector('.field').appendChild(cancelLink)
                    }
                    document.querySelector(".publication-redact").insertBefore(clonedLinkDiv, linkDiv)
                })
                linkDiv.remove();

                let hashtagsContainer = document.createElement("div");
                hashtagsContainer.classList.add("hashTagTextDiv");
                document.querySelectorAll(".publication-redact .field")[2].appendChild(hashtagsContainer);

                let select = document.querySelector("#tagsHiddenRedact select");

                $.ajax({
                    url: '/publications/get_all_tags/',
                    type: 'GET',
                    success: function (allTags) {
                        allTags.forEach(tag => {
                            let option = document.createElement("option");
                            option.value = tag.id;
                            option.textContent = tag.name;

                            if (tagsFromPost.includes(tag.id)) {
                                option.selected = true;
                                tagsList.value += tag.id + "_";

                                let tagDiv = document.createElement("div");
                                tagDiv.classList.add("hashTag");
                                tagDiv.setAttribute("value", tag.id);

                                let tagText = document.createElement("p");
                                tagText.classList.add("hashTagText");
                                tagText.textContent = tag.name;

                                tagDiv.appendChild(tagText);
                                divAddTagsRedact.appendChild(tagDiv);

                                let tagShow = document.createElement("p");
                                tagShow.classList.add("hashTagText");
                                tagShow.setAttribute("value", tag.id);
                                tagShow.textContent = tag.name;
                                hashtagsContainer.appendChild(tagShow);

                                tagDiv.addEventListener("click", function () {
                                    option.selected = !option.selected;
                                    if (option.selected) {
                                        tagsList.value += tag.id + "_";
                                        tagShow.style.display = "block";
                                    } else {
                                        tagsList.value = tagsList.value.replace(tag.id + "_", "");
                                        tagShow.style.display = "none";
                                    }
                                });
                            }

                            select.appendChild(option);
                        });
                    }
                });

                let images = data.slice(1);
                let fetchImages = images.map((imgData, index) => {
                    let imageUrl = imgData.fields.file;
                    return $.ajax({
                        url: "/media/" + imageUrl,
                        xhrFields: { responseType: 'blob' },
                        success: function (blob) {
                            let file = new File([blob], imageUrl.split("/").pop(), { type: blob.type });
                            listFilesRedact.push(file);

                            let divImage = document.createElement("div");
                            divImage.classList.add("divImageDelete");
                            divImage.id = index;

                            let img = document.createElement("img");
                            img.id = "imageForPost";
                            img.src = "/media/" + imageUrl;

                            let delBtn = document.createElement("img");
                            delBtn.src = "/static/images/delete.png";
                            delBtn.classList.add("deleteBtn");
                            delBtn.id = "delete" + index;

                            divImage.appendChild(img);
                            divImage.appendChild(delBtn);
                            imagesDivRedact.appendChild(divImage);
                        }
                    });
                });

                $.when.apply($, fetchImages).then(() => updateDeleteButtons());
            }
        });
    });
});

let countImagesPost = 0
let postsArray = document.querySelectorAll('.post')
postsArray.forEach(element => {
    let imagesPosts = document.querySelectorAll(`#post${element.getAttribute("value")} .postMain .images img`)
    imagesPosts.forEach(element => {
        if (countImagesPost < 3) {
            element.classList.add("postImage3")
        } else if (countImagesPost >= 2 && countImagesPost < 5) {
            element.classList.add("postImage1")
        } else if (countImagesPost >= 5 && countImagesPost < 8) {
            element.classList.add("postImage3")
        } else if (countImagesPost >= 8) {
            countImagesPost = 0
        }
        countImagesPost++
    })
    countImagesPost = 0
})


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
        // Создаем input для тегов, если его нет
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

                // Просто добавляем тег в контейнер (как в оригинальном коде)
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

cancelBgBlurRedact.addEventListener("click", function () {
    blurRedact.style.display = "none";
    listFilesRedact = [];
    imagesDivRedact.innerHTML = '';
});

formCratePost.addEventListener("submit", function () {
    let dt = new DataTransfer();
    listFiles.forEach(f => dt.items.add(f));
    imageInput.files = dt.files;
});

document.querySelector(".publication-redact").addEventListener("submit", function () {
    let dt = new DataTransfer();
    listFilesRedact.forEach(f => dt.items.add(f));
    imageInputRedact.files = dt.files;
});

document.querySelectorAll(".liked img").forEach(img => {
    img.src = "/static/images/liked.png";
});

if (document.querySelector(".friends-tracker").textContent == "0") {
    document.querySelector(".friends-tracker").style.display = "none";
}

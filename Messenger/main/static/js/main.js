// Получаем все необходимые элементы DOM
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
const divAddTagsRedact = document.querySelector(".beforeBttonRedact");
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
const inputAddTag = document.querySelector(".inputAddTag");
const selectRedact = document.querySelectorAll("#tagsHiddenRedact select option");
const addTagBtnRedact = document.getElementById("add-tag-btn-redact");
const tagsHiddenRedact = document.getElementById("tagsHiddenRedact");
const tagsHiddenRedactSelect = document.getElementById("tagsHiddenRedact select");
const imagesPost = document.querySelector(".postImage1");
const formCratePost = document.querySelector(".publication-creation");

let listFiles = [];
let listFilesRedact = [];
let listTags = ["#Відпочинок", "#Натхнення", "#Життя", "#Природа", "#Читання", "#Спокій", "#Гармонія", "#Музика", "#Фільми", "#Подорожі"];

// Обработчики для меню с троеточием
for (let count = 0; count < dotsMenu.length; count++) {
    dotsMenu[count].addEventListener("click", () => {
        if (dotsMenu[count].style.width == "175px") {
            dotsMenu[count].style.width = "30px";
            dotsMenu[count].style.height = "30px";
            editBtns[count].style.display = "none";
            deleteBtns[count].style.display = "none";
        } else {
            dotsMenu[count].style.width = "175px";
            dotsMenu[count].style.height = "75px";
            dotsMenu[count].style.backgroundColor = "white";
            editBtns[count].style.display = "flex";
            deleteBtns[count].style.display = "flex";
        }
    });
}

// Обработчик загрузки изображений
if (imageInput) {
    imageInput.addEventListener('change', function () {
        imagesDiv.innerHTML = '';
        listFiles = [];
        for (let count = 0; count < imageInput.files.length; count++) {
            let file = imageInput.files[count];
            let divImage = document.createElement("div");
            divImage.classList.add("divImageDelete");
            let createImage = document.createElement("img");
            let deleteBtn = document.createElement("img");
            deleteBtn.src = "/static/images/delete.png";
            deleteBtn.classList.add("deleteBtn");
            deleteBtn.id = "delete" + count;
            divImage.id = count;
            listFiles.push(imageInput.files[count]);
            createImage.id = "imageForPost";
            if (file) {
                createImage.setAttribute('src', URL.createObjectURL(file));
                divImage.appendChild(createImage);
                divImage.appendChild(deleteBtn);
                imagesDiv.appendChild(divImage);
            }
        }

        let deleteBtnsArray = document.querySelectorAll(".deleteBtn");
        deleteBtnsArray.forEach(element => {
            element.addEventListener("click", () => {
                delete listFiles[Number(element.id.split("delete")[1])];
                document.getElementById(Number(element.id.split("delete")[1])).remove();
            });
        });
    });
}

// Работа с тегами
let allTags = [];
if (selectTags) {
    allTags = selectTags.textContent.split("\n");
}
let finalAllTags = [];
allTags.forEach((element) => {
    if (element != "") {
        finalAllTags.push(element.trim());
    }
});

// Обработчик кнопки отправки
if (buttonSend) {
    buttonSend.addEventListener('click', function () {
        if (input.value) {
            bgBlur.style.display = 'flex';
            let contentInput = bgBlur.querySelector('textarea');
            let allOptions = document.querySelectorAll(".showTagsBtn #field #id_tags option");
            contentInput.textContent = input.value;

            document.querySelectorAll(".divAddTags .beforeBtton .hashTag").forEach(element => {
                element.addEventListener("click", () => {
                    if (!allOptions[parseInt(element.getAttribute("value")) - 1].getAttribute('selected')) {
                        allOptions[parseInt(element.getAttribute("value")) - 1].setAttribute('selected', true);
                        let pElement = document.createElement("p");
                        pElement.classList.add("hashTagText");
                        pElement.textContent = element.querySelector(".hashTagText").textContent;
                        let textArea = document.querySelector(".input-div-text");
                        textArea.appendChild(pElement);
                    }
                });
            });
        }
    });
}

// Обработчик закрытия модального окна
cancelBgBlur.addEventListener('click', function () {
    bgBlur.style.display = 'none';
});

// Обработчик добавления тега
if (addTag) {
    addTag.addEventListener("click", () => {
        inputAddTag.style.display = inputAddTag.style.display === "block" ? "none" : "block";
        if (imageTags.src.split("/")[imageTags.src.split("/").length - 1] == 'add_tag.png') {
            imageTags.src = "/static/images/submit.png";
            inputAddTag.value = "";
        } else {
            let finalHashTag = inputAddTag.value;
            if (!inputAddTag.value.includes("#")) {
                finalHashTag = `#${inputAddTag.value}`;
            }
            if (finalHashTag != "#") {
                let hashTagElement = document.createElement("div");
                let hashTagText = document.createElement("p");
                hashTagElement.classList.add("hashTag");
                hashTagText.classList.add("hashTagText");

                let option = document.createElement("option");
                let allOptions = document.querySelectorAll(".showTagsBtn #field #id_tags option");
                let valueOption = parseInt(allOptions[allOptions.length - 1].value) + 1;
                if (document.querySelectorAll("#field #id_tags option").length - 1 == 0) {
                    valueOption = 0;
                }
                hashTagElement.setAttribute("value", valueOption);
                hashTagText.textContent = finalHashTag;
                option.textContent = finalHashTag;
                listTags.push(finalHashTag);
                option.value = valueOption;
                selectTags.appendChild(option);
                hashTagElement.appendChild(hashTagText);
                divAddTags.appendChild(hashTagElement);

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

                allOptions = document.querySelectorAll(".showTagsBtn #field #id_tags option");
                document.querySelectorAll(".divAddTags .beforeBtton .hashTag").forEach(element => {
                    element.addEventListener("click", () => {
                        if (!allOptions[parseInt(element.getAttribute("value")) - 1].getAttribute('selected')) {
                            allOptions[parseInt(element.getAttribute("value")) - 1].setAttribute('selected', true);
                            let pElement = document.createElement("p");
                            pElement.classList.add("hashTagText");
                            pElement.textContent = element.querySelector(".hashTagText").textContent;
                            let textArea = document.querySelector(".input-div-text");
                            textArea.appendChild(pElement);
                        }
                    });
                });
            }
            imageTags.src = "/static/images/add_tag.png";
        }
    });
}

// Остальные обработчики...
// [Здесь должны быть остальные обработчики событий, которые были в оригинальном коде]
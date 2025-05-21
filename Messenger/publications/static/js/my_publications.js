let buttonSend = document.querySelector('.submit')
let input = document.querySelector('.areaInput')
let bgBlur = document.querySelector('.background-blur')
let cancelBgBlur = document.getElementById('cancel-bg-blur')
let tags = document.getElementsByName("tags")[0]
let textForm = document.getElementsByName("text")[0]
let addTag = document.getElementById("add-tag-btn")
let tagsField = document.getElementById("field")


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
})
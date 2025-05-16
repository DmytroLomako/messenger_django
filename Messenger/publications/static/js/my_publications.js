let buttonSend = document.querySelector('.sendBtn')
let input = document.querySelector('.areaInput')
let bgBlur = document.querySelector('.background-blur')
let cancelBgBlur = document.getElementById('cancel-bg-blur')
buttonSend.addEventListener('click', function() {
    if (input.value) {
        bgBlur.style.display = 'flex'
        let contentInput = bgBlur.querySelector('textarea')
        contentInput.textContent = input.value
    }
})
cancelBgBlur.addEventListener('click', function() {
    bgBlur.style.display = 'none'
})
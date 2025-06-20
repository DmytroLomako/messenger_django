let choosedNum = document.querySelector('.choosed-num')
let addedCheckboxes = document.querySelectorAll(".addedCheckbox")

function updateCheckbox() {
    let count = 0
    addedCheckboxes = document.querySelectorAll(".addedCheckbox")
    addedCheckboxes.forEach(element => {
        if (element.checked) {
            count++
        }
    })
    choosedNum.textContent = `Вибрано: ${count}`
}
updateCheckbox();

addedCheckboxes.forEach(element => {
    element.addEventListener("change", updateCheckbox)
})

let inputFind = document.querySelector(".input_find")
let groupMembersDiv = document.querySelector(".group-members")
inputFind.addEventListener("input", () => {
    let allProfiles = document.querySelectorAll(".userChoose")
    allProfiles.forEach(element => {
        if (element.querySelector(".nameLastName").textContent.toLowerCase().includes(inputFind.value.toLowerCase())) {
            element.style.display = "flex"
        } else {
            element.style.display = "none"
        }
    })
})

nextBtn.addEventListener('click', function() {
    addedCheckboxes.forEach(element => {
        if (element.checked) {
            let userChosen = document.createElement('div');
            userChosen.classList.add('userChosen')
            let userImg = document.createElement('img')
            userImg.classList.add('avatar')
            userImg.src = element.parentElement.querySelector('.avatar').src
            let userName = document.createElement('p')
            userName.classList.add('nameLastNameChosen')
            userName.textContent = element.parentElement.querySelector('.nameLastName').textContent
            userChosen.appendChild(userImg)
            userChosen.appendChild(userName)
            groupMembersDiv.appendChild(userChosen)
            let deleteMemberButtonDiv = document.createElement('div')
            deleteMemberButtonDiv.classList.add('deleteMemberButtonDiv')
            let deleteMemberButton = document.createElement('img')
            deleteMemberButton.classList.add('deleteMemberButton')
            deleteMemberButton.src = '/static/images/deletePost.png'
            deleteMemberButtonDiv.appendChild(deleteMemberButton)
            userChosen.appendChild(deleteMemberButtonDiv)
            
            deleteMemberButton.addEventListener('click', function() {
                userChosen.remove()
                element.checked = false
            })
        }
    })
    
})
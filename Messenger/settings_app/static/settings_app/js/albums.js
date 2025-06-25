let createAlbumButton = document.querySelector('.create-album-button')
let cover = document.querySelector('.cover')
let cancel = document.querySelector('.cancel-button')
let cross = document.querySelector('.cross-button')

createAlbumButton.addEventListener('click', () => {
    cover.style.display = 'flex'
    document.body.style.overflow = 'hidden'
})

function removeCover() {
    cover.style.display = 'none'
    document.body.style.overflow = 'auto'
    if (cover.querySelector('.edit-input')) {
        cover.querySelector('.edit-input').remove()
    }
}
cancel.addEventListener('click', removeCover)
cross.addEventListener('click', removeCover)

let albumImagesInputs = document.querySelectorAll('.album-images-input')
let addAlbumImages = document.querySelectorAll('.add-album-image')
addAlbumImages.forEach((element) => {
    element.addEventListener('click', () => {
        element.parentElement.parentElement.querySelector('.album-images-input').click()
    })
})

albumImagesInputs.forEach((element) => {
    element.addEventListener('change', function () {
        let albumImagesDiv = element.parentElement.querySelector('.album-images')
        for (let count = 0; count < element.files.length; count++) {
            let file = element.files[count]
            let divImage = document.createElement("div")
            let deleteBtn = document.createElement("img")
            deleteBtn.src = "/static/images/delete.png"
            deleteBtn.classList.add("deleteBtn")
            divImage.classList.add("divImageDelete")
            let createImage = document.createElement("img")
            divImage.id = count
            createImage.id = "imageForPost"
            if (file) {
                createImage.setAttribute('src', URL.createObjectURL(file));
                divImage.appendChild(createImage)
                divImage.appendChild(deleteBtn)
                albumImagesDiv.insertBefore(divImage, element.parentElement.querySelector('.add-album-image'))
            }
        }
        const formData = new FormData();
        formData.append('csrfmiddlewaretoken', document.querySelector('[name=csrfmiddlewaretoken]').value);
        for (let i = 0; i < element.files.length; i++) {
            formData.append('album_images', element.files[i]);
        }
        $.ajax({
            url: element.getAttribute('url'),
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                location.reload();
            }
        })
    })
})

function updateDeleteButtons() {
    deleteBtns = document.querySelectorAll('.deleteBtn')
    deleteBtns.forEach((element) => {
        element.addEventListener('click', () => {
            $.ajax({
                url: element.getAttribute('url'),
                type: 'POST',
                data: {
                    'csrfmiddlewaretoken': document.querySelector('[name=csrfmiddlewaretoken]').value
                },
                success: function (response) {
                    console.log(response)
                }
            })
            element.parentElement.remove()
        })
    })
}
updateDeleteButtons()

let actions = document.querySelectorAll('.actions');
let albumActions = document.querySelectorAll('.album-actions');
actions.forEach((element, index) => {
    element.addEventListener('click', () => {
        if (albumActions[index].style.display == 'flex') {
            albumActions[index].style.display = 'none'
        } else {
            albumActions[index].style.display = 'flex'
        }
    })
})

const countRequestsFriends = document.querySelector(".friends-tracker");

if (countRequestsFriends.textContent == 0) {
    countRequestsFriends.style.display = "none"
} else {
    countRequestsFriends.style.display = "flex"
}


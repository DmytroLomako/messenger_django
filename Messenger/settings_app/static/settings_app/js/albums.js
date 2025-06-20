let createAlbumButton = document.querySelector('.create-album-button')
let cover = document.querySelector('.cover')
let cancel = document.querySelector('.cancel-button')
let cross = document.querySelector('.cross-button')
<<<<<<< HEAD

createAlbumButton.addEventListener('click', () => {
    cover.style.display = 'flex'
    document.body.style.overflow = 'hidden'
})

=======
const countRequestsFriends = document.querySelector(".count-requests-friends");
const requestFriendsDiv = document.querySelector(".requests-friends")

if (createAlbumButton) {
    createAlbumButton.addEventListener('click', () => {
        cover.style.display = 'flex'
        document.body.style.overflow = 'hidden'
    })
}
>>>>>>> origin/mbarilo
function removeCover() {
    cover.style.display = 'none'
    document.body.style.overflow = 'auto'
    if (cover.querySelector('.edit-input')){
        cover.querySelector('.edit-input').remove()
    }
}
cancel.addEventListener('click', removeCover)
cross.addEventListener('click', removeCover)

<<<<<<< HEAD
let albumImagesInputs = document.querySelectorAll('.album-images-input')
let addAlbumImages = document.querySelectorAll('.add-album-image')
addAlbumImages.forEach((element) => {
    element.addEventListener('click', () => {
        element.parentElement.parentElement.querySelector('.album-images-input').click()
    })
})

albumImagesInputs.forEach((element) => {
    element.addEventListener('change', function() {
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
=======
let albumImagesInput = document.querySelector('.album-images-input')
let addAlbumImage = document.querySelector('.add-album-image')
addAlbumImage.addEventListener('click', () => {
    albumImagesInput.click()
})
albumImagesInput.addEventListener('change', function() {
    let albumImagesDiv = document.querySelector('.album-images')
    for (let count = 0; count < albumImagesInput.files.length; count++) {
        let file = albumImagesInput.files[count]
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
            albumImagesDiv.insertBefore(divImage, addAlbumImage)
        }
    }
    const formData = new FormData();
    formData.append('csrfmiddlewaretoken', document.querySelector('[name=csrfmiddlewaretoken]').value);
    for (let i = 0; i < albumImagesInput.files.length; i++) {
        formData.append('album_images', albumImagesInput.files[i]);
    }
    $.ajax({
        url: albumImagesInput.getAttribute('url'),
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            location.reload();
        }
>>>>>>> origin/mbarilo
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

<<<<<<< HEAD
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
=======
let actions = document.querySelector('.actions');
let albumActions = document.querySelector('.album-actions');
actions.addEventListener('click', () => {
    if (albumActions.style.display == 'flex') {
        albumActions.style.display = 'none'
    } else {
        albumActions.style.display = 'flex'
    }
})

if (countRequestsFriends.textContent == 0) {
    requestFriendsDiv.style.display = "none"
} else {
    requestFriendsDiv.style.display = "flex"
}
>>>>>>> origin/mbarilo

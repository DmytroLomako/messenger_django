let createAlbumButton = document.querySelector('.create-album-button')
let cover = document.querySelector('.cover')
let cancel = document.querySelector('.cancel-button')
let cross = document.querySelector('.cross-button')

if (createAlbumButton) {
    createAlbumButton.addEventListener('click', () => {
        cover.style.display = 'flex'
        body.style.overflow = 'hidden'
    })
}
function removeCover() {
    cover.style.display = 'none'
    body.style.overflow = 'auto'
}
cancel.addEventListener('click', removeCover)
cross.addEventListener('click', removeCover)

let albumImagesInput = document.querySelector('.album-images-input')
let addAlbumImage = document.querySelector('.add-album-image')
addAlbumImage.addEventListener('click', () => {
    albumImagesInput.click()
})
albumImagesInput.addEventListener('change', () => {
    let albumImagesDiv = document.querySelector('.album-images')
    for (let count = 0; count < albumImagesInput.files.length; count++) {
        let file = albumImagesInput.files[count]
        let divImage = document.createElement("div")
        divImage.classList.add("divImageDelete")
        let createImage = document.createElement("img")
        divImage.id = count
        createImage.id = "imageForPost"
        if (file) {
            createImage.setAttribute('src', URL.createObjectURL(file));
            divImage.appendChild(createImage)
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
            console.log(response)
        }
    })
})
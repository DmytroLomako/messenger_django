let addButtons = document.querySelectorAll('.add-button');
let requestsFriendsDiv = document.querySelector('.requests-friends-div');
addButtons.forEach(function (addButton) {
    addButton.addEventListener('click', function () {
        $.ajax({
            url: `${addButton.getAttribute("value")}`,
            type: 'POST',
            data: {
                'csrfmiddlewaretoken': document.querySelector('[name=csrfmiddlewaretoken]').value
            },
            success: function (response) {
                addButton.parentElement.parentElement.remove()
            }
        })
    });
});

let acceptButtons = document.querySelectorAll('.accept-button');
let allFriendsDiv = document.querySelector('.all-friends-div');
acceptButtons.forEach(function (acceptButton) {
    acceptButton.addEventListener('click', function () {
        console.log(1)
        $.ajax({
            url: `${acceptButton.getAttribute("value")}`,
            type: 'POST',
            data: {
                'csrfmiddlewaretoken': document.querySelector('[name=csrfmiddlewaretoken]').value
            },
            success: function (response) {
                console.log(allFriendsDiv, allFriendsDiv.querySelectorAll('.friend-profile'), allFriendsDiv.querySelectorAll('.friend-profile') < 6)
                if (allFriendsDiv && allFriendsDiv.querySelectorAll('.friend-profile').length < 6) {
                    allFriendsDiv.appendChild(acceptButton.parentElement.parentElement)
                } else {
                    acceptButton.parentElement.parentElement.remove()
                }
            }
        })
    });
});

let deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach(function (deleteButton) {
    deleteButton.addEventListener('click', function () {
        $.ajax({
            url: `${deleteButton.getAttribute("value")}`,
            type: 'POST',
            data: {
                'csrfmiddlewaretoken': document.querySelector('[name=csrfmiddlewaretoken]').value
            },
            success: function (response) {
                if (allFriendsDiv && allFriendsDiv.querySelectorAll('.friend-profile') < 6) {
                    deleteButton.appendChild(deleteButton.parentElement.parentElement)
                } else {
                    deleteButton.parentElement.parentElement.remove()
                }
            }
        })
    });
});

const MessegeBtn = document.querySelectorAll(".message-button")

MessegeBtn.forEach(element => {
    element.addEventListener("click", () => {
        window.location.href = `/chats/create_chat/${element.id}/`
    })
});
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



let AvatarNicknameDiv = document.querySelectorAll(".avatar-nickname-div")

AvatarNicknameDiv.forEach(element => {
    element.addEventListener("click", () => {
        window.location.href = `/friends/friend_view/${element.getAttribute("id")}`
    })
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
                'csrfmiddlewaretoken': document.querySelector('[name=csrfmiddlewaretoken]').value,
                "friendship_id": document.querySelector(".friendship_id").getAttribute("id")
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


let deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach(function (deleteButton) {
    deleteButton.addEventListener('click', function () {
        $.ajax({
            url: `delete_friend/${deleteButton.getAttribute("value")}`,
            type: 'POST',
            data: {
                'csrfmiddlewaretoken': document.querySelector('[name=csrfmiddlewaretoken]').value
            },
            success: function (response) {
                if (allFriendsDiv && allFriendsDiv.querySelectorAll('.friend-profile') < 6) {
                    deleteButton.appendChild(deleteButton.parentElement.parentElement)
                    document.querySelector(".recommendations-friends-div").innerHTML += `<div class="friend-profile" href="{% url 'friend_view' friend.id %}">
                        <div class="avatar-nickname-div" id="{{friend.profile2.id}}">
                            {% if friend.profile2.avatar_set.last.image != None %}
                            <img class="avatar-images" src="{{ friend.profile2.avatar_set.last.image.url }}" alt="">
                            {% else %}
                            <img class="avatar-images" src="{% static 'images/standart_user_image.png' %}" alt="">
                            {% endif %}
                            <div class="nickname-name">
                                <p class="nickname-text">{{ friend.profile2.user.first_name }}
                                    {{friend.profile2.user.last_name }}</p>
                                <p>@{{ friend.profile2.user.username }}</p>
                            </div>
                        </div>
                        <div class="buttons-div-recommendations">
                            <button class="add-button" name="add"
                                value="{% url 'request_friend' friend.id %}">Додати</button>
                            <button class="delete-button" name="delete" value="{{friend.profile2.id}}">Видалити</button>
                        </div>
                    </div>`
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
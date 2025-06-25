# Messenger project

<details>
<summary>
English version
</summary>
<p></p>
QR-code generator app is an app for generating QR codes with the ability to create both standard and desktop codes. It supports customization: changing colors, shapes, and the option to add a logo to the QR code. A convenient tool for creating unique QR codes for various purposes.

---
### Information
- [Installation and Setup](#installation-and-setup)
- [Contributors](#contributors)
- [Structure of the project and applications](#project-structure)
- [Technologies We Used](#technologies-we-used)
- [QR Codes](#qr-codes)
- [Conclusion](#conclusion)
---

# Installation and Setup

1. Get the repository link

    ![](messenger/media/readme/clone.png)

2. Clone the repository
```sh
git clone https://github.com/dimachep1408/QR-code_generator_app.git
```

3. Navigate to the project directory
```sh
cd QR-code_generator_app
```

<details>
<summary>
Windows
</summary>
<p></p>

1. Create a virtual environment
```sh
python -m venv venv
```

1. Activate the virtual environment
```sh
.\venv\Scripts\activate
```

1. Install dependencies from the requirements.txt file
```sh
pip install -r requirements.txt
```

1. Run the project
```sh
python manage.py runserver
```
</details>

<details>
<summary>
MacOS
</summary>
<p></p>

1. Create a virtual environment
```sh
python3 -m venv venv
```

1. Activate the virtual environment
```sh
source venv/bin/activate
```

1. Install dependencies from the requirements.txt file
```sh
pip3 install -r requirements.txt
```

1. Run the project
```sh
python3 manage.py runserver
```
</details>
<p></p>

# Contributors
1. [Dmytro Chepikov](https://github.com/dimachep1408)
2. [Dmytro Lomako](https://github.com/DmytroLomako)
3. [Misha Barylo](https://github.com/Mbarilo)
4. [Feliks Denga](https://github.com/Feliks2010)

---

# Project structure

![](media/readme/diagram.png)

# Application structure

![](media/readme/diagram2.png)

---

# Technologies We Used

* Django – framework for backend and request processing.
* qrcode – generation and customization of QR codes.
* Pillow – working with images, saving QR codes.
* os – file system management, saving images.
* datetime – storing the creation time of the QR code.

---

# QR Codes

#### When generating a QR code, you can customize the following parameters:

* Data – link.
* Color – you can change the background and foreground colors.
* Logo – you can insert an image in the center of the QR code (e.g., a company logo).
* Dots form – shape of the QR code dots.
* Eye form – shape of the "eyes" (large squares in the corners of the QR code).

#### Desktop Subscription
For convenience, a desktop version of the service with a subscription can be implemented, allowing the creation of special "desktop" QR codes that can store text, contact information, and more.

---

# Conclusion

While working on the QR-Code Generator App, our team gained valuable experience in developing web applications with Django. We deepened our understanding of the framework’s structure, route configuration, form handling, and integration with external libraries for generating and customizing QR codes.

One of the main challenges was implementing flexible design settings for QR codes—changing colors, shapes, and adding logos. This allowed us to better understand working with graphic formats and image optimization.

Overall, the QR-Code Generator App became a great practical project for us, helping not only to reinforce our knowledge of Django but also to explore new approaches to working with graphics, integrating custom features, and improving the user experience.

---
</details>
<p></p>


World-it messenger - це проект соціальна мережа, в якому можна настраювати аккаунт, створювати пости, альбоми, переписуватись та створювати группові чати

---
### Інформація
- [Інсталяція та налаштування](#інсталяція-та-налаштування)
<!-- toc-disable -->
- [Учасники проекту](#учасники-проекту)
<!-- toc-disable -->
- [Структура проекту та додатків](#структура-проекту)
<!-- toc-disable -->
- [Технології які ми використовували](#технології-які-ми-використовували)
<!-- toc-disable -->
- [QR-коди](#qr-коди)
<!-- toc-disable -->
- [За що відповідає кожен додаток](#за-що-відповідає-кожен-додаток)
<!-- toc-disable -->
- [Висновок](#висновок)
<!-- toc-disable -->
- [Проблематика](#проблематика)
<!-- toc-disable -->
- [Перспективи розвитку проекту](#перспективи-розвитку-проекту)
<!-- toc-disable -->
---

## Посилання на дизайн у Figma https://www.figma.com/design/bf3kkFSzNPwspbII8GaT3M/Untitled?node-id=0-1&node-type=canvas&t=ARWbS6jiX0W94etK-0

# Інсталяція та налаштування
*Щоб інсталювати та спробувати запустити проект вам будуть потрібні встановлені:
- python 3.8.10 або вище (Перевірити вашу версію пайтону можна ввів команду в термінал <br>python --version)
- git 2.45.1 або вище (Перевірити вашу версію гіту можна ввів команду в термінал git --version)

## Алгоритм дій
1. Отримання посилання на репозиторій

    ![](messenger/media/readme/clone.png)

2. Клонування репозиторію
```sh
git clone https://github.com/dimachep1408/messenger_django.git
``` 

3. Перехід до директорії проекту
```sh
cd messenger_django
```

<details>
<summary>
Windows
</summary>
<p></p>

4. Створення віртуального оточення
```sh
python -m venv venv
```

5. Активація віртуального оточення
```sh
.\venv\Scripts\activate
```

6. Встановлення залежностей з файлу requirements.txt
```sh
pip install -r requirements.txt
```

7. обнаруження міграцій проекту
```sh
python manage.py makemigrations
```

8. проведення міграцій проекту
```sh
python manage.py migrate
```

8. запуск проекту
```sh
python manage.py runserver
```

</details>

<details>
<summary>
MacOS
</summary>
<p></p>

4. Створення віртуального оточення
```sh
python3 -m venv venv
```

5. Активація віртуального оточення
```sh
source venv/bin/activate
```

6. Встановлення залежностей з файлу requirements.txt
```sh
pip3 install -r requirements.txt
```

7. обнаруження міграцій проекту
```sh
python3 manage.py makemigrations
```

8. проведення міграцій проекту
```sh
python3 manage.py migrate
```

8. запуск проекту
```sh
python3 manage.py runserver
```
</details>
<p></p>

---

**Віддалено (на Railway):**
   - Увійдіть у свій акаунт на [Railway](https://railway.com).
   - Нажміть на Sign in
        ![](messenger/media/readme/guide1.png)
   - Нажміть на continue with GitHub 
        ![](messenger/media/readme/guide2.png)
   -   

---

# Учасники проекту
1. [Dmytro Chepikov](https://github.com/dimachep1408) - team lead
2. [Dmytro Lomako](https://github.com/DmytroLomako)
3. [Misha Barylo](https://github.com/Mbarilo)
4. [Feliks Denga](https://github.com/Feliks2010)

---

# Структура проекту

![](media/readme/diagram.png)

# Структура додатків

![](media/readme/diagram2.png)

---

# Технології, які ми використовували

* Django - фреймворк для бекенду, обробки запитів та серверної частини веб-сокету.
* Pillow – робота із зображеннями, збереження аватарів, картинок псотів та картинок для повідомлень.
* os – керування файловою системою, збереження зображень.
* Daphne - модуль для правильної роботи асинхронності
* Сhannels - додавання у группу та персональні чати
* WebSocket - віправка повідомлень та обработка на сервері
---
# За що відповідає кожен додаток
## authorization
### Цей додаток вносить в себе три вложені сторінки:
 <b>• register</b> - <i>реєстрація користувача щоб додати його у базу даних
    ![](messenger/media/readme/register.png)

 <b>• login</b> - <i>авторизація користувача у системі, щоб комп'ютер користвуача був прив'язан до користувача у БД(Базі Даних) 
    ![](messenger/media/readme/login.png)

 <b>• verification</b> - <i>підтвердження пошти користувача, на цій сторінці користувачу відправляєтся код на пошту та коли користвуач вводить цей код і він співпадає с кодом з пошти то користувач активуєтся
    ![](messenger/media/readme/verification.png)

## chats
### Цей додаток вносить в себе дві вложені сторінки:

### також   
# Висновок
<b>• chats</b> - <i>Додаток у якому можна створити групповий чат, створити персональний чат, продовжити чатитись у вже свторенних чатах
![](messenger/media/readme/chats.png)

<b>• chat</b> - <i>Додаток у якому можна переписуватись з другими користувачами у реальному часі(коли хтось відпраляє повідомлення) воно показуєтся у всіх хто є у цьому чаті. Також можна додавати картинку до повідомлень, весь функціонал сторінки всіх чатів зберігаєтся
![](messenger/media/readme/chat.png)

## friends
### Цей додаток вносить в себе п'ять вложених сторінок тісно зв'язані із основною (friends.html)
<b>• friends</b> - Загальний додаток друзів, де відображаются запити інших користувачів рекомендації, де відображаются всі користувачи які не додані до друзів, якім не було відправлено запрос та не ті від яких очікуєтся запрос. Та всі друзі якім відрпавили запрос та вони цей запрос прийнали
![](messenger/media/readme/friends.png)

<b>• requests</b> -  Відображення тільки запросів на дружбу які нам вислали
![](messenger/media/readme/requests.png)

<b>• recomendations</b> -  Відображення тільки всіх користувачів
![](messenger/media/readme/recomend.png)

<b>• all-friends</b> -  Відображення тільки всіх друзів які прийняли наш відправлений запрос
![](messenger/media/readme/all_friends.png)

## main
<b>• main </b> - ця сторінка є основною, тут показуются всі пости всіх користувачів(від найновіших до найстаріших), при їх просмотрі додаєтся просмотр для посту, Також тут відображаются всі чати які є у користувача та запроси для додавання до друзів. Також пости можна лайкнути та на цій сторінці можна створити пост, у поста є такі поля:<br>   
• Назва<br>• Теги<br> • Текст Поста <br> • Картинки
![](messenger/media/readme/create_post.png)
<hr>

## publications
<b>• publications </b> - ця сторінка зберігає всі пости користвача(від найновіших до найстаріших), пости можна редагувати та також створювати нові на цій сторінці можна створити пост, у поста є такі поля:<br>   
• Назва<br>• Теги<br> • Текст Поста <br> • Картинки

![](messenger/media/readme/create_post.png)
![](messenger/media/readme/redact_post.png)

## settings
### Цей додаток вносить в себе дві вложені сторінки
<b>• settings </b> - це сторінка налашатувань на який можна налаштувати всю інформацію яку ви водили до цього
![](messenger/media/readme/settings.png)

<b>• albums </b> - це сторінка з альбомами в якої будуть фото користувача та всі альбоми користувача які можуть буди наповнені фото з якоїсь подорожі чи моменту. 
![](messenger/media/readme/albums.png)
Альбом хранить в собі такі поля:

• Назва<br>• тема альбому<br> • рік
![](messenger/media/readme/create_album.png)

<hr>

# Унікальні функції проекту
<b>• WebSocket </b> - У цьому проекту ми працювали із технологію WebSoket для відправки повідомлення  та його отримки
<b>• Ajax </b> - Також, ми працювали з ajax це технологія за допомогої якої можно відправляти запрос на сервер без перезавантаження сторінки
<b>• Channels </b> - Це технологія за допомогої якої можна підключати користувачів у один канал для того щоб вони могли переписуватись
<b>• Pillow </b> - Очевидно, що у проекту месседжері потрібно працювати з зображеннями, ось для цього ми і підключали pillow у проект

## Перспективи розвитку проекту
- Додати можливість переключення між білою та чорною темою
- Зробити щоб у повідомленнях можна було додавати багато картинок
- Додати функцію звонків


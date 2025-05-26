# LAB7

## Інструкції з налаштування

1. Встановіть залежності:

   ```bash
   npm install
   ```

2. Створіть проєкт у Firebase:

   - Перейдіть на [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Створіть новий проєкт
   - Увімкніть автентифікацію (Email/Password)
   - Увімкніть Realtime Database
   - Отримайте Web API Key у налаштуваннях проєкту

3. Оновіть конфігурацію Firebase:

   - Замініть `FIREBASE_API_KEY` у файлі `src/contexts/AuthContext.js`
   - Оновіть `baseURL` у `src/services/api.js` на URL вашої бази даних

4. Встановіть правила доступу до Realtime Database:

   ```json
   {
     "rules": {
       "users": {
         "$userId": {
           ".read": "$userId === auth.uid",
           ".write": "$userId === auth.uid"
         }
       }
     }
   }
   ```

5. Запустіть додаток:
   ```bash
   npx expo run:android
   ```

---

## Функціонал

- Авторизація через Firebase (вхід / реєстрація)
- Керування сесією на основі токенів
- Операції CRUD для постів
- Автоматичне оновлення токена
- Зберігання токена офлайн
- Валідація форм
- Стан завантаження
- Обробка помилок

---

## Структура проєкту

```
src/
├── contexts/
│   └── AuthContext.js          # Управління станом автентифікації
├── navigation/
│   └── AppNavigator.js         # Налаштування навігації в додатку
├── screens/
│   ├── LoginScreen.js          # Екран входу
│   ├── RegisterScreen.js       # Екран реєстрації
│   ├── Profile.js              # Профіль
│   ├── PostsScreen.js          # Список постів з можливістю CRUD
│   └── CreatePostScreen.js     # Форма створення/редагування посту
└── services/
    ├── api.js                  # Конфігурація Axios
    └── postsService.js         # Сервіс для взаємодії з API постів
```

## 📱 Скріншоти

---

## Сторінка реєстрації

![фото1](screenshots/1.png)

## Сторінка входу

![фото2](screenshots/2.png)

## Сторінка постів

![фото3](screenshots/3.png)

## Додавання посту

![фото4](screenshots/4.png)

## Відображення посту

![фото5](screenshots/5.png)

## Редагування посту

![фото6](screenshots/6.png)

## Відображення постів

![фото7](screenshots/7.png)

## Видалення посту 3

![фото8](screenshots/8.png)

## Realtime Database

![фото9](screenshots/9.png)

## Authentication

![фото10](screenshots/10.png)

## 🧑‍💻 Автор

**Качур Віталій Васильович**, ВТк-24-1

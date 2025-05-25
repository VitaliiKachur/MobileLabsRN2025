# React Native Authentication App

Мобільний додаток для автентифікації користувачів з профілями, побудований на React Native та Firebase.

## Особливості

🔐 Автентифікація користувачів (реєстрація, вхід, вихід)  
👤 Керування профілем користувача  
🔄 Скидання пароля  
🗑️ Видалення акаунту  
🔥 Інтеграція з Firebase Auth та Firestore  
🎨 Сучасний UI з кастомними компонентами  
🌐 Підтримка української мови  

## Технології

- React Native - фреймворк для мобільної розробки  
- Firebase Authentication - автентифікація користувачів  
- Firebase Firestore - база даних для профілів користувачів  
- React Navigation - навігація між екранами  
- AsyncStorage - локальне зберігання даних  

## Передумови

Перед запуском проекту переконайтеся, що у вас встановлено:

- Node.js (версія 14 або вище)  
- npm або yarn  
- React Native CLI  
- Android Studio (для Android розробки)  
- Xcode (для iOS розробки, тільки на macOS)  

## Встановлення

1. Клонування репозиторію
```bash
git clone https://github.com/
cd react-native-auth-app
```

2. Встановлення залежностей
```bash
npm install
# або
yarn install
```

3. Встановлення залежностей для iOS (тільки macOS)
```bash
cd ios && pod install && cd ..
```

4. Налаштування Firebase

- Створіть новий проект у Firebase Console  
- Увімкніть Authentication та оберіть Email/Password як метод входу  
- Створіть Firestore Database  
- Додайте Android та/або iOS додаток до проекту  
- Завантажте конфігураційні файли:
  - `google-services.json` для Android (помістіть в `android/app/`)  
  - `GoogleService-Info.plist` для iOS (помістіть в `ios/YourAppName/`)  

5. Оновлення конфігурації Firebase

Відредагуйте файл `src/config/firebase.js` та замініть конфігурацію на вашу:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## Запуск додатку

### Android
```bash
npx react-native run-android
```

### iOS (тільки macOS)
```bash
npx react-native run-ios
```

### Metro Bundler (якщо не запустився автоматично)
```bash
npx react-native start
```

## Структура проекту

```
src/
├── components/
│   └── shared/
│       ├── CustomButton.jsx    # Кастомна кнопка
│       └── CustomInput.jsx     # Кастомне поле вводу
├── config/
│   └── firebase.js             # Конфігурація Firebase
├── contexts/
│   └── AuthenticationContext.jsx # Контекст автентифікації
├── navigation/
│   ├── AuthenticatedStack.jsx   # Навігація для авторизованих користувачів
│   └── UnauthenticatedStack.jsx # Навігація для неавторизованих користувачів
├── screens/
│   ├── LoginScreen.jsx          # Екран входу
│   ├── RegistrationScreen.jsx   # Екран реєстрації
│   ├── PasswordResetScreen.jsx  # Екран скидання пароля
│   ├── UserProfileScreen.jsx    # Екран профілю користувача
│   └── AccountManagementScreen.jsx # Екран керування акаунтом
├── services/
│   ├── authService.js           # Сервіс автентифікації
│   └── userService.js           # Сервіс користувачів
└── styles/
    └── globalStyles.js          # Глобальні стилі
```

## Основний функціонал

### Автентифікація

- **Реєстрація**: створення нового акаунту з email та паролем  
- **Вхід**: автентифікація існуючого користувача  
- **Скидання пароля**: відновлення пароля через email  
- **Вихід**: завершення сесії користувача   

## 📱 Скріншоти

---
## Сторінка вхід
![фото8](screenshots/8.png)

## Створення акаунту
![фото7](screenshots/7.png)

## Профіль користувача
![фото6](screenshots/6.png)

## Налаштування акаунту
![фото5](screenshots/5.png)

## Скидання паролю
![фото2](screenshots/2.png)

## Відновлення пароля через email
![фото1](screenshots/1.png)

## Cloud Firestore
![фото4](screenshots/4.png)

## Authentication
![фото3](screenshots/3.png)


## 🧑‍💻 Автор

**Качур Віталій Васильович**, ВТк-24-1

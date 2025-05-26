# 🛍️ Мій Магазин (My Shop App)

Це мобільний додаток для інтернет-магазину, розроблений з використанням [React Native](https://reactnative.dev/) та [Expo](https://expo.dev/). Додаток дозволяє переглядати товари, додавати їх у кошик, оформлювати замовлення та переглядати історію покупок.

---

## 🚀 Встановлення та Запуск

### 📋 Необхідні умови

Перед початком переконайтеся, що у вас встановлено наступне:

- [Node.js](https://nodejs.org/) (рекомендується версія 18 або вище)
- `npm` або `yarn`
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) (встановлюється глобально: `npm install -g expo-cli`)
- [Android Studio](https://developer.android.com/studio) або [Xcode](https://developer.apple.com/xcode/) для емуляції
- Додаток **Expo Go** на мобільному пристрої (доступний у Google Play та App Store)

---

### 📦 Кроки для встановлення

#### 1. Клонування або копіювання проєкту:

```bash
git clone <URL_репозиторію>
cd lab8-my-shop-app
```

Якщо ви вже маєте файли:

```bash
cd D:\dodatki\lab8-my-shop-app
```

#### 2. Встановлення залежностей:

```bash
npm install
# або
yarn install
```

---

### 📱 Запуск додатка

#### 1. Запуск Metro Bundler:

```bash
npm start
# або
yarn start
```

Це відкриє Expo Dev Tools у браузері.

#### 2. Запуск на пристрої або емуляторі:

- **Android емулятор**:

  У вікні, де запущено `npm start`, натисніть **a** або виконайте:

  ```bash
  npm run android
  # або
  yarn android
  ```

- **iOS симулятор** (лише на macOS):

  У терміналі натисніть **i** або виконайте:

  ```bash
  npm run ios
  # або
  yarn ios
  ```

- **Фізичний пристрій**:

  Відкрийте додаток **Expo Go** на телефоні та відскануйте QR-код, що з’явиться в терміналі або браузері.

---

## 📁 Структура Проєкту

```
lab8-my-shop-app/
├── .expo/                       # Конфігурація та кеш Expo
├── android/                     # Файли Android-проєкту (для локальної збірки)
├── assets/                      # Статичні ресурси (іконки, зображення)
├── node_modules/                # Залежності Node.js
├── src/
│   ├── navigation/
│   │   └── AppNavigator.js      # Основна навігація (React Navigation)
│   ├── screens/                 # Екрани додатку
│   │   ├── CartScreen.js
│   │   ├── CheckoutScreen.js
│   │   ├── OrderHistoryScreen.js
│   │   └── ProductListScreen.js
│   └── store/                   # Сховище Redux
│       ├── slices/              # Redux-слайси (cart, orders, products, user)
│       │   ├── cartSlice.js
│       │   ├── ordersSlice.js
│       │   ├── productsSlice.js
│       │   └── userSlice.js
│       └── index.js             # Конфігурація Redux Store + Redux Persist
├── .gitignore                   # Файли/теки, які не додаються в Git
├── App.js                       # Головний компонент додатку
├── app.json                     # Конфігурація Expo
├── index.js                     # Точка входу в додаток
├── package-lock.json
└── package.json                 # Залежності та скрипти проєкту
```

---

## 🔧 Особливості

- 🛒 **Список товарів** – відображення переліку доступних продуктів.
- 📦 **Кошик** – додавання, видалення товарів, зміна кількості.
- 🧾 **Оформлення замовлення** – форма введення даних користувача, підтвердження замовлення.
- 📜 **Історія замовлень** – перегляд попередніх покупок.
- 💾 **Збереження стану** – зберігання кошика та історії.
- 🌐 **Глобальне управління станом** – `Redux Toolkit` для централізованої логіки.
- 🧭 **Навігація** – побудована на `React Navigation`.

## 📱 Скріншоти

---

## Каталог товарів

![фото1](screenshots/1.png)

## Кошик

![фото2](screenshots/2.png)

## Оформлення замовлення

![фото3](screenshots/3.png)

## Історія замовлень

![фото4](screenshots/4.png)

## 🧑‍💻 Автор

**Качур Віталій Васильович**, ВТк-24-1

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    {
      id: '1',
      name: 'iPhone 15 Pro',
      description: 'Мобільний телефон Apple iPhone 15 128GB Black (MTP03RX/A)',
      price: 55999,
      image: 'https://apple-mania.com.ua/media/catalog/product/cache/e026f651b05122a6916299262b60c47d/i/p/iphone-15-pro-finish-select-202309-6-7inch-bluetitanium.webp',
    },
    {
      id: '2',
      name: 'Samsung Galaxy S24 Ultra',
      description: 'Смартфон Samsung Galaxy S24 8/256Gb Onyx Black (SM-S921BZKGEUC)',
      price: 47499,
      image: 'https://images.samsung.com/ua/smartphones/galaxy-s25-ultra/buy/04_Color-Selection/04_1_Basic-Color/Color-Selection_Titanium-Gray_PC.png?imbypass=trueD',
    },
    {
      id: '3',
      name: 'Google Pixel 8 Pro',
      description: 'Мобільний телефон Google Pixel 8 Pro 12/128GB Obsidian (0840244705046)',
      price: 32000,
      image: 'https://cdn.kalvo.com/uploads/img/gallery/56045-google-pixel-8-pro-2.jpg',
    },
    {
      id: '4',
      name: 'AirPods Pro 2nd Gen',
      description: 'AirPods Pro 2 with MagSafe Case (USB‑C) (MTJV3) (2023)',
      price: 12888,
      image: 'https://img.jabko.ua/image/cache/catalog/products/2022/09/072342/MQD83%20(1)-1397x1397.jpg.webp',
    },
    {
      id: '5',
      name: 'USB-C Fast Charger',
      description: 'Зарядний комплект 120W Fast Charger Adapter USB/Type C Note 9 Pro, Note 10, Redmi 10, Note 11, Poco X3, Poco M4, Redmi Note 13, Redmi 12 для Xiaomi 10V/12A',
      price: 450,
      image: 'https://content.rozetka.com.ua/goods/images/big/499036633.jpg',
    },
    {
      id: '6',
      name: 'XIAOMI 15 12/512GB Black',
      description: 'Смартфон XIAOMI 15 12/512GB Black. Xiaomi 15 створений, щоб протистояти випробуванням повсякденного життя.',
      price: 40999,
      image: 'https://files.foxtrot.com.ua/PhotoNew/img_0_60_10740_0_1_KeDBIR.jpg',
    },
  ],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
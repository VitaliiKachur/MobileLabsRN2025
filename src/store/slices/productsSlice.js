const initialState = {
  items: [
    {
      id: '1',
      name: 'iPhone 15 Pro',
      description: 'The latest iPhone with a powerful A17 Bionic chip.',
      price: 1099,
      image: 'https://images.unsplash.com/photo-1695420239403-ec561f2518e3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '2',
      name: 'Samsung Galaxy S24 Ultra',
      description: 'Top-tier Android phone with S Pen and amazing camera.',
      price: 1199,
      image: 'https://images.unsplash.com/photo-1707010405230-580790f9b31d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '3',
      name: 'Google Pixel 8 Pro',
      description: 'Best of Android with AI-powered features and great camera.',
      price: 999,
      image: 'https://images.unsplash.com/photo-1698242478546-17b07096d2a4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '4',
      name: 'AirPods Pro 2nd Gen',
      description: 'Advanced noise cancellation and transparency mode.',
      price: 249,
      image: 'https://images.unsplash.com/photo-1634599522934-118817551000?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '5',
      name: 'USB-C Fast Charger',
      description: '20W USB-C power adapter for quick charging.',
      price: 25,
      image: 'https://images.unsplash.com/photo-1602758102434-d2e5b7c7b7b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
     {
      id: '6',
      name: 'Smartphone Tripod',
      description: 'Portable tripod with phone holder for stable shots.',
      price: 15,
      image: 'https://images.unsplash.com/photo-1549448332-9c991a04d262?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export default productsSlice.reducer;
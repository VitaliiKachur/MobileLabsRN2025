import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from '../screens/ProductListScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen'; 
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const CartIcon = () => {
  const navigation = useNavigation();
  const cartItems = useSelector(state => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.cartIcon}>
      <Text style={styles.cartText}>Кошик ({totalItems})</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartIcon: {
    marginRight: 15,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  cartText: {
    fontWeight: 'bold',
  },
});

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Products"
        component={ProductListScreen}
        options={{
          headerRight: () => <CartIcon />,
          title: 'Каталог товарів',
        }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={({ navigation }) => ({
          title: 'Ваш кошик',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Checkout')}
              style={{ padding: 5 }}
            >
              <Text style={{ color: '#007bff', fontWeight: 'bold' }}>Оформити</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ title: 'Завершити замовлення' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
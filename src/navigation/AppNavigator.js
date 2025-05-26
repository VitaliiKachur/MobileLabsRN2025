import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from '../screens/ProductListScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
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
  headerButton: {
    padding: 5,
    marginRight: 15,
  },
  headerButtonText: {
    color: '#007bff',
    fontWeight: 'bold',
  }
});

const AppNavigator = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Products"
        component={ProductListScreen}
        options={{
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => navigation.navigate('OrderHistory')}
              >
                <Text style={styles.headerButtonText}>Історія</Text>
              </TouchableOpacity>
              <CartIcon />
            </View>
          ),
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
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{ title: 'Історія замовлень' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
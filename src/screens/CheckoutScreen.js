import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../store/slices/userSlice';
import { clearCart } from '../store/slices/cartSlice';

const CheckoutScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert('Помилка валідації', 'Будь ласка, введіть своє ім\'я.');
      return false;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Помилка валідації', 'Будь ласка, введіть дійсну адресу електронної пошти.');
      return false;
    }
    if (cartItems.length === 0) {
      Alert.alert('Кошик порожній', 'Ваш кошик порожній. Будь ласка, додайте товари перед оформленням замовлення.');
      return false;
    }
    return true;
  };

  const handleConfirmOrder = () => {
    if (validateForm()) {
      dispatch(setUserDetails({ name, email }));
      Alert.alert(
        'Замовлення підтверджено!',
        `Дякуємо, ${name}! Ваше замовлення на загальну суму $${totalAmount.toFixed(2)} розміщено.`,
        [
          {
            text: 'ОК',
            onPress: () => {
              dispatch(clearCart());
              navigation.navigate('Products'); 
            },
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Оформлення замовлення</Text>

      <Text style={styles.label}>Ім'я:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Введіть своє ім'я"
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Введіть свою адресу електронної пошти"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Всього товарів: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}</Text>
        <Text style={styles.summaryText}>Загальна сума замовлення: ${totalAmount.toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
        <Text style={styles.confirmButtonText}>Підтвердити замовлення</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  summaryContainer: {
    marginTop: 20,
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#e6f7ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#b3e0ff',
  },
  summaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  confirmButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;
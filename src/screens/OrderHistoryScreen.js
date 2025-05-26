import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const OrderHistoryScreen = () => {
  const orders = useSelector((state) => state.orders.list);

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderDate}>Дата замовлення: {item.date}</Text>
      <Text style={styles.orderSummary}>Кількість товарів: {item.totalItems}</Text>
      <Text style={styles.orderSummary}>Загальна сума: ${item.totalAmount.toFixed(2)}</Text>
      <Text style={styles.itemsHeader}>Замовлені товари:</Text>
      {item.items.map((product, index) => (
        <View key={index} style={styles.orderedItem}>
          <Text style={styles.orderedItemText}>{product.name} (x{product.quantity}) - ${product.price.toFixed(2)} за шт</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Історія замовлень</Text>
      {orders.length === 0 ? (
        <Text style={styles.emptyHistoryText}>Замовлень ще немає.</Text>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 50,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyHistoryText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
  listContainer: {
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 15,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  orderSummary: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  itemsHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  orderedItem: {
    marginLeft: 10,
    marginBottom: 2,
  },
  orderedItemText: {
    fontSize: 13,
    color: '#666',
  },
});

export default OrderHistoryScreen;
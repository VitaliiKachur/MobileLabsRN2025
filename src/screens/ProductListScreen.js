import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice'; 

const ProductListScreen = () => {
  const products = useSelector((state) => state.products.items);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    console.log('Додано до кошика:', product.name);
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productCard}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
      </View>
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>₴{item.price.toLocaleString('uk-UA')}</Text>
        </View>
        <TouchableOpacity 
          style={styles.addToCartButton} 
          onPress={() => handleAddToCart(item)}
          activeOpacity={0.8}
        >
          <Text style={styles.addToCartButtonText}>+ Додати до кошика</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Каталог товарів</Text>
      </View>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    textAlign: 'center',
  },
  container: {
    padding: 16,
    paddingBottom: 30,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden',
  },
  imageContainer: {
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
  productDetails: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 6,
  },
  productDescription: {
    fontSize: 13,
    color: '#6c757d',
    lineHeight: 18,
    marginBottom: 8,
  },
  priceContainer: {
    marginBottom: 12,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28a745',
  },
  addToCartButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: 'flex-start',
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ProductListScreen;
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components/native';

const GameCard = ({ title, subtitle, discount, oldPrice, newPrice, imageUrl, platformIcon }) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Image source={imageUrl} style={styles.image} />

      <View style={styles.textOverlay}>
        <Text style={[styles.title, { color: theme.text1 }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>{subtitle}</Text>
      </View>
      <View style={styles.bottomOverlay}>
        <View style={styles.priceOverlay}>
          <View style={styles.discountBox}>
            <Text style={styles.discountText}>{discount}</Text>
          </View>
          <View style={styles.priceBox}>
            <Text style={styles.oldPrice}>{oldPrice}</Text>
            <Text style={styles.newPrice}>{newPrice}</Text>
          </View>
        </View>

        <Image source={require('../assets/images/microsoft-windows-22.png')}  />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    height: 230,
    borderRadius: 12,
    // overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textOverlay: {
    position: 'absolute',
    top: 120, 
    left: 12,
    right: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.14,
    fontFamily: 'ABeeZee',
    fontWeight: '400',
    marginTop: 2,
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceOverlay: {
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
  },
  discountBox: {
    backgroundColor: '#1aa34a',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  priceBox: {
    backgroundColor: '#000000A0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  oldPrice: {
    color: '#bbb',
    textDecorationLine: 'line-through',
    fontSize: 16,
    marginRight: 6,
  },
  newPrice: {
    color: 'white',
    fontSize: 16,
  },
  platformIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default GameCard;

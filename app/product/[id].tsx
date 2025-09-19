
import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, commonStyles, buttonStyles } from '../../styles/commonStyles';
import { mockProducts } from '../../data/mockData';
import { useCart } from '../../hooks/useCart';
import Icon from '../../components/Icon';

export default function ProductScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { addToCart, getTotalItems } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = mockProducts.find(p => p.id === id);
  const totalItems = getTotalItems();

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      Alert.alert(
        'Agregado al carrito',
        `${quantity}x ${product.name} agregado al carrito`,
        [
          { text: 'Seguir comprando', style: 'cancel' },
          { text: 'Ver carrito', onPress: () => router.push('/cart') },
        ]
      );
    }
  };

  if (!product) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={commonStyles.centerContent}>
          <Text style={commonStyles.title}>Producto no encontrado</Text>
          <TouchableOpacity 
            style={{ marginTop: 20 }}
            onPress={() => router.back()}
          >
            <Text style={{ color: colors.primary }}>Volver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Producto</Text>
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => router.push('/cart')}
        >
          <Icon name="bag-outline" size={24} color={colors.text} />
          {totalItems > 0 && (
            <View style={commonStyles.badge}>
              <Text style={commonStyles.badgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
        </View>

        {/* Quantity Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cantidad</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Icon name="remove" size={20} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Icon name="add" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Total */}
        <View style={styles.section}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>${(product.price * quantity).toFixed(2)}</Text>
          </View>
        </View>

        {/* Product Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalles del Producto</Text>
          <View style={commonStyles.card}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Categoría:</Text>
              <Text style={styles.detailValue}>Productos del Campo</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Disponibilidad:</Text>
              <Text style={[styles.detailValue, { color: colors.success }]}>En Stock</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Origen:</Text>
              <Text style={styles.detailValue}>Artesanal</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity 
          style={[buttonStyles.primary, { flex: 1 }]}
          onPress={handleAddToCart}
        >
          <Text style={buttonStyles.textLight}>
            Agregar al Carrito - ${(product.price * quantity).toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={commonStyles.bottomTab}>
        <TouchableOpacity style={commonStyles.tabItem} onPress={() => router.push('/')}>
          <Icon name="home-outline" size={24} color={colors.text} />
          <Text style={styles.tabText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.tabItem} onPress={() => router.push('/products')}>
          <Icon name="grid-outline" size={24} color={colors.text} />
          <Text style={styles.tabText}>Productos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.tabItem} onPress={() => router.push('/cart')}>
          <Icon name="bag-outline" size={24} color={colors.text} />
          <Text style={styles.tabText}>Carrito</Text>
          {totalItems > 0 && (
            <View style={commonStyles.badge}>
              <Text style={commonStyles.badgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.tabItem} onPress={() => router.push('/profile')}>
          <Icon name="person-outline" size={24} color={colors.text} />
          <Text style={styles.tabText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  cartButton: {
    position: 'relative',
    padding: 8,
  },
  imageContainer: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
  },
  productInfo: {
    marginBottom: 24,
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.secondary,
    marginBottom: 16,
  },
  productDescription: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    padding: 8,
    alignSelf: 'center',
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0px 2px 4px ${colors.shadow}`,
    elevation: 2,
  },
  quantityText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginHorizontal: 24,
    minWidth: 30,
    textAlign: 'center',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.backgroundAlt,
    padding: 20,
    borderRadius: 12,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.secondary,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: colors.textLight,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  bottomSpacing: {
    height: 20,
  },
  tabText: {
    fontSize: 12,
    color: colors.text,
    marginTop: 4,
    fontWeight: '500',
  },
});

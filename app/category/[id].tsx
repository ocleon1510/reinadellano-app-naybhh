
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { colors, commonStyles } from '../../styles/commonStyles';
import { mockProducts, mockCategories } from '../../data/mockData';
import { useCart } from '../../hooks/useCart';
import ProductCard from '../../components/ProductCard';
import Icon from '../../components/Icon';

export default function CategoryScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { addToCart, getTotalItems } = useCart();
  
  const category = mockCategories.find(cat => cat.id === id);
  const products = mockProducts.filter(product => product.categoryId === id);
  const totalItems = getTotalItems();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    console.log('Added to cart:', product.name);
  };

  if (!category) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={commonStyles.centerContent}>
          <Text style={commonStyles.title}>Categoría no encontrada</Text>
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
        <Text style={styles.headerTitle}>{category.name}</Text>
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

      {/* Category Info */}
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryDescription}>{category.description}</Text>
        <Text style={styles.productCount}>{products.length} productos disponibles</Text>
      </View>

      {/* Products */}
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => router.push(`/product/${item.id}`)}
            onAddToCart={() => handleAddToCart(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productsContainer}
        showsVerticalScrollIndicator={false}
      />

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
  categoryInfo: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.backgroundAlt,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
  },
  categoryDescription: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
  },
  productCount: {
    fontSize: 14,
    color: colors.textLight,
    fontWeight: '500',
  },
  productsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  tabText: {
    fontSize: 12,
    color: colors.text,
    marginTop: 4,
    fontWeight: '500',
  },
});

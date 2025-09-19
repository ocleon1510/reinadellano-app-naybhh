
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, commonStyles } from '../styles/commonStyles';
import { mockProducts, mockCategories } from '../data/mockData';
import { useCart } from '../hooks/useCart';
import ProductCard from '../components/ProductCard';
import Icon from '../components/Icon';

export default function ProductsScreen() {
  const router = useRouter();
  const { addToCart, getTotalItems } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const totalItems = getTotalItems();

  const filteredProducts = selectedCategory 
    ? mockProducts.filter(product => product.categoryId === selectedCategory)
    : mockProducts;

  const handleAddToCart = (product: any) => {
    addToCart(product);
    console.log('Added to cart:', product.name);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Productos</Text>
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

      {/* Category Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryFilter}
        contentContainerStyle={styles.categoryFilterContent}
      >
        <TouchableOpacity
          style={[
            styles.categoryChip,
            selectedCategory === null && styles.categoryChipActive
          ]}
          onPress={() => setSelectedCategory(null)}
        >
          <Text style={[
            styles.categoryChipText,
            selectedCategory === null && styles.categoryChipTextActive
          ]}>
            Todos
          </Text>
        </TouchableOpacity>
        {mockCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryChip,
              selectedCategory === category.id && styles.categoryChipActive
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text style={[
              styles.categoryChipText,
              selectedCategory === category.id && styles.categoryChipTextActive
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Products Grid */}
      <FlatList
        data={filteredProducts}
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
          <Icon name="grid" size={24} color={colors.primary} />
          <Text style={[styles.tabText, { color: colors.primary }]}>Productos</Text>
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
  categoryFilter: {
    maxHeight: 60,
    marginBottom: 16,
  },
  categoryFilterContent: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  categoryChip: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  categoryChipTextActive: {
    color: colors.text,
    fontWeight: '600',
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

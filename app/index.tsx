
import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, commonStyles } from '../styles/commonStyles';
import { mockCategories } from '../data/mockData';
import { useCart } from '../hooks/useCart';
import CategoryCard from '../components/CategoryCard';
import Icon from '../components/Icon';

export default function HomeScreen() {
  const router = useRouter();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>RDL</Text>
          </View>
          <View>
            <Text style={styles.brandName}>Reina del Llano</Text>
            <Text style={styles.brandSubtitle}>Productos del Campo</Text>
          </View>
        </View>
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

      {/* Banner */}
      <View style={styles.banner}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800' }}
          style={styles.bannerImage}
        />
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerTitle}>Productos Frescos del Campo</Text>
          <Text style={styles.bannerSubtitle}>Tequeños, empanadas, cachitos y lácteos artesanales</Text>
        </View>
      </View>

      {/* Categories */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nuestras Categorías</Text>
          <Text style={styles.sectionSubtitle}>Descubre nuestros deliciosos productos</Text>
        </View>

        <View style={styles.categoriesContainer}>
          {mockCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onPress={() => router.push(`/category/${category.id}`)}
            />
          ))}
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre Nosotros</Text>
          <Text style={styles.aboutText}>
            En Reina del Llano nos especializamos en productos frescos y artesanales del campo. 
            Desde deliciosos tequeños y empanadas hasta quesos y lácteos de la más alta calidad, 
            cada producto está hecho con amor y tradición familiar.
          </Text>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={commonStyles.bottomTab}>
        <TouchableOpacity style={commonStyles.tabItem} onPress={() => router.push('/')}>
          <Icon name="home" size={24} color={colors.primary} />
          <Text style={[styles.tabText, { color: colors.primary }]}>Inicio</Text>
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
  header: {
    ...commonStyles.header,
    backgroundColor: colors.background,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  brandName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  brandSubtitle: {
    fontSize: 12,
    color: colors.textLight,
  },
  cartButton: {
    position: 'relative',
    padding: 8,
  },
  banner: {
    height: 200,
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  bannerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 20,
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.background,
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: colors.background,
    opacity: 0.9,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textLight,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
  },
  aboutText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    textAlign: 'justify',
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

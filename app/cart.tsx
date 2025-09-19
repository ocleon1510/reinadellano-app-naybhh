
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, commonStyles, buttonStyles } from '../styles/commonStyles';
import { useCart } from '../hooks/useCart';
import CartItem from '../components/CartItem';
import Icon from '../components/Icon';

export default function CartScreen() {
  const router = useRouter();
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getTotalItems, 
    getTotalPrice,
    getCartSummary 
  } = useCart();
  
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleShareWhatsApp = () => {
    if (cartItems.length === 0) {
      Alert.alert('Carrito vacío', 'Agrega productos al carrito antes de realizar el pedido.');
      return;
    }

    const businessWhatsApp = '584241234567'; // Replace with actual business WhatsApp number
    const orderSummary = getCartSummary();
    const message = `🛒 *Nuevo Pedido - Reina del Llano*\n\n` +
                   `👤 Cliente: ${customerName || 'No especificado'}\n` +
                   `📱 Teléfono: ${customerPhone || 'No especificado'}\n\n` +
                   `📋 *Productos:*\n${orderSummary}\n\n` +
                   `💰 *Total: $${totalPrice.toFixed(2)}*\n\n` +
                   `¡Gracias por tu pedido! 🌾`;

    const whatsappUrl = `https://wa.me/${businessWhatsApp}?text=${encodeURIComponent(message)}`;
    
    Linking.openURL(whatsappUrl).catch(() => {
      Alert.alert('Error', 'No se pudo abrir WhatsApp. Asegúrate de tenerlo instalado.');
    });
  };

  const handleClearCart = () => {
    Alert.alert(
      'Vaciar carrito',
      '¿Estás seguro de que quieres vaciar el carrito?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Vaciar', style: 'destructive', onPress: clearCart },
      ]
    );
  };

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={commonStyles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Carrito</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={commonStyles.centerContent}>
          <Icon name="bag-outline" size={80} color={colors.textLight} />
          <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
          <Text style={styles.emptySubtitle}>Agrega productos para comenzar tu pedido</Text>
          <TouchableOpacity 
            style={[buttonStyles.primary, { marginTop: 24 }]}
            onPress={() => router.push('/products')}
          >
            <Text style={buttonStyles.textLight}>Ver Productos</Text>
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
            <Icon name="bag" size={24} color={colors.primary} />
            <Text style={[styles.tabText, { color: colors.primary }]}>Carrito</Text>
          </TouchableOpacity>
          <TouchableOpacity style={commonStyles.tabItem} onPress={() => router.push('/profile')}>
            <Icon name="person-outline" size={24} color={colors.text} />
            <Text style={styles.tabText}>Perfil</Text>
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
        <Text style={styles.headerTitle}>Carrito ({totalItems})</Text>
        <TouchableOpacity onPress={handleClearCart}>
          <Icon name="trash-outline" size={24} color={colors.error} />
        </TouchableOpacity>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Cart Items */}
        <View style={styles.section}>
          {cartItems.map((item) => (
            <CartItem
              key={item.product.id}
              item={item}
              onUpdateQuantity={(quantity) => updateQuantity(item.product.id, quantity)}
              onRemove={() => removeFromCart(item.product.id)}
            />
          ))}
        </View>

        {/* Customer Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información del Cliente</Text>
          <View style={commonStyles.card}>
            <Text style={styles.inputLabel}>Nombre (opcional)</Text>
            <Text 
              style={[commonStyles.input, styles.input]}
              onPress={() => {
                // In a real app, you'd use TextInput here
                console.log('Name input pressed');
              }}
            >
              {customerName || 'Toca para agregar tu nombre'}
            </Text>
            
            <Text style={styles.inputLabel}>Teléfono (opcional)</Text>
            <Text 
              style={[commonStyles.input, styles.input]}
              onPress={() => {
                // In a real app, you'd use TextInput here
                console.log('Phone input pressed');
              }}
            >
              {customerPhone || 'Toca para agregar tu teléfono'}
            </Text>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen del Pedido</Text>
          <View style={commonStyles.card}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Productos ({totalItems})</Text>
              <Text style={styles.summaryValue}>${totalPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${totalPrice.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity 
          style={[buttonStyles.secondary, { flex: 1, marginRight: 8 }]}
          onPress={handleShareWhatsApp}
        >
          <View style={styles.whatsappButton}>
            <Icon name="logo-whatsapp" size={20} color={colors.background} />
            <Text style={[buttonStyles.textLight, { marginLeft: 8 }]}>
              Enviar por WhatsApp
            </Text>
          </View>
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
          <Icon name="bag" size={24} color={colors.primary} />
          <Text style={[styles.tabText, { color: colors.primary }]}>Carrito</Text>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 4,
  },
  input: {
    color: colors.textLight,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: colors.text,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.secondary,
  },
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
    marginTop: 24,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 8,
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

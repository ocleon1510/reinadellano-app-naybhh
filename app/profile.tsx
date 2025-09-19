
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, commonStyles, buttonStyles } from '../styles/commonStyles';
import Icon from '../components/Icon';
import SimpleBottomSheet from '../components/BottomSheet';

export default function ProfileScreen() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginSheetVisible, setIsLoginSheetVisible] = useState(false);
  const [isAdminLoginVisible, setIsAdminLoginVisible] = useState(false);

  const handleLogin = () => {
    setIsLoginSheetVisible(true);
  };

  const handleAdminLogin = () => {
    setIsAdminLoginVisible(true);
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar Sesión', style: 'destructive', onPress: () => setIsLoggedIn(false) },
      ]
    );
  };

  const menuItems = [
    { icon: 'person-outline', title: 'Mi Perfil', onPress: () => console.log('Profile pressed') },
    { icon: 'bag-outline', title: 'Mis Pedidos', onPress: () => console.log('Orders pressed') },
    { icon: 'heart-outline', title: 'Favoritos', onPress: () => console.log('Favorites pressed') },
    { icon: 'location-outline', title: 'Direcciones', onPress: () => console.log('Addresses pressed') },
    { icon: 'card-outline', title: 'Métodos de Pago', onPress: () => console.log('Payment pressed') },
    { icon: 'notifications-outline', title: 'Notificaciones', onPress: () => console.log('Notifications pressed') },
    { icon: 'help-circle-outline', title: 'Ayuda y Soporte', onPress: () => console.log('Help pressed') },
    { icon: 'information-circle-outline', title: 'Acerca de', onPress: () => console.log('About pressed') },
  ];

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <View style={styles.userSection}>
          <View style={styles.avatar}>
            <Icon name="person" size={40} color={colors.textLight} />
          </View>
          {isLoggedIn ? (
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Usuario Demo</Text>
              <Text style={styles.userEmail}>usuario@ejemplo.com</Text>
            </View>
          ) : (
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Invitado</Text>
              <Text style={styles.userEmail}>Inicia sesión para acceder a todas las funciones</Text>
            </View>
          )}
        </View>

        {/* Login/Logout Button */}
        <View style={styles.section}>
          {isLoggedIn ? (
            <TouchableOpacity style={buttonStyles.outline} onPress={handleLogout}>
              <Text style={buttonStyles.text}>Cerrar Sesión</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={buttonStyles.primary} onPress={handleLogin}>
              <Text style={buttonStyles.textLight}>Iniciar Sesión</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
              <View style={styles.menuItemLeft}>
                <Icon name={item.icon as any} size={24} color={colors.text} />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Icon name="chevron-forward" size={20} color={colors.textLight} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Admin Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Administración</Text>
          <TouchableOpacity style={styles.menuItem} onPress={handleAdminLogin}>
            <View style={styles.menuItemLeft}>
              <Icon name="shield-outline" size={24} color={colors.accent} />
              <Text style={[styles.menuItemText, { color: colors.accent }]}>Acceso Administrativo</Text>
            </View>
            <Icon name="chevron-forward" size={20} color={colors.textLight} />
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.section}>
          <View style={commonStyles.card}>
            <Text style={styles.appName}>Reina del Llano</Text>
            <Text style={styles.appVersion}>Versión 1.0.0</Text>
            <Text style={styles.appDescription}>
              Productos frescos y artesanales del campo venezolano
            </Text>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Login Bottom Sheet */}
      <SimpleBottomSheet
        isVisible={isLoginSheetVisible}
        onClose={() => setIsLoginSheetVisible(false)}
      >
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>Iniciar Sesión</Text>
          <Text style={styles.bottomSheetSubtitle}>
            Ingresa tus credenciales para acceder a tu cuenta
          </Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={commonStyles.input}>
              <Text style={styles.inputPlaceholder}>Ingresa tu email</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Contraseña</Text>
            <View style={commonStyles.input}>
              <Text style={styles.inputPlaceholder}>Ingresa tu contraseña</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={[buttonStyles.primary, { marginTop: 16 }]}
            onPress={() => {
              setIsLoggedIn(true);
              setIsLoginSheetVisible(false);
              Alert.alert('Éxito', 'Has iniciado sesión correctamente');
            }}
          >
            <Text style={buttonStyles.textLight}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[buttonStyles.outline, { marginTop: 12 }]}
            onPress={() => Alert.alert('Registro', 'Función de registro no implementada')}
          >
            <Text style={buttonStyles.text}>Crear Cuenta</Text>
          </TouchableOpacity>
        </View>
      </SimpleBottomSheet>

      {/* Admin Login Bottom Sheet */}
      <SimpleBottomSheet
        isVisible={isAdminLoginVisible}
        onClose={() => setIsAdminLoginVisible(false)}
      >
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetTitle}>Acceso Administrativo</Text>
          <Text style={styles.bottomSheetSubtitle}>
            Solo para administradores autorizados
          </Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Usuario Administrador</Text>
            <View style={commonStyles.input}>
              <Text style={styles.inputPlaceholder}>admin</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Contraseña</Text>
            <View style={commonStyles.input}>
              <Text style={styles.inputPlaceholder}>••••••••</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={[buttonStyles.secondary, { marginTop: 16 }]}
            onPress={() => {
              setIsAdminLoginVisible(false);
              Alert.alert('Admin', 'Para implementar funciones administrativas completas, necesitarás habilitar Supabase para la base de datos y autenticación.');
            }}
          >
            <Text style={buttonStyles.textLight}>Acceder como Admin</Text>
          </TouchableOpacity>
        </View>
      </SimpleBottomSheet>

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
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.tabItem} onPress={() => router.push('/profile')}>
          <Icon name="person" size={24} color={colors.primary} />
          <Text style={[styles.tabText, { color: colors.primary }]}>Perfil</Text>
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
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 16,
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.textLight,
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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 16,
  },
  appName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 20,
  },
  bottomSheetContent: {
    padding: 20,
  },
  bottomSheetTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  bottomSheetSubtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
  },
  inputPlaceholder: {
    color: colors.textLight,
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

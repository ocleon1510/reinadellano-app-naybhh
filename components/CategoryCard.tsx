
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Category } from '../types';
import { colors, commonStyles } from '../styles/commonStyles';

interface CategoryCardProps {
  category: Category;
  onPress: () => void;
}

export default function CategoryCard({ category, onPress }: CategoryCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: category.image }} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.name}>{category.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{category.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginVertical: 8,
    marginHorizontal: 4,
    overflow: 'hidden',
    boxShadow: `0px 4px 12px ${colors.shadow}`,
    elevation: 3,
    height: 140,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 16,
    justifyContent: 'flex-end',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.background,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: colors.background,
    opacity: 0.9,
  },
});

import { Product, ProductsResponse } from '@/types/types';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com'
});

export const fetchCategories = async (): Promise<string[]> => {
  const response = await api.get('/products/categories');
  return response.data;
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  const response = await api.get(`/products/category/${category}`);
  return response.data.products;
};

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await axios.get<ProductsResponse>(`/products?limit=100`);
    return response.data.products;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
}



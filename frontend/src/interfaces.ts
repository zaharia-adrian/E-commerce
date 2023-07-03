export interface Product {
  _id?: string;
  userId?: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface User {
  name: string;
  email: string;
  token: string;
  isAdmin: boolean;
  _id: string;
}

export interface CartProduct {
  name: string;
  _id: string;
  productId: string;
  price: number;
  quantity: number;
  image: string;
}

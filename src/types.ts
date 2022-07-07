export type Product = {
    id: number;
    name: string;
    icon: string;
    price: {
      USD: number;
      NOK: number;
    };
    type: string;
  }

export type Cart = {
    name: string;
    quantity: number;
  }
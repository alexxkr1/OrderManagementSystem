export interface IOrder {
  order_number: string;
  customer_code: string;
  date: string;
}

export interface IOrderRow {
  order: number;
  ordered_quantity: number;
  product_code: string;
  product_name: string;
}

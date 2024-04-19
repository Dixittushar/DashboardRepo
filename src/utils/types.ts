
export interface Category {
    value: string;
    label: string;
}

export interface Product {
    id: number;
    price: number;
    category: string;
    title: string;
}

export interface ChartDataPoint {
    name: string;
    price: number;
}
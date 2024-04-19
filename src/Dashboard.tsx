import React, { useState, useEffect } from "react";
import CategorySelect from "./components/CategorySelect";
import ProductSelect from "./components/ProductSelect";
import RunReportButton from "./components/RunReportButton";
import ChartContainer from "./Chart/ChartContainer";
import MaterialUIContainer from "@mui/material/Container";
import Spinner from "./components/Spinner";
import styled from "@emotion/styled";
import { Category, Product } from "./utils/types";
import { MultiValue, ActionMeta } from "react-select";
import PieChart from "./Chart/PieChart";

// Styles
const Container = styled(MaterialUIContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 20px;
`;

const TopContainer = styled(MaterialUIContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f5f5f5;
`;

const ContainerChart = styled.div`
  width: 100%;
  flex: 1;
  min-height: 400px;
  padding-top: 50px;
`;

// Component definition
interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [chartData, setChartData] = useState<any[]>([]); // Adjust this if you have a specific chart type
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("https://dummyjson.com/products/categories");
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  // Fetch products when selectedCategory changes
  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedCategory) return;

      setIsLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products/category/${selectedCategory.value}`
      );
      const data = await response.json();

      setProducts(
        data.products.map((product: { id: any; title: any }) => ({
          value: product.id,
          label: product.title,
        }))
      );
      setIsLoading(false);
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryChange = (selectedOption: Category | null) => {
    setSelectedCategory(selectedOption);
    setSelectedProducts([]);
    setChartData([]);
  };

  const handleProductChange = (
    value: MultiValue<Product>,
    actionMeta: ActionMeta<Product>
  ) => {
    // 1. Filtering the products based on selectedCategory
    const filteredProducts = selectedCategory
      ? products.filter(
          (product) => product.category === selectedCategory.value
        )
      : [];

    // 2. Extracting the product IDs from the filtered products
    const selectedProductIds = filteredProducts.map((product) => product.id);

    // 3. Updating selectedProducts state
    setSelectedProducts(selectedProductIds);
  };

  const handleRunReport = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const response = await fetch(
      `https://dummyjson.com/products/category/${selectedCategory?.value}`
    );
    const data = await response.json();

    const productPrices = data.products.map(
      (product: { id: any; title: any; price: any }) => ({
        id: product.id,
        name: product.title,
        price: product.price,
      })
    );

    const chartData = processChartData(productPrices, selectedProducts);
    setChartData(chartData);
    setIsLoading(false);
  };

  const processChartData = (
    productPrices: { id: number; name: string; price: number }[],
    selectedProducts: number[]
  ) => {
    if (!selectedCategory) {
      return [];
    }

    const filteredPrices =
      selectedProducts.length === 0
        ? productPrices
        : productPrices.filter((product) =>
            selectedProducts.includes(product.id)
          );

    return filteredPrices.map((product) => ({
      name: product.name,
      price: product.price,
    }));
  };

  const handleClearFilter = () => {
    setSelectedCategory(null);
    setSelectedProducts([]);
    setChartData([]);
  };

  const renderContent = () => {
    if (isLoading) {
      return <Spinner />;
    }

    return (
      <>
        <TopContainer>
          <CategorySelect
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={handleCategoryChange}
          />
          <ProductSelect
            products={products}
            disabled={!selectedCategory}
            onSelect={handleProductChange}
          />
          <RunReportButton
            disabled={!selectedCategory}
            onClick={handleRunReport}
          />
          <button onClick={handleClearFilter}>Clear Filter</button>
        </TopContainer>
        <ContainerChart>
          {!selectedCategory ? (
            <PieChart />
          ) : (
            <ChartContainer
              chartData={chartData}
              type={selectedCategory.value}
            />
          )}
        </ContainerChart>
      </>
    );
  };

  return <Container>{renderContent()}</Container>;
};

export default Dashboard;

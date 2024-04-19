import React from "react";
import Select, { ActionMeta, MultiValue } from "react-select";
import { Product } from "../utils/types";

interface ProductSelectProps {
  products: Product[];
  disabled: boolean;
  onSelect: (
    value: MultiValue<Product>,
    actionMeta: ActionMeta<Product>
  ) => void;
}

const ProductSelect: React.FC<ProductSelectProps> = ({
  products,
  disabled,
  onSelect,
}) => {
  return (
    <div>
      <Select
        options={products}
        isDisabled={disabled}
        isMulti
        onChange={onSelect}
        placeholder="Select Product.."
      />
    </div>
  );
};

export default ProductSelect;

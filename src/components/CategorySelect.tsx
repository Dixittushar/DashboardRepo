import React from "react";
import Select, { ActionMeta, SingleValue } from "react-select";

import { Category } from "../utils/types";

interface CategorySelectProps {
  categories: Category[];
  selectedCategory: Category | null;
  onSelect: (
    selectedOption: SingleValue<Category> | null,
    actionMeta: ActionMeta<Category>
  ) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  categories,
  selectedCategory,
  onSelect,
}) => {
  return (
    <div>
      {categories && (
        <Select
          options={categories.map((category) => ({
            label: category,
            value: category,
          }))}
          onChange={(selectedOption) =>
            onSelect(
              selectedOption as SingleValue<Category> | null,
              null as any
            )
          }
          placeholder={
            selectedCategory ? selectedCategory?.label : "Select Category.."
          }
        />
      )}
    </div>
  );
};

export default CategorySelect;

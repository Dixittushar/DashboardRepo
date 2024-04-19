import React from "react";
import Select, { ActionMeta, SingleValue } from "react-select";

import { Category } from "../utils/types"; // Import your Category type

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
  console.log(selectedCategory);
  return (
    <div>
      {categories && (
        <Select
          options={categories.map((category) => ({
            value: category,
            label: category,
          }))}
          // value={selectedCategory} // Set the value prop
          onChange={(selectedOption) =>
            onSelect(
              selectedOption as SingleValue<Category> | null,
              null as any
            )
          }
          placeholder="Select Category.."
        />
      )}
    </div>
  );
};

export default CategorySelect;

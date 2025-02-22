import { signal } from "@preact/signals-react";
import allCategories from "@assets/data/categories";
import { CategoryItemType } from "@/types";

const categorySignal = signal<CategoryItemType[]>(allCategories);

const setCategory = (id: string, value: boolean) => {
  categorySignal.value = categorySignal.value.map((category: CategoryItemType) => {
    if(category.id == id) {
      return { ...category, checked: value}
    }

    return category;
  })
}

const resetCategories = () => {
  categorySignal.value = categorySignal.value.map((category: CategoryItemType) => { return {...category, checked: false}})
}

export {
  categorySignal,
  setCategory,
  resetCategories
} 
  

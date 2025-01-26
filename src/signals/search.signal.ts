import { signal, effect, computed } from "@preact/signals-react";
import categories from "@assets/data/categories";

const searchQuerySignal = signal("");

const categorySignal = signal(categories);

const setCategory = (id: string, value: boolean) => {
  categorySignal.value = categorySignal.value.map(category => {
    if(category.id == id) {
      return { ...category, checked: value}
    }

    return category;
  })
}

const setSearchQuery = (value: string) => {
  searchQuerySignal.value = value
}

const resetCategories = () => {
  categorySignal.value = categorySignal.value.map(category => { return {...category, checked: false}})
}

const getGiftCards = () => {
  console.log(searchQuerySignal.value, categorySignal.value);
  
}

export {
  searchQuerySignal,
  categorySignal,
  setCategory,
  resetCategories,
  setSearchQuery,
  getGiftCards
} 
  

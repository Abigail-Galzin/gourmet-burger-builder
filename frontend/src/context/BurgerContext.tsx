import { useState, useContext, createContext } from 'react';
import type { Ingredients } from '../Types';

const BurgerContext = createContext(null);

export function BurgerProvider({ children }) {
  const [burgerIngredients, setBurgerIngredients] = useState<Ingredients[]>([]);
  const [burgerBase, setBurgerBase] = useState<Ingredients | null>(null);
  const [isOrdering, setIsOrdering] = useState<boolean>(false);

  const addIngredient = (ingredient: Ingredients) => {
    if (ingredient.type.includes('base')) {
      setBurgerBase(ingredient);
    } else {
      setBurgerIngredients([...burgerIngredients, ingredient]);
    }
  };

  const removeIngredient = (indexToRemove: number) => {
    setBurgerIngredients(burgerIngredients.filter((_, index) => index !== indexToRemove));
  };

  const resetBurger = () => {
    setBurgerIngredients([]);
    setBurgerBase(null);
  };

  const saveBurger = () => {
    setIsOrdering(!isOrdering);
    setBurgerIngredients([]);
    setBurgerBase(null);
  };

  const [basePrice, baseCalories] = burgerBase ? [burgerBase.price, burgerBase.calories] : [0, 0];
  const value = {
    burgerIngredients,
    burgerBase,
    addIngredient,
    removeIngredient,
    resetBurger,
    saveBurger,
    totalPrice: burgerIngredients.reduce((sum, ing) => sum + ing.price, basePrice),
    totalCalories: burgerIngredients.reduce(
      (sum: number, ing: Ingredients) => sum + ing.calories, baseCalories
    ),
    totalIngredients: burgerBase ? [burgerBase,...burgerIngredients]:[...burgerIngredients],
    isOrdering
  };

  return (
    <BurgerContext.Provider value={ value }>
      {children} {}
    </BurgerContext.Provider>
  );
}

export function useBurgerBuilder() {
  const context = useContext(BurgerContext);
  if (!context) {
    throw new Error('useBurger should be use inside BurgerProvider');
  }
  return context;
}

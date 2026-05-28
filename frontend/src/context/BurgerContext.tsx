import { useState, useContext, createContext } from 'react';
import { orderService } from '../service/OrderService';
import type { Ingredients } from '../Types';

const BurgerContext = createContext(null);

export function BurgerProvider({ children }) {
  const [burgerIngredients, setBurgerIngredients] = useState<Ingredients[]>([]);
  const [burgerBase, setBurgerBase] = useState<Ingredients | null>(null);
  const [basePrice, baseCalories] = burgerBase ? [burgerBase.price, burgerBase.calories] : [0, 0];
  const totalPrice = burgerIngredients.reduce((sum, ing) => sum + ing.price, basePrice);
  const totalCalories = burgerIngredients.reduce(
    (sum: number, ing: Ingredients) => sum + ing.calories, baseCalories
  );
  const [isOrdering, setIsOrdering] = useState<boolean>(false);

  const addIngredient = (ingredient: Ingredients) => {
    if (ingredient.type.includes('base')) {
      setBurgerBase(ingredient);
    } else {
      setBurgerIngredients([...burgerIngredients, ingredient]);
    }
  };

  const removeIngredient = (indexToRemove: number, finalIndex: number) => {
    const first = indexToRemove === 0;
    if ((first || indexToRemove === finalIndex) && burgerBase != null) {
      setBurgerBase(null);
    } else {
      const remove = first ? indexToRemove : indexToRemove - 1;
      setBurgerIngredients(burgerIngredients.filter((_, index) => index !== remove));
    }
  };

  const resetBurger = () => {
    setBurgerIngredients([]);
    setBurgerBase(null);
  };

  const saveBurger = async () => {
    try {
      setIsOrdering(false);
      await orderService.createBurgerOrder(
        totalPrice,
        totalCalories,
        burgerBase,
        burgerIngredients
      );

      alert('✅ Burger order stored with layers!');

      setIsOrdering(false);
      setBurgerIngredients([]);
      setBurgerBase(null);

    } catch (error: any) {
      alert(`⚠️ Error: ${error.message}`);
    } finally {
      setIsOrdering(false);
    }
  }

  const value = {
    burgerIngredients,
    burgerBase,
    addIngredient,
    removeIngredient,
    resetBurger,
    saveBurger,
    totalPrice,
    totalCalories,
    totalIngredients: burgerBase ? [burgerBase, ...burgerIngredients] : [...burgerIngredients],
    isOrdering
  };

  return (
    <BurgerContext.Provider value={value}>
      {children} { }
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

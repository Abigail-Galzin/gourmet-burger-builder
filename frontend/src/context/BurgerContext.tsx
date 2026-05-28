import { useState, useContext, createContext } from 'react';
import type { Ingredients, OrderInput } from '../Types';
import { supabase } from '../supabaseClient';

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
      const orderInput: OrderInput = {
        total_price: totalPrice,
        total_calories: totalCalories,
        status: 'PENDING'
      }

      const { data: createdOrder, error } = await supabase
        .from('orders')
        .insert([orderInput])
        .select('id')
        .single();

      if (error || !createdOrder) {
        alert(`⚠️ Error al crear la orden: ${error?.message || 'Error desconocido'}`);
        return { success: false, error: error };
      }
      const newOrderId = createdOrder.id;

      const ingredientsPreview: Ingredients[] = burgerBase
        ? [burgerBase, ...burgerIngredients]
        : burgerIngredients;
      const intermediateRows = ingredientsPreview.map((ingredient, index) => ({
        order_id: newOrderId,
        ingredient_id: ingredient.id,
        layer_position: index,
        is_base: ingredient.type.includes('base')
      }));

      const { error: ingredientsError } = await supabase
        .from('order_ingredients')
        .insert(intermediateRows);

      if (ingredientsError) {
        alert(`⚠️ Orden creada (#${newOrderId}), pero falló al guardar los ingredientes: ${ingredientsError.message}`);
        return;
      }
      if (createdOrder != null) {
        alert('¡✅ Orden creada con éxito!');
        setBurgerIngredients([]);
        setBurgerBase(null);
      }
    } catch (error) {
      console.error('Error inesperado:', error);
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

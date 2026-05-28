import { supabase } from '../supabaseClient';
import type { Ingredients, OrderInput } from '../Types';

export const orderService = {

  async createBurgerOrder(
    totalPrice: number,
    totalCalories: number,
    burgerBase: Ingredients | null,
    burgerIngredients: Ingredients[]
  ) {
    if (!burgerBase) throw new Error("You should select a base for the burger!");

    const fullLayers = [burgerBase, ...burgerIngredients];

    const orderInput: OrderInput = {
      total_price: totalPrice,
      total_calories: totalCalories,
      status: 'PENDING'
    };

    const { data: createdOrder, error: orderError } = await supabase
      .from('orders')
      .insert([orderInput])
      .select('id')
      .single();

    if (orderError || !createdOrder) {
      throw new Error(`The main order failed: ${orderError?.message}`);
    }

    const orderId = createdOrder.id;

    const intermediateRows = fullLayers.map((ingredient, index) => ({
      order_id: orderId,
      ingredient_id: ingredient.id,
      layer_position: index,
      is_base: ingredient.type.includes('base')
    }));

    const { error: ingredientsError } = await supabase
      .from('order_ingredients')
      .insert(intermediateRows);

    if (ingredientsError) {
      throw new Error(`The layer ingredients failed: ${ingredientsError.message}`);
    }

    return { success: true, orderId };
  }
};

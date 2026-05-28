import { supabase } from '../supabaseClient'
import type { OrderInput, Ingredients } from '../Types'
import { useBurgerBuilder } from '../context/BurgerContext';

let ingredients;
let base;
export async function SaveOrder(
    burgerIngredients: Ingredients[]
) {
    ingredients = burgerIngredients;
    base = burgerIngredients[0];
    try {
        const orderInput = getNewOrderInput();
        const { data: createdOrder, error } = await supabase
            .from('orders')
            .insert([orderInput])
            .select()
            .single();

        if (error || !createdOrder) {
            console.error('Error al crear la orden:', error?.message);
            return { success: false, error: error };
        }
    } catch (error) {

    }
}

function getNewOrderInput(): OrderInput {
    const totalPrice = getPriceSummary();
    const totalCalories = getCaloriesSummary();
    const initialStatus = 'PENDING';

    const orderInput: OrderInput = {
        total_price: totalPrice,
        total_calories: totalCalories,
        status: initialStatus
    }

    return orderInput;
}

function getPriceSummary() {
    return ingredients.reduce((sum: number, ing: Ingredients) => sum + ing.price, base.price);
}

function getCaloriesSummary() {
    return ingredients.reduce((sum: number, ing: Ingredients) => sum + ing.calories, base.calories);
}

export default function BurgerBuilder() {
    const { isOrdering, saveBurger, burgerIngredients } = useBurgerBuilder();
    return (
        <div>
            <h1 className="title">Gourmet Burger Builder</h1>
            <div className="order-actions">
                <button className="btn-order"
                    disabled={isOrdering || burgerIngredients.length == 0}
                    onClick={() => saveBurger()}
                >
                    <span className="btn-text-main">Place Order!</span>
                    <span className="btn-text-sub">
                        Your customed burger is one click of distance.
                    </span>
                </button>
            </div>
        </div>

    );
}
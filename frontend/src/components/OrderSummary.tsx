import type { Ingredients } from '../Types';

export default function OrderSummary({ burgerBase, ingredients }) {
    const [basePrice, baseCalories] = burgerBase ? [burgerBase.price, burgerBase.calories] : [0, 0];
    const totalPrice = ingredients.reduce((sum, ing) => sum + ing.price, basePrice);
    const ingredientsToMap: Ingredients[] = [...ingredients];
    const totalCalories = ingredients.reduce((sum, ing) => sum + ing.calories, baseCalories);

    const getChefBadge = (ingredients: Ingredients[], totalCalories: number) => {
        const hasMeat = ingredients.some((ing) => ing.type === 'meat');
        const isVeggie = !hasMeat;

        if (isVeggie && totalCalories < 800) {
            return {
                text: '🌱 Veggie Choice',
                bg: '#d4edda',
                color: '#155724',
            };
        }

        if (!isVeggie) {
            if (totalCalories > 800) {
                return {
                    text: '🚨 Heart Attack',
                    bg: '#f8d7da',
                    color: '#721c24',
                };
            } else {
                return {
                    text: '🥩 Meat Lover',
                    bg: '#f8d7da',
                    color: '#721c24',
                };
            }
        }
        return {
            text: '🍔 Gourmet Standard',
            bg: '#fff3cd',
            color: '#856404',
        };
    };
    const badge = getChefBadge(ingredients, totalCalories);

    return (
        <div>
            <div>
                {ingredientsToMap.map((ingredient: Ingredients, index: number) => {
                    return (
                        <div>
                            ({index}.- ) {ingredient.name} (${ingredient.price})
                        </div>
                    );
                })}
            </div>
            <div> TOTAL PRICE: {totalPrice}</div>
            <div style={{ border: '5px', backgroundColor: badge.bg }}>
                Type <p style={{ border: '5px', color: badge.color }}>{badge.text}</p>
            </div>
        </div>
    );
}

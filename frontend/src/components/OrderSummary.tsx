import { useBurgerBuilder } from '../context/BurgerContext';
import type { Ingredients } from '../Types';
import './components.css';

export default function OrderSummary({ }) {
    const { totalIngredients, totalPrice, totalCalories} = useBurgerBuilder();

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
    const badge = getChefBadge(totalIngredients, totalCalories);

    return (
        <div className="summary-container">
            <h2 className="summary-title">Summary</h2>
            <div className="summary-badge" style={{ backgroundColor: badge.bg, color: badge.color }}>
                Type: <strong className="badge-text">{badge.text}</strong>
            </div>
            <div className="summary-list">
                {totalIngredients.map((ingredient: Ingredients, index: number) => {
                    return (
                        <div key={ingredient.name + index} className="summary-item">
                            <span className="ingredient-name">
                                {index + 1}. {ingredient.name}
                            </span>
                            <span className="ingredient-price">
                                (${ingredient.price})
                            </span>
                        </div>
                    );
                })}
            </div>
            <div className="summary-total"> Total Price: ${totalPrice.toFixed(2)}</div>
        </div>
    );
}

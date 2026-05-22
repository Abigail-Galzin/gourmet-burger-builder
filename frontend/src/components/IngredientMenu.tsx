import type { Ingredients } from '../Types';
import './components.css';

interface IngredientMenuProps {
    onAddIngredient: (ingredient: Ingredients) => void;
    isOrdering: boolean;
}

export default function IngredientMenu({ onAddIngredient, isOrdering }: IngredientMenuProps) {
    const AVAILABLE_INGREDIENTS: Ingredients[] = [
        {
            id: 'cheddar',
            name: 'Sharp Cheddar',
            price: 1.0,
            calories: 110,
            color: '#FFA500',
            type: 'cheese',
            stock: 10,
            createdAt: new Date(),
        },
    ];

    return (
        <div className="menu-container">
            <h2 className="menu-title">Select your Ingredients:</h2>

            <div className="menu-grid">
                {AVAILABLE_INGREDIENTS.map((ingredient) => (
                    <button
                        key={ingredient.id}
                        className="menu-button"
                        onClick={() => onAddIngredient(ingredient)}
                        disabled={isOrdering}
                    >
                        <span className="ingredient-btn-name">{ingredient.name}</span>
                        <span className="ingredient-btn-price">+${ingredient.price}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

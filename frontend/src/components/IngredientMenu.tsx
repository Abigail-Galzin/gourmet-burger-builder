import type { Ingredients } from '../Types';

interface IngredientMenuProps {
    onAddIngredient: (ingredient: Ingredients) => void;
}

export default function IngredientMenu({ onAddIngredient }: IngredientMenuProps) {
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
            <h2>Select your Ingredients:</h2>
            {AVAILABLE_INGREDIENTS.map((ingredient) => (
                <button
                    key={ingredient.id}
                    onClick={() => onAddIngredient(ingredient)}
                >
                    Add {ingredient.name} (+${ingredient.price})
                </button>
            ))}
        </div>
    );
}

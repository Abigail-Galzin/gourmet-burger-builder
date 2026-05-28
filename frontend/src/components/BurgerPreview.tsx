import type { Ingredients } from "../Types";
import { useBurgerBuilder } from '../context/BurgerContext';
import './components.css';

export default function BurgerPreview({ }) {
    const { removeIngredient, burgerBase, burgerIngredients, isOrdering } = useBurgerBuilder();
    const ingredientsPreview: Ingredients[] = burgerBase
        ? [burgerBase, ...burgerIngredients, burgerBase]
        : [...burgerIngredients];

    return (
        <div className="menu-container">
            <h2 className="summary-title">Burger preview</h2>
            {ingredientsPreview.map((ingredient: Ingredients, index: number) => {
                return (
                    <div
                        className='burger-ingredient-layer'
                        key={index + ingredient.name}
                        style={{ backgroundColor: ingredient.color }}
                    >
                        <span className="text-badge">{ingredient.name + index}</span>
                        <button
                            className="remove-ingredient"
                            onClick={() => removeIngredient(index, ingredientsPreview.length - 1)}
                            disabled={!isOrdering}
                        >
                            <span>X</span>
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

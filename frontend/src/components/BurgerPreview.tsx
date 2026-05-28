import type { Ingredients } from "../Types";
import { useBurgerBuilder } from '../context/BurgerContext';
import './components.css';

export default function BurgerPreview({}){
    const { setBurgerIngredients, burgerBase, burgerIngredients } = useBurgerBuilder();
    const ingredientsToMap: Ingredients[] = burgerBase
        ? [burgerBase, ...burgerIngredients, burgerBase]
        : [...burgerIngredients];

    const delteIngredient = (index : number) => {
        setBurgerIngredients(prevIngredients =>
            prevIngredients.filter((_, ingIndex) => ingIndex !== index)
        );
    }

    return (
        <div className="menu-container">
            <h2 className="summary-title">Burger preview</h2>
            {ingredientsToMap.map((ingredient: Ingredients, index: number) => {
                return (
                    <div
                        className='burger-ingredient-layer'
                        key={index + ingredient.name}
                        style={{ backgroundColor: ingredient.color }}
                    >
                        <span className="text-badge">{ingredient.name}</span>
                        <button
                            className="remove-ingredient"
                            onClick={() => delteIngredient(index)} // Pasa el índice para remover la capa exacta
                        >
                            <span>X</span>
                        </button>
                    </div>
                )
            })}
        </div>
    )
}
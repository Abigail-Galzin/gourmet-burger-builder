import type { Ingredients } from "../Types"
import './components.css'

export default function BurgerPreview({burgerBase, ingredients}){
    const ingredientsToMap: Ingredients[] = burgerBase ? [burgerBase, ...ingredients, burgerBase] : [...ingredients];
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
                    </div>
                )
            })}
        </div>
    )
}
import type { Ingredients } from "../Types"

export default function BurgerPreview({burgerBase, ingredients}){
    const ingredientsToMap: Ingredients[] = burgerBase ? [burgerBase, ...ingredients, burgerBase] : [...ingredients];
    return (
        <div>
            {ingredientsToMap.map((ingredient: Ingredients, index: number) => {
                return (
                    <div
                        key={index + ingredient.name}
                        style={{
                            display: "flex",
                            backgroundColor: ingredient.color,
                            width: '20%',
                            height: '25px',
                            borderRadius: '5px',
                            textAlign: 'center',
                            fontSize: '12px'
                    }}>
                    </div>
                )
            })}
        </div>
    )
}
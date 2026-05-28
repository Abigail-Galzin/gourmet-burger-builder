export interface Ingredients {
    id: string,
    name: string,
    price: number,
    calories: number,
    color: string,
    type: string,
    stock: number,
    createdAt: Date
}

export interface IngredientMenuProps {
    onAddIngredient: (ingredient: Ingredients) => void;
    isOrdering: boolean;
    burgerBase: Ingredients;
    burgerIngredients: Ingredients[];
}

export interface OrderInput {
    total_price: number;
    total_calories: number;
    status: string;
}

export interface OrderIngredientInput {
    order_id: string;
    ingredient_id: string;
    layer_position: number;
}

export interface BurgerContextType {
    burgerIngredients: Ingredients[];
    burgerBase: Ingredients | null;
    addIngredient: (ingredient: Ingredients) => void;
    removeIngredient: (indexToRemove: number, finalIndex: number) => void;
    setIsOrdering: (ordering: boolean) => void;
    isOrdering: boolean;
    saveBurger: () => void;
    resetBurger: () => void;
    totalIngredients: Ingredients[];
    totalCalories: number;
    totalPrice: number;
}

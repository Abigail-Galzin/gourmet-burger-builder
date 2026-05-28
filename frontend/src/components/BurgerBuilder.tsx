import { useBurgerBuilder } from '../context/BurgerContext';

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

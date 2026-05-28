import { useEffect } from 'react';
import { useBurgerBuilder } from '../context/BurgerContext';

export default function BurgerBuilder() {
    const { isOrdering, saveBurger, burgerIngredients, setIsOrdering, resetBurger } = useBurgerBuilder();

    useEffect(() => {
        if (!isOrdering) {
            const timer = setTimeout(() => {
                setIsOrdering(true);
                alert('✅ Success! Enjoy your meal!!');
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, [isOrdering]);
    const showHistoric = () => {
        alert('Feature comming...')
    }

    return (
        <div>
            <h1 className="title">Gourmet Burger Builder</h1>
            <div className="order-actions">
                <button className="btn-order-new"
                    onClick={() => showHistoric()}
                >
                    <span>Historic Request</span>
                </button>
                <button className="btn-order"
                    disabled={!isOrdering || burgerIngredients.length == 0}
                    onClick={() => saveBurger()}
                >
                    <span className="btn-text-main">{isOrdering ? 'Place Order!' : ' 🍔 TOASTING BUNS...'}</span>
                    <span className="btn-text-sub">
                        {isOrdering
                            ? 'Your customed burger is one click of distance.'
                            : `In a few moments you'll receive your burger!`
                        }
                    </span>
                </button>
                <button className="btn-order-new"
                    onClick={() => resetBurger()}
                >
                    <span>Reset Burger</span>
                </button>
            </div>
        </div>
    );
}

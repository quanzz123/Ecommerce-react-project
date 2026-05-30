import { createContext, use, useState,useContext } from "react";


export const CartContext = createContext();

export default function CartProvider({children}) {
    const [cartItems, setCartItems] = useState([]); // {id: 1, quantity: 2}

    function addToCart(productId) {
        // check if product already in cart
        const existingItem = cartItems.find((item) => item.id === productId);
        if(existingItem) {
            // nếu đã có thì tăng số lượng lên 1
            const currentQuantity = existingItem.quantity;
            const updatedCartItems = cartItems.map((item) => 
            item.id === productId ? {...item, quantity: currentQuantity + 1} : item
            );
            setCartItems(updatedCartItems);
            
        } else {
            // nếu chưa có thì thêm mới với số lượng là 1
            setCartItems([...cartItems, {id: productId, quantity: 1}]);
        }
    }
   

    return <CartContext.Provider value={{cartItems, addToCart}}>{children}</CartContext.Provider>
}

export function useCart() {
    const context = useContext(CartContext);
    return context;
}
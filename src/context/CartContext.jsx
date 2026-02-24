import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("tile_cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("tile_cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, quantity = 1, selectedSize = null, selectedColor = null) => {
        const sizeToUse = selectedSize || (product.sizes?.length > 0 ? product.sizes[0] : (product.size || "Standard"));
        const colorToUse = selectedColor || (product.colors?.length > 0 ? product.colors[0] : null);

        setCart((prevCart) => {
            // Unique key is ID + Size + Color
            const existingItem = prevCart.find(
                (item) => item._id === product._id &&
                    item.selectedSize === sizeToUse &&
                    item.selectedColor === colorToUse
            );

            if (existingItem) {
                return prevCart.map((item) =>
                    item._id === product._id &&
                        item.selectedSize === sizeToUse &&
                        item.selectedColor === colorToUse
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...prevCart, { ...product, quantity, selectedSize: sizeToUse, selectedColor: colorToUse }];
        });
    };

    const updateQuantity = (productId, selectedSize, selectedColor, newQuantity) => {
        if (newQuantity < 1) return;
        setCart((prevCart) =>
            prevCart.map((item) =>
                item._id === productId &&
                    item.selectedSize === selectedSize &&
                    item.selectedColor === selectedColor
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const removeFromCart = (productId, selectedSize, selectedColor) => {
        setCart((prevCart) =>
            prevCart.filter((item) => !(
                item._id === productId &&
                item.selectedSize === selectedSize &&
                item.selectedColor === selectedColor
            ))
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            updateQuantity,
            removeFromCart,
            clearCart,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};

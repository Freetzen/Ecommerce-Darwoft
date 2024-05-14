const localStorageProvider = {

    getToken(){
        const token = localStorage.getItem("token");
        return token
    },
    getCart(){
        const cart = localStorage.getItem("cart");
        return cart
    },
    setToken(userToken){
        const token = localStorage.setItem("token", userToken);
        return token
    },
    setCart(userCart){
        const cart = localStorage.setItem("cart", userCart);
        return cart
    },
    deleteToken(){
        const token = localStorage.removeItem("token");
        return token
    },
    deleteCart(){
        const cart = localStorage.removeItem("cart");
        return cart
    }

}

export default localStorageProvider
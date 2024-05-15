import Guitar from "./componets/Guitar"
import Header from "./componets/Headers"
import { useState,useEffect } from "react"
import { db } from "./data/db"

function App() {

    const initialCart = () =>{
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [datosDb] = useState(db)
    const [cart, setCart] = useState(initialCart)

    const MAX_ITEM = 5
    const MIN_ITEM = 1

    useEffect( () => {
        localStorage.setItem('cart', JSON.stringify(cart))
    },[cart])

    function addToCard(item) {

        const itemExiste = cart.findIndex((guitarra) => guitarra.id === item.id)
        if (itemExiste >= 0) {//que existe en elcarrito
            if (cart[itemExiste].cantidad >= MAX_ITEM)
                return // si esta condicion se cumple no retorna nada sino sigue lo de abajo
            const updateCard = [...cart]
            updateCard[itemExiste].cantidad++
            setCart(updateCard)
        } else {
            item.cantidad = 1
            console.log("no existe")
            setCart([...cart, item]);
        }
        //una vez q se termina guarda el carrito en el localStorage
        // 
        saveLocalStorage()
    }
    function removeFromCart(id) {
        setCart(prevCart => prevCart.filter(guitarra => guitarra.id !== id))
    }
    function increaseQuantity(id) {
        const carritoActualizado = cart.map(item => {
            if (item.id === id && item.cantidad < MAX_ITEM) {
                return {
                    ...item, cantidad: item.cantidad + 1
                }
            }
            return item
        })
        
    }
    function decrementarCantidades(id) {
        const carritoActualizado = cart.map(item => {
            if (item.cantidad > MIN_ITEM && item.id === id) {
                // tomo todo lo idem y a los que son iguales le resto 1
                return { ...item, cantidad: item.cantidad - 1 }
            }
            return item
        })
        setCart(carritoActualizado)
    }

    function limpiarCarrito(){
        setCart([])
    }

   


    return (
        <>
            <Header
                cart={cart}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decrementarCantidades={decrementarCantidades}
                limpiarCarrito={limpiarCarrito}

            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {datosDb.map((guitar) => (
                        <Guitar
                            key={guitar.id}
                            guitar={guitar}
                            cart={cart}
                            setCart={setCart}
                            addToCard={addToCard}
                        />
                    )
                    )}




                </div>
            </main>


            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
                </div>
            </footer>


        </>
    )
}

export default App

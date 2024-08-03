import {useEffect, useState} from "react"
import './App.css'
import Header from './components/Header'
import Guitar from './components/Guitar'
import { db } from './data/db'

function App() {

  // Comprobar si hay datos en localStorage para definir el state inicial del carrito
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    localStorageCart ? JSON.parse(localStorageCart) : []
  }

  //State
  const [data, setData] = useState([])
  const [cart, setCart] = useState([initialCart])

  // Número mínimo y máximo del mismo elemento en el carrito
  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  /**
   * Almacenar información del carrito en LocalStorage
   * Como el state es asíncrono, de utiliza useEffect
   * Actualiza el localStorage cuando detecta cambios en cart
   */
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    setData(db)
  }, [])

  /**
   * Función para añadir items al carrito controlando duplicados y cantidad 
   * Utiliza setCart
   * @Guitar Componente guitarra como ítem
   */
  function addToCart(item){

    /** findIndex retorna el indice del elemento si lo encuentra o -1 si no lo encuentra */
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id)
    if(itemExists >= 0){
      if(cart[itemExists].quantity >= MAX_ITEMS) return
      // Si el item ya existe, aumentar su quantity sin modificar state directamente creando copia del actual
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    } else {
      item.quantity = 1
      setCart(() => [...cart, item])
    }
  }

  /**
   * Función para eliminar items del carrito
   * Utiliza array method .filter()
   */
  function removeFromCart(id){
    setCart((prevCart) => prevCart.filter(guitar => guitar.id !== id))
  }

  /**
   * Función para incrementar la cantidad de items del carrito.
   * Utiliza .map() para retornar el state modificado
   */
  function incrementItemCart(id){
    const updatedCart = cart.map((guitar)=>{
      if(guitar.id === id && guitar.quantity < MAX_ITEMS){
        return {
          ...guitar,
          quantity: guitar.quantity + 1
        }
      }
      return guitar
    })
    setCart(updatedCart)
  }

  /**
   * Función para decrementar cantidades de un elemento en el carrito.
   * Utiliza .map() para retornar el state modificado
   */
  function decreaseItemCart(id){
    const updatedCart = cart.map((guitar) => {
      if(guitar.id === id && guitar.quantity > MIN_ITEMS){
        return {
          ...guitar,
          quantity: guitar.quantity - 1
        }
      }
      return guitar
    })
    setCart(updatedCart)
  }

  /**
   * Función para vaciar el carrito.
   */
  function clearCart(){
    setCart([])
  }

  return (
    <>
    <Header
      cart={cart}
      removeFromCart={removeFromCart}
      incrementItemCart={incrementItemCart}
      decreaseItemCart={decreaseItemCart}
      clearCart={clearCart}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              /** Se pasa la función como prop, el state cart se inluye por defecto */
              // setCart={setCart}
              addToCart={addToCart}
            />
          ))}
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

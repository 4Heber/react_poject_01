import {useEffect, useState, useMemo} from "react"
import { db } from '../data/db'

export const useCart = () =>{

    // Comprobar si hay datos en localStorage para definir el state inicial del carrito
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  //State
  const [data, setData] = useState([])
  const [cart, setCart] = useState(initialCart)

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

  // State Derivado isEmpty - Función que depende del state principal de cart para evitar usar lógica dentro del template
    // Hook useMemo(Factory:lógica a ejecutar, deps:array de dependencias) mejora el performance al renderizar solo si hay cambios en deps
    const isEmpty = useMemo( () => cart.length === 0, [cart])
    // .reduce( (total, item) => {}, initialValue)
    const cartTotal = () => cart.reduce((total, item) => total + (item.quantity * item.price), 0)

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    decreaseItemCart,
    incrementItemCart,
    clearCart,
    isEmpty,
    cartTotal
  }
}
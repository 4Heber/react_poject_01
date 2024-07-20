import {useEffect, useState} from "react"
import './App.css'
import Header from './components/Header'
import Guitar from './components/Guitar'
import { db } from './data/db'

function App() {

  //State
  const [data, setData] = useState([])
  const [cart, setCart] = useState([])

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
      // Si el item ya existe, aumentar su quantity sin modificar state directamente creando copia del actual
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    } else {
      item.quantity = 1
      setCart(() => [...cart, item])
    }
  }

  return (
    <>
    <Header />

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

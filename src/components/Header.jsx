import {useMemo} from 'react'

export default function Header({ cart, removeFromCart, incrementItemCart, decreaseItemCart, clearCart }){

    // State Derivado isEmpty - Función que depende del state principal de cart para evitar usar lógica dentro del template
    // Hook useMemo(Factory:lógica a ejecutar, deps:array de dependencias) mejora el performance al renderizar solo si hay cambios en deps
    const isEmpty = useMemo( () => cart.length === 0, [cart])
    // .reduce( (total, item) => {}, initialValue)
    const cartTotal = () => cart.reduce((total, item) => total + (item.quantity * item.price), 0)

    return(
        <header className="py-5 header">
        <div className="container-xl">
            <div className="row justify-content-center justify-content-md-between">
                <div className="col-8 col-md-3">
                    <a href="index.html">
                        <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                    </a>
                </div>
                <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                    <div 
                        className="carrito"
                    >
                        <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                        <div id="carrito" className="bg-white p-3">
                            {/* Operador ternario para agregar condicional en jsx */}
                            {isEmpty ? (
                                <p className="text-center">El carrito esta vacio</p>
                            ) : (
                            <>
                                <table className="w-100 table">
                                    <thead>
                                        <tr>
                                            <th>Imagen</th>
                                            <th>Nombre</th>
                                            <th>Precio</th>
                                            <th>Cantidad</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map( guitar => (
                                            <tr key={guitar.id}>
                                                <td>
                                                    <img
                                                        className="img-fluid"
                                                        src={`/img/${guitar.image}.jpg`}
                                                        alt="imagen guitarra"
                                                    />
                                                </td>
                                                <td>{guitar.name}</td>
                                                <td className="fw-bold">
                                                    ${guitar.price}
                                                </td>
                                                <td className="flex align-items-start gap-4">
                                                    <button
                                                        type="button"
                                                        className="btn btn-dark"
                                                        onClick={()=>decreaseItemCart(guitar.id)}
                                                    >
                                                        -
                                                    </button>
                                                        {guitar.quantity}
                                                    <button
                                                        type="button"
                                                        className="btn btn-dark"
                                                        onClick={() => incrementItemCart(guitar.id)}
                                                    >
                                                        +
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger"
                                                        type="button"
                                                        onClick={()=>removeFromCart(guitar.id)}
                                                    >
                                                        X
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p className="text-end">Total pagar: <span className="fw-bold">${cartTotal()}</span></p>
                            </>
                        )}
                            <button
                                className="btn btn-dark w-100 mt-3 p-2"
                                onClick={clearCart}
                            >Vaciar Carrito</button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>
    )
}
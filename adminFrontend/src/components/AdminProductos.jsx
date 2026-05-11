import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminProductos.css';

const AdminProductos = () => {

    const [sedes, setSedes] = useState([]);
    const [locales, setLocales] = useState([]);
    const [sedeSeleccionada, setSedeSeleccionada] = useState('');
    const [localSeleccionado, setLocalSeleccionado] = useState('');
    const [nombre, setNombre] = useState('');
    const [stock, setStock] = useState('');
    const [precio, setPrecio] = useState('');
    const [error, setError] = useState('');
    const [exito, setExito] = useState('');

    const API_BASE_URL = "http://localhost:8080/api";

    useEffect(() => {
        axios.get(`${API_BASE_URL}/campus`)
            .then(response => setSedes(response.data))
            .catch(() => setError("Error al conectar con el servidor Spring Boot."));
    }, []);

    useEffect(() => {
        if (sedeSeleccionada) {
            axios.get(`${API_BASE_URL}/locales/campus/${sedeSeleccionada}`)
                .then(response => {
                    setLocales(response.data);
                    setLocalSeleccionado('');
                })
                .catch(() => setError("Error al cargar los locales."));
        } else {
            setLocales([]);
        }
    }, [sedeSeleccionada]);

    const guardarProducto = async (e) => {
        e.preventDefault();
        setError('');
        setExito('');

        const nuevoProducto = {
            nombre: nombre,
            stock: parseInt(stock, 10),
            precio: parseFloat(precio),
            localId: parseInt(localSeleccionado, 10)
        };

        try {
            const response = await axios.post(`${API_BASE_URL}/productos`, nuevoProducto);
            setExito(`Producto "${response.data.nombre}" creado exitosamente.`);
            setNombre(''); setStock(''); setPrecio('');
        } catch (err) {
            if (err.response && err.response.data) {
                setError(`VALIDACIÓN BACK-END: ${err.response.data}`);
            } else {
                setError("Error de red. El servidor backend no responde.");
            }
        }
    };

    return (
        <main className="admin-container">

            <header className="admin-header">
                <h2>Administración UdlaEats (Core)</h2>
            </header>

            {error && <output className="alert alert-error" role="alert">{error}</output>}
            {exito && <output className="alert alert-success" role="status">{exito}</output>}

            <form onSubmit={guardarProducto}>

                <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>

                    <section className="form-group">
                        <label className="form-label" htmlFor="sede-select">1. Seleccione Sede (Campus):</label>
                        <select
                            id="sede-select"
                            className="form-control"
                            value={sedeSeleccionada}
                            onChange={(e) => setSedeSeleccionada(e.target.value)}
                            required
                        >
                            <option value="">-- Elija una Sede --</option>
                            {sedes.map(s => <option key={s.id} value={s.id}>{s.nombre}</option>)}
                        </select>
                    </section>

                    <section className="form-group">
                        <label className="form-label" htmlFor="local-select">2. Seleccione Local (Llave Foránea):</label>
                        <select
                            id="local-select"
                            className="form-control"
                            value={localSeleccionado}
                            onChange={(e) => setLocalSeleccionado(e.target.value)}
                            disabled={!sedeSeleccionada}
                            required
                        >
                            <option value="">-- Elija el Local --</option>
                            {locales.map(l => <option key={l.id} value={l.id}>{l.nombre}</option>)}
                        </select>
                    </section>

                    <section className="form-group">
                        <label className="form-label" htmlFor="input-nombre">Nombre del Producto:</label>
                        <input
                            id="input-nombre"
                            type="text"
                            className="form-control"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </section>

                    <section className="form-group">
                        <label className="form-label" htmlFor="input-stock">Stock (Dato Crítico):</label>
                        <input
                            id="input-stock"
                            type="number"
                            className="form-control"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            required
                        />
                    </section>

                    <section className="form-group">
                        <label className="form-label" htmlFor="input-precio">Precio:</label>
                        <input
                            id="input-precio"
                            type="number"
                            step="0.01"
                            className="form-control"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                            required
                        />
                    </section>

                </fieldset>

                <button type="submit" className="btn-submit">
                    REGISTRAR EN EL CORE
                </button>

            </form>
        </main>
    );
};

export default AdminProductos;
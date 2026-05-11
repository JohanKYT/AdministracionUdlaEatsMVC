package com.example.adminBackendUE.services;

import com.example.adminBackendUE.DTOmodels.ProductoDTO;
import com.example.adminBackendUE.models.Local;
import com.example.adminBackendUE.models.Producto;
import com.example.adminBackendUE.repositories.LocalRepository;
import com.example.adminBackendUE.repositories.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private LocalRepository localRepository;

    public Producto crearProducto(ProductoDTO dto) {
        if (dto.getStock() < 0) {
            throw new IllegalArgumentException("Error Crítico: El stock no puede ser negativo. Esto corrompe el Predictive Habit Engine.");
        }
        if (dto.getPrecio() <= 0) {
            throw new IllegalArgumentException("El precio debe ser mayor a cero.");
        }
        Local local = localRepository.findById(dto.getLocalId())
                .orElseThrow(() -> new IllegalArgumentException("El Local especificado no existe."));

        Producto producto = new Producto();
        producto.setNombre(dto.getNombre());
        producto.setStock(dto.getStock());
        producto.setPrecio(dto.getPrecio());
        producto.setLocal(local);

        return productoRepository.save(producto);
    }
}
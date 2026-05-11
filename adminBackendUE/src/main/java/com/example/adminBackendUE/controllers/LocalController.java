package com.example.adminBackendUE.controllers;
import com.example.adminBackendUE.models.Campus;
import com.example.adminBackendUE.models.Local;
import com.example.adminBackendUE.repositories.CampusRepository;
import com.example.adminBackendUE.repositories.LocalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Conexion con React
public class LocalController {

    @Autowired
    private CampusRepository campusRepository;

    @Autowired
    private LocalRepository localRepository;

    @GetMapping("/campus")
    public ResponseEntity<List<Campus>> getAllCampus() {
        return ResponseEntity.ok(campusRepository.findAll());
    }

    @GetMapping("/locales/campus/{campusId}")
    public ResponseEntity<List<Local>> getLocalesByCampus(@PathVariable Long campusId) {
        List<Local> locales = localRepository.findByCampusId(campusId);
        return ResponseEntity.ok(locales);
    }
}
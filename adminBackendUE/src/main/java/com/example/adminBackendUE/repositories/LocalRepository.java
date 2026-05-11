package com.example.adminBackendUE.repositories;

import com.example.adminBackendUE.models.Local;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LocalRepository extends JpaRepository<Local, Long> {
    List<Local> findByCampusId(Long campusId);
}

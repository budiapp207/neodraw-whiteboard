package com.example.drawingweb.repository;

import com.example.drawingweb.entity.Drawing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DrawingRepository extends JpaRepository<Drawing, Long> {
}

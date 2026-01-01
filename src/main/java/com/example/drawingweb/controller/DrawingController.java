package com.example.drawingweb.controller;

import com.example.drawingweb.entity.Drawing;
import com.example.drawingweb.repository.DrawingRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drawings")
@CrossOrigin
public class DrawingController {

    private final DrawingRepository drawingRepository;

    public DrawingController(DrawingRepository drawingRepository) {
        this.drawingRepository = drawingRepository;
    }

    // SAVE
    @PostMapping("/save")
    public String saveDrawing(@RequestBody String imageData) {
        Drawing drawing = new Drawing();
        drawing.setImageData(imageData);
        drawing.setCreatedAt(java.time.LocalDateTime.now().toString());

        drawingRepository.save(drawing);
        return "saved";
    }

    // GET ALL
    @GetMapping
    public List<Drawing> getAllDrawings() {
        return drawingRepository.findAll();
    }
}

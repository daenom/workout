package com.daenom.workout.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daenom.workout.dto.programDay.CreateProgramDayRequest;
import com.daenom.workout.dto.programDay.ProgramDayResponse;
import com.daenom.workout.service.ProgramDayService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/program-days")
@RequiredArgsConstructor
public class ProgramDayController {
    private final ProgramDayService programDayService;
    
    @PostMapping()
    public ProgramDayResponse createProgramDay(@RequestBody CreateProgramDayRequest request) {
        return programDayService.createProgramDay(request);
    }

    @GetMapping("/program/{programId}")
    public List<ProgramDayResponse> getProgramDay(@PathVariable Long programId) {
        return programDayService.getProgramDaysByProgramId(programId);
    }

    @GetMapping("/{id}")
    public ProgramDayResponse getProgramDayById(@PathVariable Long id) {
        return programDayService.getProgramDayById(id);
    }

    @PutMapping("/{id}")
    public ProgramDayResponse updateProgramDay(@PathVariable Long id, @RequestBody CreateProgramDayRequest request) {
        return programDayService.updateProgramDay(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteProgramDay(@PathVariable Long id) {
        programDayService.deleteProgramDay(id);
    }
}

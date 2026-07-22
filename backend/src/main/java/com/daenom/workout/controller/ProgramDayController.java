package com.daenom.workout.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daenom.workout.dto.programDay.CreateProgramDayRequest;
import com.daenom.workout.dto.programDay.ProgramDayResponse;
import com.daenom.workout.entity.ProgramDay;
import com.daenom.workout.mapper.ProgramDayMapper;
import com.daenom.workout.service.ProgramDayService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/program-days")
@RequiredArgsConstructor
public class ProgramDayController {
    private final ProgramDayService programDayService;
    private final ProgramDayMapper programDayMapper;
    
    // @PostMapping()
    // public ProgramDayResponse createProgramDay(@RequestBody CreateProgramDayRequest request) {
    //     ProgramDay programDay = programDayService.createProgramDay(request);
    //     return programDayMapper.toResponse(programDay);
    // }

    @GetMapping("/program/{programId}")
    public List<ProgramDayResponse> getProgramDay(@PathVariable Long programId) {
        return programDayService.getProgramDaysByProgramId(programId).stream()
                .map(programDayMapper::toResponse)
                .toList();
    }

    @GetMapping("/{id}")
    public ProgramDayResponse getProgramDayById(@PathVariable Long id) {
        ProgramDay programDay = programDayService.getProgramDayById(id);
        return programDayMapper.toResponse(programDay);
    }

    @PutMapping("/{id}")
    public ProgramDayResponse updateProgramDay(@PathVariable Long id, @RequestBody CreateProgramDayRequest request) {
        ProgramDay programDay = programDayService.updateProgramDay(id, request);
        return programDayMapper.toResponse(programDay);
    }

    @DeleteMapping("/{id}")
    public void deleteProgramDay(@PathVariable Long id) {
        programDayService.deleteProgramDay(id);
    }
}

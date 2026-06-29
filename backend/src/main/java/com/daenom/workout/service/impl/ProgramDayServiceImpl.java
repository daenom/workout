package com.daenom.workout.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.daenom.workout.dto.programDay.CreateProgramDayRequest;
import com.daenom.workout.dto.programDay.ProgramDayResponse;
import com.daenom.workout.entity.ProgramDay;
import com.daenom.workout.exception.ResourceNotFoundException;
import com.daenom.workout.mapper.ProgramDayMapper;
import com.daenom.workout.repository.ProgramDayRepository;
import com.daenom.workout.service.ProgramDayService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProgramDayServiceImpl implements ProgramDayService {
    private final ProgramDayRepository programDayRepository;
    private final ProgramDayMapper programDayMapper;

    @Override
    public ProgramDayResponse createProgramDay(CreateProgramDayRequest request) {
        ProgramDay programDay = programDayMapper.toEntity(request);
        programDay = programDayRepository.save(programDay);
        return programDayMapper.toResponse(programDay);
    }

    @Override
    public
    List<ProgramDayResponse> getProgramDaysByProgramId(Long programId) {
        List<ProgramDay> programDays = programDayRepository.findAllByProgramIdOrderByOrderIndexAsc(programId);
        return programDays.stream()
                .map(programDayMapper::toResponse)
                .toList();
    }

    @Override
    public ProgramDayResponse getProgramDayById(Long id) {
        ProgramDay programDay = programDayRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ProgramDay not found with id: " + id));
        return programDayMapper.toResponse(programDay);
    }

    @Override
    public ProgramDayResponse updateProgramDay(Long id, CreateProgramDayRequest request) {
        ProgramDay existingProgramDay = programDayRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ProgramDay not found with id: " + id));
        existingProgramDay.setName(request.name());
        existingProgramDay.setDescription(request.description());
        existingProgramDay.setProgramDayType(request.programDayType());
        existingProgramDay.setOrderIndex(request.orderIndex()); 
        ProgramDay updatedProgramDay = programDayRepository.save(existingProgramDay);
        return programDayMapper.toResponse(updatedProgramDay);
    }

    @Override
    public void deleteProgramDay(Long id) {
        ProgramDay programDay = programDayRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ProgramDay not found with id: " + id));
        programDayRepository.delete(programDay);
    }
}

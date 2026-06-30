package com.daenom.workout.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.daenom.workout.dto.programDay.CreateProgramDayRequest;
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
    public ProgramDay createProgramDay(CreateProgramDayRequest request) {
        ProgramDay programDay = programDayMapper.toEntity(request);
        return programDayRepository.save(programDay);
    }

    @Override
    public
    List<ProgramDay> getProgramDaysByProgramId(Long programId) {
        return programDayRepository.findAllByProgramIdOrderByOrderIndexAsc(programId);
    }

    @Override
    public ProgramDay getProgramDayById(Long id) {
        return programDayRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ProgramDay not found with id: " + id));
    }

    @Override
    public ProgramDay updateProgramDay(Long id, CreateProgramDayRequest request) {
        ProgramDay existingProgramDay = programDayRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ProgramDay not found with id: " + id));
        existingProgramDay.setName(request.name());
        existingProgramDay.setDescription(request.description());
        existingProgramDay.setProgramDayType(request.programDayType());
        existingProgramDay.setOrderIndex(request.orderIndex()); 
        return programDayRepository.save(existingProgramDay);
    }

    @Override
    public void deleteProgramDay(Long id) {
        ProgramDay programDay = programDayRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ProgramDay not found with id: " + id));
        programDayRepository.delete(programDay);
    }
}

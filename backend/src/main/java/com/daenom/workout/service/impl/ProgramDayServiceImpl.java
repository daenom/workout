package com.daenom.workout.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.daenom.workout.dto.programDay.CreateProgramDayRequest;
import com.daenom.workout.dto.programDay.ProgramDayDetails;
import com.daenom.workout.dto.programDayExercise.CreateProgramDayExerciseRequest;
import com.daenom.workout.entity.ProgramDay;
import com.daenom.workout.entity.ProgramDayExercise;
import com.daenom.workout.exception.ResourceNotFoundException;
import com.daenom.workout.mapper.ProgramDayMapper;
import com.daenom.workout.repository.ProgramDayRepository;
import com.daenom.workout.service.ProgramDayExerciseService;
import com.daenom.workout.service.ProgramDayService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProgramDayServiceImpl implements ProgramDayService {
    private final ProgramDayRepository programDayRepository;
    private final ProgramDayMapper programDayMapper;

    private final ProgramDayExerciseService programDayExerciseService;

    @Override
    public ProgramDay createProgramDay(CreateProgramDayRequest request, Long programId) {
        ProgramDay programDay = programDayMapper.toEntity(request, programId);
        ProgramDay savedDay = programDayRepository.save(programDay);

        for(CreateProgramDayExerciseRequest exerciseRequest : request.exercises()) {
            programDayExerciseService.createProgramDayExercise(exerciseRequest, savedDay.getId());
        }
        return savedDay;
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

    @Override
    public List<ProgramDayDetails> getProgramDayDetailsByProgramId(Long ProgramId) {
        List<ProgramDay> programDays = programDayRepository.findAllByProgramId(ProgramId);

        List<ProgramDayDetails> programDayDetailsList = new ArrayList<>();

        for(ProgramDay programDay : programDays) {
            List<ProgramDayExercise> exercises = programDayExerciseService.getProgramDayExercises(programDay.getId());
            ProgramDayDetails programDayDetails = new ProgramDayDetails(programDay, exercises);
            programDayDetailsList.add(programDayDetails);
        }
        
        return programDayDetailsList;
    }

    @Override
    public void deleteProgramDaysByProgramId(Long programId) {
        List<ProgramDay> programDays = programDayRepository.findAllByProgramId(programId);
        for (ProgramDay programDay : programDays) {
            programDayExerciseService.deleteProgramDayExercisesByProgramDayId(programDay.getId());
            programDayRepository.delete(programDay);
        }
    }
}

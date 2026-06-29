package com.daenom.workout.service;

import java.util.List;

import com.daenom.workout.dto.programDay.CreateProgramDayRequest;
import com.daenom.workout.dto.programDay.ProgramDayResponse;

public interface ProgramDayService {
    ProgramDayResponse createProgramDay(CreateProgramDayRequest request);

    List<ProgramDayResponse> getProgramDaysByProgramId(Long programId);

    ProgramDayResponse getProgramDayById(Long id);

    ProgramDayResponse updateProgramDay(Long id, CreateProgramDayRequest request);

    void deleteProgramDay(Long id);
}

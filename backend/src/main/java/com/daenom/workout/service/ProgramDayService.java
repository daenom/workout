package com.daenom.workout.service;

import java.util.List;

import com.daenom.workout.dto.programDay.CreateProgramDayRequest;
import com.daenom.workout.dto.programDay.ProgramDayDetails;
import com.daenom.workout.entity.ProgramDay;

public interface ProgramDayService {
    ProgramDay createProgramDay(CreateProgramDayRequest request, Long programId);

    List<ProgramDay> getProgramDaysByProgramId(Long programId);

    ProgramDay getProgramDayById(Long id);

    ProgramDay updateProgramDay(Long id, CreateProgramDayRequest request);

    void deleteProgramDay(Long id);

    List<ProgramDayDetails> getProgramDayDetailsByProgramId(Long ProgramId);

    void deleteProgramDaysByProgramId(Long programId);
}

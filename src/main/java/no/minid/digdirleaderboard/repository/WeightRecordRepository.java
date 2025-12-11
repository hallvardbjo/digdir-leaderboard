package no.minid.digdirleaderboard.repository;

import no.minid.digdirleaderboard.domain.WeightRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WeightRecordRepository extends JpaRepository<WeightRecord, Long> {
    List<WeightRecord> findByExerciseTypeOrderByWeightDesc(String exerciseType);
}


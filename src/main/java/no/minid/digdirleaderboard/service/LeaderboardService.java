package no.minid.digdirleaderboard.service;

import lombok.RequiredArgsConstructor;
import no.minid.digdirleaderboard.domain.WeightRecord;
import no.minid.digdirleaderboard.exception.ResourceNotFoundException;
import no.minid.digdirleaderboard.repository.WeightRecordRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LeaderboardService {

    private final WeightRecordRepository weightRecordRepository;
    private static final List<String> VALID_EXERCISE_TYPES = Arrays.asList("bench", "deadlift", "squat");

    public List<WeightRecord> getWeightRecordsByExerciseType(String exerciseType) {
        validateExerciseType(exerciseType);
        return weightRecordRepository.findByExerciseTypeOrderByWeightDesc(exerciseType);
    }

    public WeightRecord addWeightRecord(String name, double weight, String exerciseType) {
        validateWeightRecord(name, weight, exerciseType);
        WeightRecord record = new WeightRecord(name, weight, exerciseType);
        return weightRecordRepository.save(record);
    }

    public WeightRecord updateWeightRecord(Long id, String name, double weight, String exerciseType) {
        validateWeightRecord(name, weight, exerciseType);
        WeightRecord record = weightRecordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Weight record not found with id: " + id));
        record.setName(name);
        record.setWeight(weight);
        record.setExerciseType(exerciseType);
        return weightRecordRepository.save(record);
    }

    public void deleteWeightRecord(Long id) {
        if (!weightRecordRepository.existsById(id)) {
            throw new ResourceNotFoundException("Weight record not found with id: " + id);
        }
        weightRecordRepository.deleteById(id);
    }

    public List<WeightRecord> getAllRecords() {
        return weightRecordRepository.findAll();
    }

    private void validateExerciseType(String exerciseType) {
        if (exerciseType == null || exerciseType.trim().isEmpty()) {
            throw new IllegalArgumentException("Exercise type cannot be empty");
        }
        if (!VALID_EXERCISE_TYPES.contains(exerciseType.toLowerCase())) {
            throw new IllegalArgumentException("Invalid exercise type. Must be one of: bench, deadlift, squat");
        }
    }

    private void validateWeightRecord(String name, double weight, String exerciseType) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty");
        }
        if (weight <= 0) {
            throw new IllegalArgumentException("Weight must be greater than 0");
        }
        validateExerciseType(exerciseType);
    }
}

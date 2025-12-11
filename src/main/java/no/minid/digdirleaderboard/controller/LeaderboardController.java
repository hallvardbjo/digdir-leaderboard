package no.minid.digdirleaderboard.controller;

import lombok.RequiredArgsConstructor;
import no.minid.digdirleaderboard.service.LeaderboardService;
import no.minid.digdirleaderboard.domain.WeightRecord;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/leaderboard")
@RequiredArgsConstructor
@CrossOrigin
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    @GetMapping("/bench")
    public ResponseEntity<List<WeightRecord>> getBench() {
        List<WeightRecord> leaderboardData = leaderboardService.getWeightRecordsByExerciseType("bench");
        return ResponseEntity.ok(leaderboardData);
    }

    @GetMapping("/deadlift")
    public ResponseEntity<List<WeightRecord>> getDeadlift() {
        List<WeightRecord> leaderboardData = leaderboardService.getWeightRecordsByExerciseType("deadlift");
        return ResponseEntity.ok(leaderboardData);
    }

    @GetMapping("/squat")
    public ResponseEntity<List<WeightRecord>> getSquat() {
        List<WeightRecord> leaderboardData = leaderboardService.getWeightRecordsByExerciseType("squat");
        return ResponseEntity.ok(leaderboardData);
    }

    @PostMapping("/record")
    public ResponseEntity<WeightRecord> addRecord(@RequestBody WeightRecordRequest request) {
        WeightRecord record = leaderboardService.addWeightRecord(
                request.getName(),
                request.getWeight(),
                request.getExerciseType()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(record);
    }

    @PutMapping("/record/{id}")
    public ResponseEntity<WeightRecord> updateRecord(
            @PathVariable Long id,
            @RequestBody WeightRecordRequest request) {
        WeightRecord record = leaderboardService.updateWeightRecord(
                id,
                request.getName(),
                request.getWeight(),
                request.getExerciseType()
        );
        return ResponseEntity.ok(record);
    }

    @DeleteMapping("/record/{id}")
    public ResponseEntity<Void> deleteRecord(@PathVariable Long id) {
        leaderboardService.deleteWeightRecord(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/records")
    public ResponseEntity<List<WeightRecord>> getAllRecords() {
        List<WeightRecord> records = leaderboardService.getAllRecords();
        return ResponseEntity.ok(records);
    }
}

package no.minid.digdirleaderboard.controller;

import lombok.RequiredArgsConstructor;
import no.minid.digdirleaderboard.service.LeaderboardService;
import no.minid.digdirleaderboard.domain.WeightRecord;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/leaderboard")
@RequiredArgsConstructor
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    @GetMapping("/bench")
    public ResponseEntity<List<WeightRecord>> getBench() {
        List<WeightRecord> leaderboardData = leaderboardService.getWeigthRecords("/data/bench.txt");
        return ResponseEntity.ok(leaderboardData);
    }

    @GetMapping("/deadlift")
    public ResponseEntity<List<WeightRecord>> getDeadlift() {
        List<WeightRecord> leaderboardData = leaderboardService.getWeigthRecords("/data/deadlift.txt");
        return ResponseEntity.ok(leaderboardData);
    }

    @GetMapping("/squat")
    public ResponseEntity<List<WeightRecord>> getSquat() {
        List<WeightRecord> leaderboardData = leaderboardService.getWeigthRecords("/data/squat.txt");
        return ResponseEntity.ok(leaderboardData);
    }
}

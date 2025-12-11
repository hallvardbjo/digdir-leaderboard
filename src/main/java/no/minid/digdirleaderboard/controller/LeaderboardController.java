package no.minid.digdirleaderboard.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/leaderboard")
public class LeaderboardController {

    @GetMapping("/list")
    public ResponseEntity<String> getLeaderboard() {
        // Placeholder implementation
        String leaderboardData = "Leaderboard data goes here";
        return ResponseEntity.ok(leaderboardData);
    }
}

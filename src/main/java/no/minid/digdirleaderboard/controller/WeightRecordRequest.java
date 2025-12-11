package no.minid.digdirleaderboard.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WeightRecordRequest {
    private String name;
    private double weight;
    private String exerciseType; // bench, deadlift, squat
}


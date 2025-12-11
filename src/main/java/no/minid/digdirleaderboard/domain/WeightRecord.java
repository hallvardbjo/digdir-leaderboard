package no.minid.digdirleaderboard.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "weight_records")
public class WeightRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private double weight;

    @Column(name = "exercise_type")
    private String exerciseType; // bench, deadlift, squat

    public WeightRecord(String name, double weight, String exerciseType) {
        this.name = name;
        this.weight = weight;
        this.exerciseType = exerciseType;
    }
}

package no.minid.digdirleaderboard.service;

import no.minid.digdirleaderboard.domain.WeightRecord;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
public class LeaderboardService {

    public List<WeightRecord> getWeigthRecords(String filePath) {
        List<WeightRecord> records = new ArrayList<>();

        try (InputStream is = getClass().getResourceAsStream(filePath)) {
            if (is == null) {
                throw new RuntimeException("File not found: " + filePath);
            }

            try (BufferedReader reader = new BufferedReader(new InputStreamReader(is))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    String[] parts = line.split(",");
                    records.add(new WeightRecord(
                            parts[0].trim(),
                            Double.parseDouble(parts[1].trim())
                    ));
                }
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to read bench.txt data", e);
        }

        return records;
    }
}

package no.minid.digdirleaderboard.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import no.minid.digdirleaderboard.domain.WeightRecord;
import no.minid.digdirleaderboard.repository.WeightRecordRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataLoader implements CommandLineRunner {

    private final WeightRecordRepository weightRecordRepository;

    @Override
    public void run(String... args) throws Exception {
        // Only load data if the database is empty
        if (weightRecordRepository.count() == 0) {
            log.info("Loading initial data from files...");
            loadDataFromFile("/data/bench.txt", "bench");
            loadDataFromFile("/data/deadlift.txt", "deadlift");
            loadDataFromFile("/data/squat.txt", "squat");
            log.info("Initial data loaded successfully. Total records: {}", weightRecordRepository.count());
        } else {
            log.info("Database already contains data. Skipping initial data load.");
        }
    }

    private void loadDataFromFile(String filePath, String exerciseType) {
        try (InputStream is = getClass().getResourceAsStream(filePath)) {
            if (is == null) {
                log.warn("File not found: {}", filePath);
                return;
            }

            try (BufferedReader reader = new BufferedReader(new InputStreamReader(is))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    String[] parts = line.split(",");
                    if (parts.length == 2) {
                        WeightRecord record = new WeightRecord(
                                parts[0].trim(),
                                Double.parseDouble(parts[1].trim()),
                                exerciseType
                        );
                        weightRecordRepository.save(record);
                    }
                }
            }
        } catch (Exception e) {
            log.error("Failed to load data from {}", filePath, e);
        }
    }
}


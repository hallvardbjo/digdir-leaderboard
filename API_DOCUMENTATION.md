# Leaderboard API Endpoints

## GET Endpoints (Read Data)

### Get Bench Press Records
```
GET /leaderboard/bench
```
Returns all bench press records sorted by weight (descending).

### Get Deadlift Records
```
GET /leaderboard/deadlift
```
Returns all deadlift records sorted by weight (descending).

### Get Squat Records
```
GET /leaderboard/squat
```
Returns all squat records sorted by weight (descending).

### Get All Records
```
GET /leaderboard/records
```
Returns all weight records for all exercise types.

## POST Endpoint (Create Data)

### Add New Weight Record
```
POST /leaderboard/record
Content-Type: application/json

{
  "name": "John Doe",
  "weight": 150.5,
  "exerciseType": "bench"
}
```

**Exercise Types:**
- `bench` - Bench press
- `deadlift` - Deadlift
- `squat` - Squat

**Response:** Returns the created record with its generated ID.
```json
{
  "id": 1,
  "name": "John Doe",
  "weight": 150.5,
  "exerciseType": "bench"
}
```

## PUT Endpoint (Update Data)

### Update Existing Weight Record
```
PUT /leaderboard/record/{id}
Content-Type: application/json

{
  "name": "John Doe",
  "weight": 155.0,
  "exerciseType": "bench"
}
```

Replace `{id}` with the actual record ID.

**Response:** Returns the updated record.

## DELETE Endpoint (Delete Data)

### Delete Weight Record
```
DELETE /leaderboard/record/{id}
```

Replace `{id}` with the actual record ID.

**Response:** 204 No Content on success.

## Example Usage with cURL

### Add a new record
```bash
curl -X POST http://localhost:8080/leaderboard/record \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "weight": 120.0,
    "exerciseType": "squat"
  }'
```

### Update a record
```bash
curl -X PUT http://localhost:8080/leaderboard/record/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "weight": 125.0,
    "exerciseType": "squat"
  }'
```

### Delete a record
```bash
curl -X DELETE http://localhost:8080/leaderboard/record/1
```

### Get all bench press records
```bash
curl http://localhost:8080/leaderboard/bench
```

### Get all records
```bash
curl http://localhost:8080/leaderboard/records
```

## Error Handling

If you try to update or delete a record that doesn't exist, the API will return a 500 error with a message like:
```
Weight record not found with id: {id}
```

## Notes

- All weights should be in kilograms
- Exercise types are case-sensitive (use lowercase: "bench", "deadlift", "squat")
- The ID is automatically generated when creating a new record
- Records are automatically sorted by weight in descending order when retrieved by exercise type


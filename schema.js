const movieValidator = {
    $jsonSchema: {
        bsonType: "object",
        required: ["MovieID", "MovieName", "Genres"],
        properties: {
            MovieID: { bsonType: "int", description: "Must be an integer and is required" },
            MovieName: { bsonType: "string", description: "Must be a string and is required" },
            Genres: {
                bsonType: "array",
                items: { bsonType: "string" },
                description: "Must be an array of strings"
            },
            Tags: {
                bsonType: "array",
                items: { bsonType: "string" },
                description: "Optional array of strings"
            },
            Ratings: {
                bsonType: "array",
                items: { bsonType: "double" },
                description: "Optional array of numbers"
            },
            Metadata: {
                bsonType: "object",
                properties: {
                    IMDBID: { bsonType: "int" },
                    TMDBID: { bsonType: "int" }
                },
                description: "Optional object for metadata"
            },
            AverageRating: { bsonType: "double", description: "Optional double" },
            RatingsCount: { bsonType: "int", description: "Optional integer" }
        }
    }
};

export default movieValidator;
export function transformData({links, movies, tags, ratings}) {
    const movieMap = {};

    // Map Movies with Metadata
    movies.forEach(movie => {
        const MovieID = Number(movie.movieId);
        movieMap[MovieID] = {
            MovieID: MovieID,
            MovieName: movie.title,
            Genres: movie.genres ? movie.genres.split('|') : [],
            Tags: [],
            Ratings: [],
            Metadata: {}
        };
    });
    // Add Links
    links.forEach(link => {
        if (movieMap[link.movieId]) {
            movieMap[link.movieId].Metadata = {
                IMDBID: Number(link.imdbId),
                TMDBID: Number(link.tmdbId)
            };
        }
    });

    // Add Tags
    tags.forEach(tag => {
        const movieID = tag.movieId;
        if (movieMap[movieID]) {
            movieMap[movieID].Tags.push(tag.tag);
        }
    });

    // Add Ratings
    ratings.forEach(rating => {
        const movieID = rating.movieId;
        if (movieMap[movieID]) {
            movieMap[movieID].Ratings.push(Number(rating.rating));
        }
    });

    // Calculate Aggregates
    Object.values(movieMap).forEach(movie => {
        const ratings = movie.Ratings;
        movie.AverageRating = Number(ratings.length)
            ? Number((ratings.reduce((sum, r) => sum + r, 0) / ratings.length).toFixed(2))
            : null;
        movie.RatingsCount = ratings.length;
    });

    return Object.values(movieMap);
}

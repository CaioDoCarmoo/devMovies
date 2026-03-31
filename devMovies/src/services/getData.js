import api from './api'


export async function getMovies() {
    const { data: { results } } = await api.get('/movie/popular')

    for (const movie of results) {
        const { data: { results: videos } } = await api.get(
            `/movie/${movie.id}/videos?language=en-US`
        )

        const hasTrailer = videos.find(
            (video) => video.type === 'Trailer' && video.site === 'YouTube'
        )

        if (hasTrailer) {
            return movie  
        }
    }

    return null 
}

export async function getTopMovies() {

    const { data: { results } } = await api.get('/movie/top_rated')

    return results


}

export async function getTopSeries() {

    const { data: { results } } = await api.get('/tv/top_rated')

    return results


}

export async function getPopularSeries() {

    const { data: { results } } = await api.get('/tv/popular')

    return results


}

export async function getPersonPopular() {

    const { data: { results } } = await api.get('/person/popular')

    return results


}

// Busca um filme pelo ID

export async function getMovieVideos(movieId) {
    const { data: { results } } = await api.get(
        `/movie/${movieId}/videos?language=en-US`
    )

    const trailer = results.find(
        (video) => video.type === 'Trailer' && video.site === 'YouTube'
    )

    return trailer || null
}

export async function getMovieCredits(movieId) {
    const { data } = await api.get(
        `/movie/${movieId}/credits`
    )

    return data
}

export async function getMovieSimilar(movieId) {
    const { data: { results } } = await api.get(
        `/movie/${movieId}/similar`
    )

    return results
}

export async function getMovieById(movieId) {
    const { data }  = await api.get(
        `/movie/${movieId}`
    )

    return data
}
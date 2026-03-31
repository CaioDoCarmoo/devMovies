import { Container, Background } from './styles'
import { useEffect, useState } from 'react'
import api from '../../services/api'

function Modal({ movieId, setShowModal }) {

    const [movie, setMovie] = useState()

    useEffect(() => {

        async function getMovies() {
            const { data: { results } } = await api.get(
                `/movie/${movieId}/videos?language=en-US`
            )

            const trailer = results.find(
                (video) => video.type === 'Trailer' && video.site === 'YouTube'
            )

            if (trailer) setMovie(trailer) 
        }

        if (movieId) getMovies()

    }, [movieId]) 

    return (
        <Background onClick={() => setShowModal(false)}>
            {movie && (
                <Container>
                    <iframe
                        src={`https://www.youtube.com/embed/${movie.key}`}
                        title='Youtube Video Player'
                        height="500px"
                        width="100%"

                    />
                </Container>
            )}
        </Background>
    )
}

export default Modal
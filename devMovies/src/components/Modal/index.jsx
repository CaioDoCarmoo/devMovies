import { Container, Background } from './styles'
import { useEffect, useState } from 'react'
import { getMovie } from '../../services/getData' 

function Modal({ movieId, setShowModal }) {

    const [movie, setMovie] = useState()

    useEffect(() => {

        async function loadTrailer() {
            const trailer = await getMovie(movieId) 
            if (trailer) setMovie(trailer)
        }

        if (movieId) loadTrailer()

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
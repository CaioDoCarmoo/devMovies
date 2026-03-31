import { getMovieById, getMovieVideos, getMovieCredits, getMovieSimilar } from '../../services/getData'
import { Container, Background } from './styles'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getImages } from '../../services/utils/getImagens'

function Detail() {
    const { id } = useParams()
    const [movie, setMovie] = useState()
    const [movieVideos, setMovieVideos] = useState()
    const [movieCredits, setMovieCredits] = useState()
    const [movieSimilar, setMovieSimilar] = useState()


    useEffect(() => {

        async function getAllData() {

            Promise.all([
                getMovieById(id),
                getMovieVideos(id),
                getMovieCredits(id),
                getMovieSimilar(id),
            ])
                .then(([movie, videos, credits, similar,]) => {
                    console.log({ movie, videos, credits, similar })
                    setMovie(movie)
                    setMovieVideos(videos)
                    setMovieCredits(credits)
                    setMovieSimilar(similar)
                })
                .catch(error => console.error(error))

        }

        getAllData()
    }, [])

    return (
        <>
             {movie && <Background $image={ getImages(movie.backdrop_path) }> 
                <Container>
                    <div>Detalhes</div>
                </Container>
            </Background>} 
        </>
    )

}

export default Detail

import { getMovieById, getMovieCredits, getMovieSimilar, getMovieAllVideos } from '../../services/getData'
import { Container, Background, Cover, Info, ContainerMovies } from './styles'
import SpanGenres from '../../components/SpanGenres'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getImages } from '../../services/utils/getImagens'
import Credits from '../../components/Credits/index'
import   Slider   from '../../components/Slider/index'


function Detail() {
    const { id } = useParams()
    const [movie, setMovie] = useState()
    const [movieAllVideos, setMovieAllVideos] = useState()
    const [movieCredits, setMovieCredits] = useState()
    const [movieSimilar, setMovieSimilar] = useState()


    useEffect(() => {

        async function getAllData() {

            Promise.all([
                getMovieById(id),
                getMovieAllVideos(id),
                getMovieCredits(id),
                getMovieSimilar(id),
            ])
                .then(([movie, videos, credits, similar,]) => {
                    console.log({ movie, videos, credits, similar })
                    setMovie(movie)
                    setMovieAllVideos(videos)
                    setMovieCredits(credits)
                    setMovieSimilar(similar)
                })
                .catch(error => console.error(error))

        }

        getAllData()
    }, [])

    return (
        <>
            {movie && (
                <>
                    <Background $image={getImages(movie.backdrop_path)} />
                    <Container>
                        <Cover>
                            <img src={getImages(movie.poster_path)} />
                        </Cover>
                        <Info>
                            <h2>{movie.title}</h2>
                            <SpanGenres genres={movie.genres} />
                            <p>{movie.overview}</p>
                            <div>
                                <Credits credits={movieCredits} />
                            </div>
                        </Info>
                    </Container>
                    <ContainerMovies>
                        {movieAllVideos &&
                            movieAllVideos.map((video) => (
                                <div key={video.id}>
                                    <h4>{video.name}</h4>
                                    <iframe
                                        src={`https://www.youtube.com/embed/${video.key}`}
                                        title='Youtube Video Player'
                                        height="500px"
                                        width="100%"
                                    />
                                </div>
                            ))}
                    </ContainerMovies>
                    {movieSimilar && <Slider info={movieSimilar} title={'Filmes Similares'} />}
                </>
            )}
        </>
    )

}

export default Detail
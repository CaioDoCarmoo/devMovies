import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { ContainerButtons, Background, Info, Poster, Container } from './styles'
import Slider from '../../components/Slider'
import Button from '../../components/Button'
import { getImages } from '../../services/utils/getImagens'
import Modal from '../../components/Modal/'

function Home() {
    const [showModal, setShowModal] = useState(false)
    const [movie, setMovie] = useState()
    const [topMovies, setTopMovies] = useState()
    const [topSeries, setTopSeries] = useState()
    const [popularSeries, setPopularSeries] = useState()
    const [personPopular, setPersonPopular] = useState()

    useEffect(() => {

        async function getMovies() {
            const { data: { results } } = await api.get('/movie/popular')

            for (const movie of results) {
                const { data: { results: videos } } = await api.get(
                    `/movie/${movie.id}/videos?language=en-US`
                )

                const hasTrailer = videos.find(
                    (video) => video.type === 'Trailer' && video.site === 'YouTube'
                )

                if (hasTrailer) {
                    setMovie(movie)
                    break
                }
            }
        }

        async function getTopMovies() {
            const { data: { results } } = await api.get('/movie/top_rated')
            setTopMovies(results)
        }

        async function getTopSeries() {
            const { data: { results } } = await api.get('/tv/top_rated')
            setTopSeries(results)
        }

        async function getPopularSeries() {
            const { data: { results } } = await api.get('/tv/popular')
            setPopularSeries(results)
        }

        async function getPersonPopular() {
            const { data: { results } } = await api.get('/person/popular')
            setPersonPopular(results)
        }

        getMovies()
        getTopMovies()
        getTopSeries()
        getPopularSeries()
        getPersonPopular()

    }, [])

    return (
        <>
            {movie && (
                <Background $img={getImages(movie.backdrop_path)}>
                    {showModal && <Modal movieId={movie.id} setShowModal={setShowModal}/>}
                    <Container>
                        <Info>
                            <h1>{movie.title}</h1>
                            <p>{movie.overview}</p>
                            <ContainerButtons>
                                <Button red={true}>Assista Agora</Button>
                                <Button onClick={() => setShowModal(true)} red={false}>Assista o Trailer</Button>
                            </ContainerButtons>
                        </Info>
                        <Poster>
                            <img
                                alt="capa-do-filme"
                                src={getImages(movie.poster_path)}
                            />
                        </Poster>
                    </Container>
                </Background>
            )}
            {topMovies && <Slider info={topMovies} title={'Top Filmes'} />}
            {topSeries && <Slider info={topSeries} title={'Top Séries'} />}
            {popularSeries && <Slider info={popularSeries} title={'Séries Populares'} />}
            {personPopular && <Slider info={personPopular} title={'Principais Artistas'} />}
        </>
    )
}

export default Home
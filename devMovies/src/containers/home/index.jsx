import React, { useEffect, useState } from 'react'
import { ContainerButtons, Background, Info, Poster, Container } from './styles'
import Slider from '../../components/Slider'
import Button from '../../components/Button'
import { getImages } from '../../services/utils/getImagens'
import Modal from '../../components/Modal/'
import { useNavigate } from 'react-router-dom'
import { getMovies, getPopularSeries, getTopMovies, getTopSeries, getPersonPopular } from '../../services/getData'


function Home() {
    const [showModal, setShowModal] = useState(false)
    const [movie, setMovie] = useState()
    const [topMovies, setTopMovies] = useState()
    const [topSeries, setTopSeries] = useState()
    const [popularSeries, setPopularSeries] = useState()
    const [personPopular, setPersonPopular] = useState()
    const navigate = useNavigate()

    useEffect(() => {

        async function getAllData() {

            console.time('time')

            Promise.all([
                getMovies(),
                getTopMovies(),
                getTopSeries(),
                getPopularSeries(),
                getPersonPopular()
            ])
                .then(([movies, topMovies, topSeries, popularSeries, personPopular]) => {
                    if (movies) setMovie(movies)
                    setTopMovies(topMovies)
                    setTopSeries(topSeries)
                    setPopularSeries(popularSeries)
                    setPersonPopular(personPopular)
                })
                .catch(error => console.error(error))

            console.timeEnd('time')

        }

        getAllData()
    }, [])

    return (
        <>
            {movie && (
                <Background $img={getImages(movie.backdrop_path)}>
                    {showModal && <Modal movieId={movie.id} setShowModal={setShowModal} />}
                    <Container>
                        <Info>
                            <h1>{movie.title}</h1>
                            <p>{movie.overview}</p>
                            <ContainerButtons>
                                <Button onClick={() => navigate(`/detalhe/${movie.id}`)} red={true}>Assista Agora</Button>
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
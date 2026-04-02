import { Container } from './styles'


function SpanGenres( { genres } ) {

    return (
        <Container>
            {genres && genres.map( gens => (
                <span key={gens.id}>{gens.name}</span>
            ))}
        </Container>
    )

}

export default SpanGenres
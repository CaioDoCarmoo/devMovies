import { getImages } from "../../services/utils/getImagens"
import { Container } from './styles'



function Card( {item} ) {
    return (
        <Container style={{ color: 'white' }}>
            <img src={getImages(item.poster_path || item.profile_path || '')} />
            <h3>{item.title || item.name}</h3>
        </Container>
    )
}

export default Card
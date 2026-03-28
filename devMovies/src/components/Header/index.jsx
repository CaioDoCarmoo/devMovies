import Logo from '../../assets/logo.png'
import { Container }  from './styles'



function Header () {
    return (
        <Container>
            <img src={ Logo } alt='logo-dev-movies' style={ {width: 550} }></img>
        </Container>
    )
}


export default Header
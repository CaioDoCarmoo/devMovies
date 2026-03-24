import { Route, Routes } from 'react-router-dom'
import Home from '../containers/home'
import Movies from '../containers/Movies'
import Series from '../containers/Series'

function Router () {

    return (
        <Routes>
            <Route path='/' element={ <Home /> }/>
            <Route path='/filmes' element={ <Movies /> }/>
            <Route path='/series' element={ <Series /> }/>
        </Routes>
    )

}

export default Router
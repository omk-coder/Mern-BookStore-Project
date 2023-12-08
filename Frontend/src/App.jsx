
import {Routes, Route} from 'react-router-dom'
import CreateBook from './pages/CreateBook'
import DeleteBook from './pages/DeleteBook'
import Home from './pages/Home'
import ShowBook from './pages/ShowBook'
import UpdateBook from './pages/UpdateBook'

const App = () => {
  return (

    //using creating the routes keep the route same as you define in the backend
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/books/details/:id' element={<ShowBook/>} />
      <Route path='/books/create' element={<CreateBook/>} />
      <Route path='/books/edit/:id' element={<UpdateBook/>} />
      <Route path='/books/delete/:id' element={<DeleteBook/>} />

     
    </Routes>
  )
}

export default App
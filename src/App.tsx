import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import Home from './app/home'
import Login from './app/login'
import DefaultPage from './app/default'

const router = createBrowserRouter(createRoutesFromElements(
	<>
		<Route path='/' element={<Home/>} errorElement={<div/>} >
			<Route errorElement={<div/>}>
				<Route index element={<DefaultPage/>} />
				<Route path='/login' element={<Login/>} />
				<Route path='*' element={<div/>}/>
			</Route>
		</Route>
	</>
))

function App() {
  
  return (
    <RouterProvider router={router} />
  )
}

export default App

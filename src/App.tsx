import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import Home from './app/home'
import Login from './app/login'
import Register from './app/register'
import DefaultPage from './app/default'
import ProductPage from './app/product'
import ProductProvider from './context/product-contex'
import UserPage from './app/user'

const router = createBrowserRouter(createRoutesFromElements(
	<>
		<Route path='/' element={<Home/>} errorElement={<div/>} >
			<Route errorElement={<div>HELLO</div>}>
				<Route index element={<ProductProvider><DefaultPage/></ProductProvider>} />
				<Route path='/login' element={<Login/>} />
				<Route path='/register' element={<Register/>} />
				<Route path='/user' element={<UserPage/>} />
				<Route path='/user/purchases' element={<div/>}/>
				<Route path='/product/:id' element={<ProductPage/>}/>
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

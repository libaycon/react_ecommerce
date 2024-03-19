import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import Home from './app/home'
import Login from './app/login'
import DefaultPage from './app/default'
import ProductPage from './app/product'
import ProductProvider from './context/product-contex'

const router = createBrowserRouter(createRoutesFromElements(
	<>
		<Route path='/' element={<Home/>} errorElement={<div/>} >
			<Route errorElement={<div>HELLO</div>}>
				<Route index element={<ProductProvider><DefaultPage/></ProductProvider>} />
				<Route path='/login' element={<Login/>} />
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

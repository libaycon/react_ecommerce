import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

const router = createBrowserRouter(createRoutesFromElements(
	<>
		<Route path='/' element={< div/>} />
		<Route path='/:country_code/:username/' element={<div/>} errorElement={<div/>} >
			<Route errorElement={<div/>}>
				<Route index element={<div/>} />
				<Route path='inventory/' element={<div/>} />
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

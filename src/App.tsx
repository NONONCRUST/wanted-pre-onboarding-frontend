import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import PageGuard from './components/PageGuard'
import PATH from './lib/constants/path'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Todo from './pages/Todo'

function App() {
  return (
    <BrowserRouter>
      <PageGuard>
        <Layout>
          <Routes>
            <Route path={PATH.HOME} element={<Home />} />
            <Route path={PATH.SIGN_UP} element={<SignUp />} />
            <Route path={PATH.SIGN_IN} element={<SignIn />} />
            <Route path={PATH.TODO} element={<Todo />} />
          </Routes>
        </Layout>
      </PageGuard>
    </BrowserRouter>
  )
}

export default App

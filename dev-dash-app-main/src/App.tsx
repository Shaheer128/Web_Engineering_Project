import { Provider } from "react-redux"
import { Home } from "./Pages/home/Home"
import { Header } from "./components/header/Header"
import { Layout } from "./components/layout/Layout"
import { store } from "./store/store"




function App() {

  return (
    <>
    <Provider store={store}>
    <Header />
      <Layout>
        <Home />

      </Layout>
      </Provider>
    </>
  )
}

export default App





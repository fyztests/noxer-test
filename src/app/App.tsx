import './styles'
import CatalogPage from '@/pages/CatalogPage/CatalogPage.tsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AppQueryProvider from '@/app/providers/QueryClientProvider'
import FooterMenu from '@/widgets/FooterMenu'

const App = () => {
  return (
    <>
    <AppQueryProvider>
      <BrowserRouter>
        <Routes>
          {/*пока заглушка*/}
          <Route path="*" element={<CatalogPage />} />
        </Routes>

        <FooterMenu />
      </BrowserRouter>
    </AppQueryProvider>

    </>
  )
}

export default App
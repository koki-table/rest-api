import { Route, Routes } from 'react-router-dom'

import { lazyImport } from '../../../utils/lazyImport'

const { Home } = lazyImport(async () => await import('./Home'), 'Home')

export const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

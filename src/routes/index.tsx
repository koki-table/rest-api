import { Routes, Route } from 'react-router-dom'

import { lazyImport } from '../utils/lazyImport'

const { HomeRoutes } = lazyImport(async () => await import('../features/home'), 'HomeRoutes')

export const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/">
        <Route index element={<HomeRoutes />} />
      </Route>
    </Routes>
  )
}

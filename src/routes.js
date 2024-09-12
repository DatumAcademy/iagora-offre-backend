import React from 'react'

// Offres
const ListeOffre = React.lazy(() => import('./views/offres/liste/Liste'))
const creationOffre = React.lazy(() => import('./views/offres/Add/Creation'))
const detailOffre = React.lazy(() => import('./views/offres/Detail/Detail'))
const statistique = React.lazy(() => import('./views/statistique/dashboard'))
const RecommandationOffre = React.lazy(() => import('./views/offres/recommandation/index'))

// Admin
const ListeAdmin = React.lazy(() => import('./views/admin/liste/Liste'))
const creationAdmin = React.lazy(() => import('./views/admin/Add/Creation'))
const detailAdmin = React.lazy(() => import('./views/admin/Detail/Detail'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/offre/liste', name: 'Liste des offres', element: ListeOffre },
  { path: '/offre/creation', name: 'Création d\'une offre', element: creationOffre },
  { path: '/offre/detail/:id', name: 'A propos de l\'offre', element: detailOffre },
  { path: '/admin/liste', name: 'Liste des Administrateurs', element: ListeAdmin },
  { path: '/admin/creation', name: 'Création d\'un Administrateur', element: creationAdmin },
  { path: '/admin/detail/:id', name: 'A propos de l\'administrateur', element: detailAdmin },
  { path: '/offre/statistique', name: 'Tableau de bord', element: statistique },
  { path: '/offre/recommendation', name: 'Recommandation', element: RecommandationOffre }
]

export default routes

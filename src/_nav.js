import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilPlus,
  cilChart
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Gestion des offres',
  },
  {
    component: CNavItem,
    name: 'Liste des offres',
    to: '/offre/liste',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Création d\'une offre',
    to: '/offre/creation',
    icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Gestion des Administrateurs',
  },
  {
    component: CNavItem,
    name: 'Liste des Admins',
    to: '/admin/liste',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Création d\'un Admin',
    to: '/admin/creation',
    icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Tableau de bord',
  },
  {
    component: CNavItem,
    name: 'Statistique',
    to: '/offre/statistique',
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Recommandation des offres',
  },
  {
    component: CNavItem,
    name: 'Liste des offres',
    to: '/offre/recommendation',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  }
]

export default _nav

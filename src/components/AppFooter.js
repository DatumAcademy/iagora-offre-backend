import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="#" target="_blank" rel="noopener noreferrer">
          IAGORA
        </a>
        <span className="ms-1">offre d'emplois</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Crée par</span>
        <a href="#" target="_blank" rel="noopener noreferrer">
          RAKOTOMANANA Nick Mathieu Andrianina
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)

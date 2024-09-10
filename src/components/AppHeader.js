import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilMenu,
  cilMoon,
  cilAccountLogout
} from '@coreui/icons'

import { AppBreadcrumb } from './index'

const AppHeader = () => {
  const headerRef = useRef()
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const handleLogout = () => {
    localStorage.removeItem('generateTokken')
    window.location.reload()
  }


  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              <CIcon icon={cilAccountLogout} size="lg" onClick={handleLogout}/>
            </CDropdownToggle>
          </CDropdown>
        </CHeaderNav>
      </CContainer>
      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader

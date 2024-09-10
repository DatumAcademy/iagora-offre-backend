import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CSpinner,
  CButton,
  CFormInput,
} from '@coreui/react'
import { API_URL } from '../../../constants/constant'
import PaginationComponent from '../../base/paginations/PaginationPerso'

const ListeAdmin = () => {
  const [admins, setAdmins] = useState([])
  const [filters, setFilters] = useState({
    first_name: '',
    last_name: '',
    email: '',
  })
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    totalPages: 1,
    currentPage: 1,
    pageSize: 5,
    totalResults: 0,
  })

  const fetchAdmins = async (page = 0) => {
    setLoading(true)
    try {
      const token = localStorage.getItem('generateTokken')
      console.log('Token:', token);
      if (!token) {
        console.error('Token manquant');
        return;
      }
  
      const response = await axios.get(`${API_URL}/Admin/search`, {
        params: {
          page,
          pageSize: pagination.pageSize,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  
      const data = response.data
      setAdmins(data.admins)
      setPagination({
        totalPages: data.totalPages,
        currentPage: data.currentPage,
        pageSize: data.pageSize,
        totalResults: data.totalResults,
      })
    } catch (error) {
      console.error('Error fetching admins', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdmins()
  }, [])

  const handleInputChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    })
  }

  const handleSearch = () => {
    fetchAdmins()
  }

  const handlePageChange = (page) => {
    fetchAdmins(page)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="text-center">
            <strong>LISTE DES ADMINISTRATEURS</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="mb-4">
              <CRow className="mb-3">
                <CCol md={3}>
                  <CFormInput
                    name="first_name"
                    placeholder="Prénom"
                    value={filters.first_name}
                    onChange={handleInputChange}
                  />
                </CCol>
                <CCol md={3}>
                  <CFormInput
                    name="last_name"
                    placeholder="Nom de famille"
                    value={filters.last_name}
                    onChange={handleInputChange}
                  />
                </CCol>
                <CCol md={3}>
                  <CFormInput
                    name="email"
                    placeholder="E-mail"
                    value={filters.email}
                    onChange={handleInputChange}
                  />
                </CCol>
                <CCol md={3}>
                  <CButton color="primary" onClick={handleSearch}>
                    Rechercher
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
            {loading ? (
              <CSpinner />
            ) : (
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Prénom</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nom de famille</CTableHeaderCell>
                    <CTableHeaderCell scope="col">E-mail</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {admins.map((admin) => (
                    <CTableRow key={admin._id}>
                      <CTableDataCell>{admin.first_name}</CTableDataCell>
                      <CTableDataCell>{admin.last_name}</CTableDataCell>
                      <CTableDataCell>{admin.email}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            )}
            <CCol xs={12}>
              <PaginationComponent
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </CCol>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ListeAdmin

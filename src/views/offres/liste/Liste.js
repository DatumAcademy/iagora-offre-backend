import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
  CForm,
  CFormInput,
  CButton,
  CSpinner,
  CFormSelect
} from '@coreui/react'
import { API_URL } from '../../../constants/constant'
import PaginationComponent from '../../base/paginations/PaginationPerso'

const Tables = () => {
  const [offers, setOffers] = useState([])
  const [filters, setFilters] = useState({
    type: '',
    skills: '',
    city: '',
    contract: '',
    minexperience: '',
    language: '',
    sortPublicationDate:'DESC'
  })
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    totalPages: 1,
    currentPage: 1,
    pageSize: 20,
    totalResults: 0
  })

  const fetchOffers = async (page = 1) => {
    setLoading(true)
    try {
      const response = await axios.get(`${API_URL}/search`, {
        params: {
          ...filters,
          page,
          pageSize: pagination.pageSize,
        }
      })
      const data = response.data.data
      setOffers(data.offers)
      setPagination({
        totalPages: data.totalPages,
        currentPage: data.currentPage,
        pageSize: data.pageSize,
        totalResults: data.totalResults
      })
    } catch (error) {
      console.error('Error fetching offers', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOffers()
  }, [])

  const handleInputChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    })
  }

  const handleSearch = () => {
    fetchOffers()
  }

  const handlePageChange = (page) => {
    fetchOffers(page)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>LISTE DES OFFRES DISPONIBLES</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
            <CCol xs={12}>
            <CRow className="mb-3">
                <CCol md={3}>
                    <CFormSelect name="type" value={filters.type} onChange={handleInputChange}>
                        <option value="">Type d'offre</option>
                        <option value="Stage">Stage</option>
                        <option value="Emplois">Emplois</option>
                    </CFormSelect>
                </CCol>
                <CCol md={3}>
                    <CFormInput name="skills" placeholder="Compétences" value={filters.skills} onChange={handleInputChange} />
                </CCol>
                <CCol md={3}>
                    <CFormInput name="city" placeholder="Ville" value={filters.city} onChange={handleInputChange} />
                </CCol>
                <CCol md={3}>
                    <CFormSelect
                        name="contract"
                        value={filters.contract}
                        onChange={handleInputChange}
                    >
                        <option value="">Type de contrat</option>
                        <option value="Stagiaire">Stage</option>
                        <option value="CDD">CDD</option>
                        <option value="CDI">CDI</option>
                    </CFormSelect>
                </CCol>
            </CRow>
            <CRow className="mb-3">
            <CCol md={3}>
                  <CFormInput name="minexperience" placeholder="Min Expérience" value={filters.minexperience} onChange={handleInputChange} />
                </CCol>
                <CCol md={3}>
                  <CFormInput name="language" placeholder="Langue" value={filters.language} onChange={handleInputChange} />
                </CCol>
                <CCol md={3}>
                  <CButton color="primary" onClick={handleSearch}>Rechercher</CButton>
                </CCol>
            </CRow>
            </CCol>
            </CForm>
            {loading ? (
              <CSpinner />
            ) : (
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Libellé</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Entreprise</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Contrat</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Type de travail</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Publié le</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {offers.map((offer) => (
                    <CTableRow key={offer.id}>
                      <CTableHeaderCell>{offer.label}</CTableHeaderCell>
                      <CTableDataCell>{offer.company}</CTableDataCell>
                      <CTableDataCell>{offer.contract}</CTableDataCell>
                      <CTableDataCell>{offer.type}</CTableDataCell>
                      <CTableDataCell>{offer.publicationdate}</CTableDataCell>
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

export default Tables

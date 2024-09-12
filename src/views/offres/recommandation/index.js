import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
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
  CForm,
  CButton,
  CSpinner,
  CFormSelect
} from '@coreui/react'
import { API_URL } from '../../../constants/constant'

const RecommandationOffre = () => {
  const [offers, setOffers] = useState([])
  const [students, setStudents] = useState([])
  const [selectedStudent, setSelectedStudent] = useState('')
  const [filters, setFilters] = useState({
    type: '',
    skills: '',
    label: '',
    contract: '',
    minexperience: '',
    language: '',
    sortPublicationDate: 'DESC'
  })
  const [loading, setLoading] = useState(false)

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_URL}/student/list/listStudent/getAll?pageSize=500`)
      setStudents(response.data.students)
    } catch (error) {
      console.error('Error fetching students', error)
    }
  }

  const fetchOffers = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${API_URL}/student/list/recommandation/${selectedStudent}`)
      setOffers(response.data.studentData.recommendations || [])
    } catch (error) {
      console.error('Error fetching offers', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  useEffect(() => {
    if (selectedStudent) {
      fetchOffers()
    }
  }, [selectedStudent])

  const handleInputChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    })
  }

  const handleStudentChange = (e) => {
    setSelectedStudent(e.target.value)
  }

  const handleSearch = () => {
    fetchOffers()
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="text-center">
            <strong>LISTE DES OFFRES RECOMMANDÉES</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CCol xs={12}>
                <CRow className="mb-3">
                  <CCol md={3}>
                    <CFormSelect value={selectedStudent} onChange={handleStudentChange}>
                      <option value="">Sélectionner un étudiant</option>
                      {students.map((student) => (
                        <option key={student.numETU} value={student.numETU}>
                          {student.first_name} {student.last_name}
                        </option>
                      ))}
                    </CFormSelect>
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
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {offers.map((offer) => (
                    <CTableRow key={offer.id}>
                      <CTableHeaderCell scope="row">
                        <Link to={`/offre/detail/${offer.offer_id}`}>{offer.label}</Link>
                      </CTableHeaderCell>
                      <CTableDataCell>{offer.entreprise}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default RecommandationOffre

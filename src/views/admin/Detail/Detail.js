import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSpinner,
} from '@coreui/react'
import axios from 'axios'
import { API_URL } from '../../../constants/constant'

const AdminDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const token = localStorage.getItem('generateTokken')

  useEffect(() => {
    const fetchAdmin = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${API_URL}/Admin/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })
        setAdmin(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAdmin()
  }, [id])

  const handleDelete = async () => {
    if (window.confirm('Voulez-vous vraiment supprimer cet administrateur?')) {
      try {
        await axios.delete(`${API_URL}/Admin/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })
        alert('Administrateur supprimé avec succès')
        navigate('/admin/liste')
      } catch (error) {
        alert('Erreur lors de la suppression de l\'administrateur')
      }
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="text-center">
            <strong>DÉTAIL DE L'ADMINISTRATEUR</strong>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <CSpinner />
            ) : error ? (
              <p style={{ color: 'red' }}>{error}</p>
            ) : admin ? (
              <div>
                <h4>Nom : {admin.last_name}</h4>
                <p>Prénom : {admin.first_name}</p>
                <p>Email : {admin.email}</p>
                <CRow>
                <CCol md={6}>
                <div className="text-center mt-4">
                  <CButton color="primary" onClick={() => navigate('/admin/liste')}>
                    Retour vers la liste
                  </CButton>
                </div>
                  </CCol>
                  <CCol md={6}>
                  <div className="text-center mt-4">
                  <CButton color="danger" onClick={handleDelete} >
                    Supprimer
                  </CButton>
                </div>
                  </CCol>
                </CRow>
              </div>
            ) : (
              <p>Aucune donnée disponible</p>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AdminDetail

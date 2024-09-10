import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams,useNavigate } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CSpinner,CButton } from '@coreui/react'
import { API_URL } from '../../../constants/constant'

const OfferDetail = () => {
  const { id } = useParams()
  const [offer, setOffer] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const fetchOfferDetail = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${API_URL}/${id}`)
      setOffer(response.data.data)
    } catch (error) {
      console.error('Error fetching offer detail', error)
    } finally {
      setLoading(false)
    }
  }

  const formatValue = (value) => (value === 0 || value === '' || !value ? '-' : value)

  const deleteOffer = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) {
      try {
        await axios.delete(`${API_URL}/${id}`)
        alert('Offre supprimée avec succès')
        navigate('/offre/liste')
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'offre', error)
        alert('Erreur lors de la suppression de l\'offre')
      }
    }
  }

  useEffect(() => {
    fetchOfferDetail()
  }, [id])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="text-center">
            <strong>DETAIL DE L'OFFRE</strong>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <CSpinner />
            ) : offer ? (
              <div>
                <h4 className="text-left mb-4">Poste : {offer.label}</h4>
                <CRow>
                  <CCol md={6}>
                    <p><strong>Entreprise : </strong>{offer.company}</p>
                    <p><strong>Ville : </strong>{offer.city}</p>
                    <p><strong>Date de publication : </strong>{offer.publicationdate}</p>
                    <p><strong>Compétences : </strong>{offer.skills}</p>
                    <p><strong>Contrat : </strong>{offer.contract}</p>
                  </CCol>
                  <CCol md={6}>
                    <p><strong>Type : </strong>{offer.type}</p>
                    <p><strong>Date limite candidature : </strong>{offer.deadlinedate}</p>
                    <p><strong>Langue : </strong>{offer.language.label} ({offer.language.level})</p>
                    <p><strong>Expérience minimale : </strong>{formatValue(offer.minexperience)} ans</p>
                  </CCol>
                </CRow>
                <CRow>
                <CCol md={6}>
                <div className="text-center mt-4">
                  <CButton color="primary" onClick={() => navigate('/offre/liste')}>
                    Retour vers la liste
                  </CButton>
                </div>
                  </CCol>
                  <CCol md={6}>
                  <div className="text-center mt-4">
                  <CButton color="danger" onClick={deleteOffer}>
                    Supprimer l'offre
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

export default OfferDetail

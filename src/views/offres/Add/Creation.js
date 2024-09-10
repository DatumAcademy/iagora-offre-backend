import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSelect,
  CFormTextarea,
} from '@coreui/react'
import axios from 'axios'
import { API_URL } from '../../../constants/constant'

const CreateOffer = () => {
  const [offerData, setOfferData] = useState({
    type: '',
    label: '',
    company: '',
    shortdescription: '',
    skills: '',
    contract: '',
    typeWork: '',
    city: '',
    deadlinedate: '',
    minexperience: 0,
    language: { label: '', level: '' },
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setOfferData({
      ...offerData,
      [name]: value,
    })
  }

  const handleLanguageChange = (e) => {
    const { name, value } = e.target
    setOfferData({
      ...offerData,
      language: {
        ...offerData.language,
        [name]: value,
      },
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const offerBody = {
      type: offerData.type,
      offers: [
        {
          label: offerData.label,
          company: offerData.company,
          shortdescription: offerData.shortdescription,
          skills: offerData.skills,
          contract: offerData.contract,
          type: offerData.typeWork,
          city: offerData.city,
          deadlinedate: offerData.deadlinedate.replace("-", "/"),
          minexperience: offerData.minexperience,
          language: {
            label: offerData.language.label,
            level: offerData.language.level,
          },
          candidate: [],
        },
      ],
    }

    try {
      const response = await axios.post(`${API_URL}/create`, offerBody)
      if (response.status === 201) {
        setMessage('Offre créée avec succès!')
      }
    } catch (error) {
      console.error('Erreur lors de la création de l\'offre', error)
      setMessage('Erreur lors de la création de l\'offre')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CRow>
    <CCol md={12}>
        <CCard className="mb-4">
        <CCardHeader>
            <strong>CREATION D'UNE OFFRE</strong>
        </CCardHeader>
        <CCardBody>
            <CForm onSubmit={handleSubmit}>
            <CInputGroup className="mb-3">
                <CInputGroupText>Type d'offre</CInputGroupText>
                <CFormSelect name="type" value={offerData.type} onChange={handleInputChange} required>
                <option value="">Sélectionner</option>
                <option value="Stage">Stage</option>
                <option value="Emplois">Emploi</option>
                </CFormSelect>
            </CInputGroup>

            <CInputGroup className="mb-3">
                <CInputGroupText>Libellé</CInputGroupText>
                <CFormInput
                type="text"
                placeholder="Libellé"
                name="label"
                required
                value={offerData.label}
                onChange={handleInputChange}
                />
            </CInputGroup>

            <CInputGroup className="mb-3">
                <CInputGroupText>Entreprise</CInputGroupText>
                <CFormInput
                type="text"
                required
                placeholder="Nom de l'entreprise"
                name="company"
                value={offerData.company}
                onChange={handleInputChange}
                />
            </CInputGroup>

            <CInputGroup className="mb-3">
                <CInputGroupText>Description</CInputGroupText>
                <CFormTextarea
                placeholder="Courte description de l'offre"
                name="shortdescription"
                required
                value={offerData.shortdescription}
                onChange={handleInputChange}
                />
            </CInputGroup>

            <CInputGroup className="mb-3">
                <CInputGroupText>Compétences</CInputGroupText>
                <CFormInput
                type="text"
                required
                placeholder="Compétences (séparées par des virgules)"
                name="skills"
                value={offerData.skills}
                onChange={handleInputChange}
                />
            </CInputGroup>

            <CInputGroup className="mb-3">
                <CInputGroupText>Contrat</CInputGroupText>
                <CFormSelect name="contract" value={offerData.contract} onChange={handleInputChange} required>
                <option value="">Sélectionner</option>
                <option value="CDD">CDD</option>
                <option value="CDI">CDI</option>
                <option value="Stagiaire">Stage</option>
                </CFormSelect>
            </CInputGroup>

            <CInputGroup className="mb-3">
                <CInputGroupText>Type de Travail</CInputGroupText>
                <CFormSelect name="typeWork" value={offerData.typeWork} onChange={handleInputChange} required>
                <option value="">Sélectionner</option>
                <option value="Sur Site">Sur Site</option>
                <option value="A Distance">A Distance</option>
                </CFormSelect>
            </CInputGroup>

            <CInputGroup className="mb-3">
                <CInputGroupText>Ville</CInputGroupText>
                <CFormInput
                type="text"
                required
                placeholder="Ville"
                name="city"
                value={offerData.city}
                onChange={handleInputChange}
                />
            </CInputGroup>

            <CInputGroup className="mb-3">
                <CInputGroupText>Date Limite</CInputGroupText>
                <CFormInput
                type="date"
                required
                name="deadlinedate"
                value={offerData.deadlinedate}
                onChange={handleInputChange}
                />
            </CInputGroup>

            <CInputGroup className="mb-3">
                <CInputGroupText>Années d'expérience minimum</CInputGroupText>
                <CFormInput
                type="number"
                required
                name="minexperience"
                value={offerData.minexperience}
                onChange={handleInputChange}
                />
            </CInputGroup>

            <CInputGroup className="mb-3">
                <CInputGroupText>Langue</CInputGroupText>
                <CFormInput
                type="text"
                required
                placeholder="Label de la langue"
                name="label"
                value={offerData.language.label}
                onChange={handleLanguageChange}
                />
            </CInputGroup>

            <CInputGroup className="mb-3">
                <CInputGroupText>Niveau</CInputGroupText>
                <CFormSelect name="level" value={offerData.language.level} onChange={handleLanguageChange} required>
                <option value="">Sélectionner</option>
                <option value="Moyen">Moyen</option>
                <option value="Intermédiaire">Intermédiaire</option>
                <option value="Avancé">Avancé</option>
                </CFormSelect>
            </CInputGroup>
            {message && <p style={{ color: 'success' }}>{message}</p>}
            <div className="d-grid">
                <CButton color="primary" type="submit" disabled={loading}>
                {loading ? 'Création en cours...' : 'Créer l\'offre'}
                </CButton>
            </div>
            </CForm>
        </CCardBody>
        </CCard>
    </CCol>
    </CRow>
  )
}

export default CreateOffer

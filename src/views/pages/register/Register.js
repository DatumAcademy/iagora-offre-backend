import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'
import { API_URL } from '../../../constants/constant'

const Register = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axios.post(`${API_URL}/Admin`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      })

      if (response.status === 201) {
        alert('Administrateur créé avec succès !')
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
      }
    } catch (error) {
      setError('Erreur lors de la création du compte!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Inscription</h1>
                  <p className="text-body-secondary">Création de compte</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Nom"
                      autoComplete="nom"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Prénom"
                      autoComplete="prenom"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="E-mail"
                      autoComplete="e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Mot de passe"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </CInputGroup>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                    <CRow>
                      <CCol xs={6}>
                        <div className="d-grid">
                          <CButton color="primary" type="submit" disabled={loading}>
                            {loading ? <CSpinner size="sm" /> : 'Valider'}
                          </CButton>
                        </div>
                      </CCol>
                      <CCol xs={6}>
                        <div className="d-grid">
                          <CButton color="success" className="px-0" onClick={() => navigate('/login')}>
                            S'authentifier
                          </CButton>
                        </div>
                      </CCol>
                    </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
export default Register

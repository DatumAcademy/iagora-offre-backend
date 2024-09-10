import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CSpinner,
} from '@coreui/react'
import { API_URL } from '../../constants/constant'

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(`${API_URL}/statistics`)
        setStats(response.data)
      } catch (err) {
        setError('Erreur lors du chargement des statistiques')
      } finally {
        setLoading(false)
      }
    }

    fetchStatistics()
  }, [])

  const splitIntoColumns = (data, numColumns) => {
    const columns = Array.from({ length: numColumns }, () => [])
    data.forEach((item, index) => {
      columns[index % numColumns].push(item)
    })
    return columns
  }

  const numColumns = 3
  const columns = stats ? splitIntoColumns(stats.data, numColumns) : []
  const calculatePercentage = (value, total) => {
    return total > 0 ? (value / total) * 100 : 0
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className="text-center">
              <strong>STATISTIQUES DES TECHNOLOGIES LES PLUS POSTULÉES</strong>
            </CCardHeader>
            <CCardBody>
              {loading ? (
                <CSpinner />
              ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
              ) : stats ? (
                <>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3">
                        <div className="text-body-secondary text-truncate small">Nombre total des offres</div>
                        <div className="fs-5 fw-semibold">{stats.totalOffers}</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">
                          Nombre total des candidatures
                        </div>
                        <div className="fs-5 fw-semibold">{stats.totalCandidates}</div>
                      </div>
                    </CCol>
                  </CRow>
                  <hr className="mt-0" />
                  <CRow>
                    {columns.map((column, columnIndex) => (
                      <CCol key={columnIndex}>
                        {column.map((item, index) => {
                          const percentage = calculatePercentage(item.result, stats.totalCandidates)
                          return (
                            <div className="progress-group mb-4" key={index}>
                              <div className="progress-group-prepend">
                                <span className="text-body-secondary small">{item.skill}</span>
                              </div>
                              <div className="progress-group-bars">
                                <CProgress thin color="info" value={percentage} />
                                <span className="ms-2">{percentage.toFixed(2)} % ({item.result} Candidats)</span>
                              </div>
                            </div>
                          )
                        })}
                      </CCol>
                    ))}
                  </CRow>
                </>
              ) : (
                <p>Aucune donnée disponible</p>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}
export default Dashboard

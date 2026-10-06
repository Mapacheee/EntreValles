import Avatar from './Avatar'
import Icon from './Icon'
import type { IconName } from './Icon'
import type { JourneyState } from '../lib/journey'
import type { Institution, SupportOption } from '../data/content'

export interface InterestItem {
  id: string
  title: string
  detail: string
  item: string
  icon: IconName
}

export interface PlanStepItem {
  id: string
  label: string
}

interface PrintableNotebookProps {
  state: JourneyState
  favoriteInstitutions: Institution[]
  savedSupports: SupportOption[]
  favoritePathways: string[]
  interestsList: InterestItem[]
  planStepsList: PlanStepItem[]
  className?: string
}

export default function PrintableNotebook({
  state,
  favoriteInstitutions,
  savedSupports,
  favoritePathways,
  interestsList,
  planStepsList,
  className = '',
}: PrintableNotebookProps) {
  const chosenInterests = interestsList.filter((i) => state.interests.includes(i.id))
  const todayStr = new Date().toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <article className={`pdf-report ${className}`}>
      {/* Encabezado del documento */}
      <header className="pdf-header">
        <div className="pdf-header-brand">
          <img
            src="/colegio-entre-valles.png"
            alt="Colegio Entre Valles"
            className="pdf-logo"
          />
          <div className="pdf-header-titles">
            <span className="pdf-badge">ORIENTACIÓN VOCACIONAL · TU PRÓXIMO PASO</span>
            <h1 className="pdf-title">Mi Bitácora de Exploración</h1>
            <p className="pdf-tagline">
              No hay un solo camino. Hay uno que vas construyendo tú.
            </p>
          </div>
        </div>
        <div className="pdf-meta-box">
          <div className="pdf-meta-row">
            <span className="pdf-meta-label">Fecha:</span>
            <strong>{todayStr}</strong>
          </div>
          <div className="pdf-meta-row">
            <span className="pdf-meta-label">Curso:</span>
            <strong>{state.course || 'Modo exploración'}</strong>
          </div>
          <div className="pdf-meta-row">
            <span className="pdf-meta-label">Región:</span>
            <span>Valparaíso, Chile</span>
          </div>
        </div>
      </header>

      {/* Bloque 1: Perfil del estudiante e intereses */}
      <div className="pdf-grid-two">
        {/* Mi punto de partida */}
        <section className="pdf-card">
          <div className="pdf-card-header">
            <span className="pdf-step-num">01</span>
            <h2>Mi punto de partida</h2>
          </div>
          <div className="pdf-traveler-summary">
            <div className="pdf-avatar-wrap">
              <Avatar
                pathways={favoritePathways}
                appearance={state.appearance}
                interests={state.interests}
                size={82}
              />
            </div>
            <div className="pdf-traveler-details">
              <h3>Lo que me motiva:</h3>
              {state.motivations.length > 0 ? (
                <ul className="pdf-list-pills">
                  {state.motivations.map((m) => (
                    <li key={m}>
                      <Icon name="check" size={13} />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="pdf-empty-text">Aún no se han seleccionado motivaciones.</p>
              )}

              {state.concern && (
                <div className="pdf-concern-box">
                  <Icon name="bulb" size={16} />
                  <div>
                    <strong>Una inquietud actual:</strong>
                    <p>{state.concern}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Lo que me mueve (Intereses) */}
        <section className="pdf-card">
          <div className="pdf-card-header">
            <span className="pdf-step-num">02</span>
            <h2>Lo que me mueve (Intereses)</h2>
          </div>
          {chosenInterests.length > 0 ? (
            <div className="pdf-interests-grid">
              {chosenInterests.map((interest) => (
                <div key={interest.id} className="pdf-interest-card">
                  <span className="pdf-interest-icon">
                    <Icon name={interest.icon} size={16} />
                  </span>
                  <div>
                    <strong>{interest.title}</strong>
                    <small>{interest.item}</small>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="pdf-empty-text">
              Explora y selecciona tus intereses en la parada «Lo que me mueve».
            </p>
          )}
        </section>
      </div>

      {/* Bloque 2: Instituciones seleccionadas */}
      <section className="pdf-card pdf-full-card">
        <div className="pdf-card-header">
          <span className="pdf-step-num">03</span>
          <h2>Destinos por explorar ({favoriteInstitutions.length})</h2>
          <small className="pdf-card-hint">
            Universidades, IP y CFT guardados para investigar
          </small>
        </div>

        {favoriteInstitutions.length > 0 ? (
          <div className="pdf-destinations-grid">
            {favoriteInstitutions.map((item) => (
              <div key={item.id} className="pdf-destination-item">
                <span
                  className="pdf-monogram"
                  style={{ backgroundColor: item.color || '#24566e' }}
                >
                  {item.shortName}
                </span>
                <div className="pdf-destination-content">
                  <div className="pdf-destination-topline">
                    <span className="pdf-dest-type">{item.type}</span>
                    <span className="pdf-dest-location">
                      <Icon name="pin" size={11} />
                      {item.location}
                    </span>
                  </div>
                  <h3 className="pdf-dest-name">{item.name}</h3>
                  <p className="pdf-dest-areas">
                    <strong>Áreas:</strong> {item.areas.join(' · ')}
                  </p>
                  <span className="pdf-dest-link">
                    <Icon name="external" size={11} />
                    {item.url.replace(/^https?:\/\//, '')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="pdf-empty-banner">
            <Icon name="heart" size={18} />
            <p>
              Aún no has guardado instituciones. En la sección <strong>«Explorar»</strong> puedes marcar con el corazón las universidades, institutos o CFT que llamen tu atención.
            </p>
          </div>
        )}
      </section>

      {/* Bloque 3: Apoyos y vías de acceso */}
      <section className="pdf-card pdf-full-card">
        <div className="pdf-card-header">
          <span className="pdf-step-num">04</span>
          <h2>Apoyos y vías de entrada ({savedSupports.length})</h2>
          <small className="pdf-card-hint">
            Financiamiento, gratuidad, becas y admisiones especiales
          </small>
        </div>

        {savedSupports.length > 0 ? (
          <div className="pdf-supports-grid">
            {savedSupports.map((item) => (
              <div key={item.id} className="pdf-support-item">
                <span className="pdf-support-icon">
                  <Icon
                    name={item.kind === 'Financiamiento' ? 'wallet' : 'door'}
                    size={16}
                  />
                </span>
                <div>
                  <div className="pdf-support-top">
                    <span className="pdf-support-kind">{item.kind}</span>
                    <strong className="pdf-support-name">{item.name}</strong>
                  </div>
                  <p className="pdf-support-desc">{item.description}</p>
                  <span className="pdf-support-link">
                    <Icon name="external" size={11} />
                    {item.url.replace(/^https?:\/\//, '')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="pdf-empty-banner">
            <Icon name="wallet" size={18} />
            <p>
              No has guardado apoyos aún. Revisa las paradas <strong>«Apoyos para el camino»</strong> (FUAS, Gratuidad, Becas) y <strong>«Otras puertas de entrada»</strong> (Admisión especial).
            </p>
          </div>
        )}
      </section>

      {/* Bloque 4: Próximos pasos y notas */}
      <div className="pdf-grid-two">
        {/* Mis próximos pasos */}
        <section className="pdf-card">
          <div className="pdf-card-header">
            <span className="pdf-step-num">05</span>
            <h2>Mis próximos pasos</h2>
          </div>
          <ul className="pdf-checklist">
            {planStepsList.map((step) => {
              const isChecked = state.checkedSteps.includes(step.id)
              return (
                <li key={step.id} className={isChecked ? 'is-checked' : ''}>
                  <span className="pdf-check-box">
                    {isChecked ? <Icon name="check" size={14} /> : null}
                  </span>
                  <span>{step.label}</span>
                </li>
              )
            })}
          </ul>
        </section>

        {/* Mis notas personales */}
        <section className="pdf-card">
          <div className="pdf-card-header">
            <span className="pdf-step-num">06</span>
            <h2>Mis ideas y preguntas para orientación</h2>
          </div>
          {state.note ? (
            <div className="pdf-notes-content">
              <p>{state.note}</p>
            </div>
          ) : (
            <div className="pdf-notes-placeholder">
              <p className="pdf-hint-text">
                Espacio para tus anotaciones personales durante tu entrevista de orientación:
              </p>
              <div className="pdf-ruled-lines">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Pie de página oficial del PDF */}
      <footer className="pdf-footer">
        <div className="pdf-footer-note">
          <Icon name="book" size={15} />
          <p>
            Esta bitácora es una herramienta de orientación para estudiantes del <strong>Colegio Entre Valles</strong>. Recuerda verificar las fechas, requisitos de postulación, vacantes y ponderaciones del proceso vigente en los sitios oficiales de cada institución y en <strong>acceso.mineduc.cl</strong>.
          </p>
        </div>
        <div className="pdf-footer-bottom">
          <span>Colegio Entre Valles · Región de Valparaíso, Chile</span>
          <span>Plataforma Tu Próximo Paso</span>
        </div>
      </footer>
    </article>
  )
}

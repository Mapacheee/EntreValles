export type InstitutionType = 'Universidad' | 'IP' | 'CFT'

export interface Institution {
  id: string
  name: string
  shortName: string
  type: InstitutionType
  location: string
  description: string
  areas: string[]
  url: string
  color?: string
}

export interface MilitaryPath {
  name: string
  description: string
  url: string
}

export interface MilitaryRoute {
  id: string
  name: string
  description: string
  paths: MilitaryPath[]
  url: string
}

export type SupportKind = 'Financiamiento' | 'Acceso especial' | 'Exploración'

export interface SupportOption {
  id: string
  name: string
  kind: SupportKind
  description: string
  steps: string[]
  url: string
}

export interface GlossaryEntry {
  term: string
  short: string
  description: string
  url: string
  linkLabel?: string
}

export const dataReviewedAt = '22 septiembre 2026'

export const contentNotice =
  'Esta es una selección inicial de opciones, no un catálogo completo. La fecha indica revisión de fuentes, no vigencia de convocatorias ni elegibilidad personal. Confirma carrera, sede, requisitos y fechas del proceso al que postularás en cada sitio oficial.'

// Áreas orientativas de la institución: no todas se imparten en cada sede.
// Las fichas no atribuyen acreditación, beneficios ni puntajes de ingreso.
export const institutions: Institution[] = [
  {
    id: 'pucv',
    name: 'Pontificia Universidad Católica de Valparaíso',
    shortName: 'PUCV',
    type: 'Universidad',
    location: 'Valparaíso, Viña del Mar, Quilpué y Quillota',
    description:
      'Una universidad con campus distribuidos por la región y formación en ciencias, ingeniería, humanidades y creación. Busca la ubicación de la carrera que te interesa.',
    areas: ['Ingeniería', 'Ciencias', 'Diseño', 'Educación', 'Ciencias sociales'],
    url: 'https://www.pucv.cl/pucv/pregrado/carreras',
    color: '#52728a',
  },
  {
    id: 'uv',
    name: 'Universidad de Valparaíso',
    shortName: 'UV',
    type: 'Universidad',
    location: 'Valparaíso, Viña del Mar y San Felipe',
    description:
      'Universidad estatal con presencia en la costa y el valle de Aconcagua. Explora sus facultades y revisa en qué campus se imparte cada carrera.',
    areas: ['Salud', 'Ciencias', 'Ingeniería', 'Ciencias sociales', 'Diseño'],
    url: 'https://www.uv.cl/institucion/valparaiso',
    color: '#477a91',
  },
  {
    id: 'usm',
    name: 'Universidad Técnica Federico Santa María',
    shortName: 'USM',
    type: 'Universidad',
    location: 'Valparaíso y Viña del Mar',
    description:
      'Explora caminos de formación científica, tecnológica, profesional y técnica. Casa Central Valparaíso y Sede Viña del Mar tienen ofertas diferentes.',
    areas: ['Ingeniería', 'Tecnología', 'Ciencias'],
    url: 'https://usm.cl/universidad/campus-y-sedes/',
    color: '#b68442',
  },
  {
    id: 'upla',
    name: 'Universidad de Playa Ancha',
    shortName: 'UPLA',
    type: 'Universidad',
    location: 'Valparaíso y San Felipe',
    description:
      'Universidad estatal con formación en educación, artes, ciencias y otras áreas. Sus campus también permiten explorar opciones desde el interior de la región.',
    areas: ['Educación', 'Artes', 'Ciencias sociales', 'Salud', 'Ingeniería'],
    url: 'https://www.upla.cl/sanfelipe/',
    color: '#817192',
  },
  {
    id: 'duoc',
    name: 'Instituto Profesional Duoc UC',
    shortName: 'Duoc UC',
    type: 'IP',
    location: 'Valparaíso y Viña del Mar',
    description:
      'Carreras técnicas y profesionales en distintas escuelas. Compara la oferta de ambas sedes: una misma institución puede tener carreras distintas en cada ciudad.',
    areas: ['Tecnología', 'Diseño', 'Administración', 'Salud', 'Turismo'],
    url: 'https://www.duoc.cl/oferta-academica/',
    color: '#b4923f',
  },
  {
    id: 'aiep',
    name: 'Instituto Profesional AIEP',
    shortName: 'AIEP',
    type: 'IP',
    location: 'Viña del Mar',
    description:
      'Su sede de Viña del Mar ofrece formación técnica y profesional en áreas como tecnología, administración, salud y sonido. Revisa jornada y modalidad de cada programa.',
    areas: ['Tecnología', 'Administración', 'Salud', 'Artes'],
    url: 'https://www.aiep.cl/admision/donde-estudiar/aiep-vina-del-mar/',
    color: '#ac675f',
  },
  {
    id: 'cft-pucv',
    name: 'Centro de Formación Técnica PUCV',
    shortName: 'CFT PUCV',
    type: 'CFT',
    location: 'Valparaíso, Viña del Mar, Limache y otras comunas',
    description:
      'Una institución de formación técnica de nivel superior con sedes en la región. Consulta su oferta por sede; tiene un proceso de admisión propio, distinto al de la universidad.',
    areas: ['Tecnología', 'Administración', 'Salud', 'Educación'],
    url: 'https://cftpucv.cl/sedes/',
    color: '#718363',
  },
  {
    id: 'cft-estatal',
    name: 'CFT Estatal de la Región de Valparaíso',
    shortName: 'CFT Estatal',
    type: 'CFT',
    location: 'San Antonio, Viña del Mar, Los Andes y Limache',
    description:
      'Formación técnica estatal con presencia en distintas provincias. Explora carreras vinculadas a tecnología, gestión, logística y servicios, según la sede.',
    areas: ['Tecnología', 'Administración', 'Logística', 'Salud'],
    url: 'https://tecnologicovalparaiso.cl/sede-san-antonio/',
    color: '#4d877d',
  },
]

export const militaryRoutes: MilitaryRoute[] = [
  {
    id: 'ejercito',
    name: 'Ejército de Chile',
    description:
      'Explora la carrera militar terrestre. Conoce las funciones, la vida de escuela y los compromisos de servicio de cada vía antes de decidir.',
    paths: [
      {
        name: 'Escuela Militar · Oficiales',
        description: 'Formación inicial para la carrera de oficial del Ejército.',
        url: 'https://www.ejercito.cl/unete',
      },
      {
        name: 'Escuela de Suboficiales',
        description: 'Formación para la carrera de suboficial en las armas y servicios del Ejército.',
        url: 'https://ejercito.cl/tramites-en-linea',
      },
    ],
    url: 'https://www.ejercito.cl/unete',
  },
  {
    id: 'armada',
    name: 'Armada de Chile',
    description:
      'Una ruta relacionada con el mar, la defensa y el servicio naval. Oficiales y Gente de Mar tienen procesos y trayectorias distintos.',
    paths: [
      {
        name: 'Escuela Naval Arturo Prat · Oficiales',
        description: 'Forma oficiales de Marina en Playa Ancha, Valparaíso.',
        url: 'https://escuelanaval.cl/admision-preguntas-frecuentes/',
      },
      {
        name: 'Escuela de Grumetes · Gente de Mar',
        description:
          'Inicia la formación de Gente de Mar, cuya carrera contempla progresión hacia grados de suboficial.',
        url: 'https://www.admisionarmada.cl/',
      },
    ],
    url: 'https://www.admisionarmada.cl/',
  },
  {
    id: 'fach',
    name: 'Fuerza Aérea de Chile',
    description:
      'Conoce la formación militar y tecnológica vinculada a operaciones aéreas. Las especialidades y los requisitos dependen de cada proceso.',
    paths: [
      {
        name: 'Escuela de Aviación · Oficiales',
        description: 'Forma a los futuros oficiales de la Fuerza Aérea.',
        url: 'https://admision.fach.mil.cl/escuela-aviacion.html',
      },
      {
        name: 'Escuela de Especialidades · Suboficiales',
        description: 'Forma personal en especialidades técnicas, operativas y de apoyo institucional.',
        url: 'https://admision.fach.mil.cl/escuela-especialidades.html',
      },
    ],
    url: 'https://admision.fach.mil.cl/',
  },
  {
    id: 'carabineros',
    name: 'Carabineros de Chile',
    description:
      'La formación inicial tiene vías propias. La Escuela de Formación es la puerta de entrada del personal de nombramiento institucional; la Escuela de Suboficiales cumple otra función.',
    paths: [
      {
        name: 'Escuela de Carabineros · Oficiales',
        description: 'Formación inicial de oficiales de la institución.',
        url: 'https://cecipu.gob.cl/planteles-educacionales/',
      },
      {
        name: 'Escuela de Formación · ESFOCAR',
        description:
          'Forma carabineros de Orden y Seguridad para el escalafón de nombramiento institucional.',
        url: 'https://siga.esfocar.carabineros.cl/',
      },
    ],
    url: 'https://www.chileatiende.gob.cl/instituciones/carabineros-de-chile',
  },
  {
    id: 'pdi',
    name: 'Policía de Investigaciones de Chile',
    description:
      'La carrera de detective se orienta a la investigación policial. Su estructura no se explica con la misma división de escuelas que las Fuerzas Armadas.',
    paths: [
      {
        name: 'Escuela de Investigaciones Policiales',
        description:
          'Vía de formación de futuros detectives. Revisa el proceso de Investigador Policial, sus etapas y requisitos.',
        url: 'https://www.escuelapdi.cl/admision/',
      },
    ],
    url: 'https://www.escuelapdi.cl/etapas-del-proceso-de-admision/',
  },
]

export const supportOptions: SupportOption[] = [
  {
    id: 'fuas',
    name: 'FUAS · Tu primer paso',
    kind: 'Financiamiento',
    description:
      'El Formulario Único de Acreditación Socioeconómica permite postular a gratuidad, becas y créditos de arancel. Completarlo no significa obtener un beneficio automáticamente.',
    steps: [
      'Revisa las fechas del proceso en el sitio oficial.',
      'Reúne la información de tu grupo familiar e ingresos.',
      'Completa y envía el formulario; guarda el comprobante.',
      'Consulta resultados y sigue las indicaciones de acreditación y matrícula.',
    ],
    url: 'https://portal.beneficiosestudiantiles.cl/guia-paso-paso-postulacion',
  },
  {
    id: 'gratuidad',
    name: 'Gratuidad',
    kind: 'Financiamiento',
    description:
      'Financia matrícula y arancel durante la duración nominal de la carrera para quienes cumplen sus requisitos y estudian en una institución adscrita. Considera también transporte y materiales en tu presupuesto.',
    steps: [
      'Completa el FUAS durante el periodo correspondiente.',
      'Consulta los requisitos y la lista de instituciones adscritas.',
      'Confirma la asignación del beneficio y sus condiciones de renovación.',
    ],
    url: 'https://portal.beneficiosestudiantiles.cl/gratuidad',
  },
  {
    id: 'becas',
    name: 'Becas y otros beneficios',
    kind: 'Financiamiento',
    description:
      'Las becas pueden financiar una parte o la totalidad de determinados costos. Cada una tiene cobertura, requisitos y renovación propios; un crédito, en cambio, debe devolverse.',
    steps: [
      'Compara qué cubre cada beneficio y qué gastos quedan pendientes.',
      'Revisa si requiere FUAS o un formulario específico.',
      'Consulta también los apoyos internos de la institución que te interesa.',
    ],
    url: 'https://portal.beneficiosestudiantiles.cl/preguntas-frecuentes/postulacion',
  },
  {
    id: 'pace',
    name: 'PACE',
    kind: 'Acceso especial',
    description:
      'Acompaña a estudiantes de establecimientos participantes y ofrece una vía de acceso con cupos en universidades en convenio. Debes cumplir los criterios de habilitación del proceso.',
    steps: [
      'Pregunta en orientación si tu establecimiento participa.',
      'Revisa los criterios de habilitación y las actividades del programa.',
      'Consulta la oferta de cupos y el procedimiento de postulación.',
    ],
    url: 'https://educacionsuperior.mineduc.cl/pace/',
  },
  {
    id: 'propedeutico-pucv',
    name: 'Propedéutico PUCV',
    kind: 'Acceso especial',
    description:
      'Programa para explorar áreas y prepararte para la vida universitaria durante 4° medio. La vía de admisión asociada exige cumplir las condiciones académicas y de participación.',
    steps: [
      'Consulta la convocatoria y los ejes de tu año.',
      'Revisa los antecedentes solicitados y postula en el plazo oficial.',
      'Confirma requisitos de aprobación y carreras disponibles por esta vía.',
    ],
    url: 'https://www.pucv.cl/uuaa/direccion-de-inclusion-pucv/programa-propedeutico-pucv',
  },
  {
    id: 'propedeuticos-uv',
    name: 'Propedéuticos UV',
    kind: 'Acceso especial',
    description:
      'La UV ofrece programas de preparación y acceso inclusivo, incluidos el Propedéutico UNESCO y el pedagógico. Cada programa define su participación y condiciones de ingreso.',
    steps: [
      'Conoce las diferencias entre los programas.',
      'Pregunta por la vinculación de tu establecimiento.',
      'Revisa convocatoria, compromisos de asistencia y requisitos de egreso.',
    ],
    url: 'https://divacad.uv.cl/propedeuticos-uv',
  },
  {
    id: 'technovation',
    name: 'Technovation Girls Chile',
    kind: 'Exploración',
    description:
      'Una oportunidad para explorar tecnología mediante proyectos. El programa informa vías de admisión especial en instituciones con convenio para participantes que cumplen las condiciones; no garantiza un cupo.',
    steps: [
      'Revisa las convocatorias y condiciones de participación.',
      'Explora qué aprenderías y cómo desarrollar un proyecto.',
      'Consulta por separado las condiciones de cada convenio universitario.',
    ],
    url: 'https://technovation.cl/admision-especial-universidades/',
  },
]

export const glossary: GlossaryEntry[] = [
  {
    term: 'NEM',
    short: 'Tus notas de enseñanza media.',
    description:
      'Las Notas de Enseñanza Media se obtienen a partir de tus promedios anuales. Ese promedio se transforma en un puntaje NEM con la tabla oficial correspondiente a tu modalidad educativa. Nota y puntaje son cosas distintas.',
    url: 'https://acceso.mineduc.cl/puntajes-notas-ensenanza-media-nem-y-ranking/',
  },
  {
    term: 'Ranking',
    short: 'Tu trayectoria escolar en su contexto.',
    description:
      'Es un factor de selección que considera tus notas en relación con el contexto educativo donde estudiaste. No es una competencia con tus compañeros actuales. Su fórmula cambia desde la admisión 2028: consulta la información de tu proceso.',
    url: 'https://acceso.mineduc.cl/puntajes-notas-ensenanza-media-nem-y-ranking/',
  },
  {
    term: 'PAES',
    short: 'Pruebas de Acceso a la Educación Superior.',
    description:
      'Sus resultados se usan en la admisión universitaria centralizada. Hay pruebas obligatorias, electivas y Competencia Matemática 2 (M2), exigida por determinadas carreras. Revisa qué pruebas pide cada opción y qué puntajes estarán vigentes.',
    url: 'https://acceso.mineduc.cl/preguntas-frecuentes/informacion-general-paes/',
    linkLabel: 'Conocer la PAES en Mineduc',
  },
  {
    term: 'Ponderación',
    short: 'Cuánto pesa cada factor para una carrera.',
    description:
      'Es el porcentaje que una carrera asigna al NEM, Ranking y pruebas exigidas. Al combinar esos factores se obtiene tu puntaje ponderado. Las ponderaciones pueden cambiar entre carreras, instituciones y procesos.',
    url: 'https://portaldemre.demre.cl/paes/factores-seleccion/',
  },
  {
    term: 'Arancel',
    short: 'El costo de cursar un año de una carrera.',
    description:
      'El arancel anual o real es el cobro por un año de estudios y no incluye la matrícula. El arancel de referencia es otro valor, definido por Mineduc para determinados beneficios, y puede ser menor al cobro real.',
    url: 'https://portal.beneficiosestudiantiles.cl/glosario/A',
  },
  {
    term: 'Matrícula',
    short: 'Formalizar tu incorporación a una institución.',
    description:
      'Es el proceso para incorporarte como estudiante y también puede nombrar un cobro distinto del arancel. Cada institución fija sus pasos y condiciones. Ser seleccionado o completar el FUAS no reemplaza matricularse.',
    url: 'https://portal.beneficiosestudiantiles.cl/guia-paso-paso-postulacion',
  },
  {
    term: 'Acreditación',
    short: 'Una evaluación externa de calidad.',
    description:
      'La acreditación institucional evalúa el proyecto y los mecanismos de calidad de una institución. No es lo mismo que la acreditación de una carrera o programa. Revisa en la CNA el estado, tipo y vigencia de la acreditación que estás consultando.',
    url: 'https://www.cnachile.cl/Paginas/buscador-avanzado.aspx',
  },
  {
    term: 'Puntaje de corte',
    short: 'Una referencia de un proceso anterior.',
    description:
      'Suele informar el puntaje del último seleccionado de una carrera en un proceso. Revisa si la fuente habla de selección o matrícula, y de qué año y vía. Superar un corte pasado no garantiza ingresar: cambia según vacantes y postulaciones. Explora las carreras en el buscador de Acceso Mineduc y confirma el corte del proceso que te interesa con cada institución.',
    url: 'https://acceso-sup.mineduc.cl/acceso-buscador/buscador-cu',
    linkLabel: 'Consultar el buscador de carreras de Mineduc',
  },
]

// All copy lives here, in Spanish and English. Facts come from the public GitHub profile and
// each repository's README; live figures (commits, languages) come from data/github.json.

export const LINKS = {
  github: 'https://github.com/DiegoTepichin',
  linkedin: 'https://www.linkedin.com/in/diego-duron-tepichin',
  email: 'durontepichindiego@gmail.com',
  cafe: 'https://cafe-pricing.com',
  cafeEmail: 'cafe.licensing@proton.me',
};

export const SECTIONS = [
  { id: 'inicio', no: '00', label: { es: 'Inicio', en: 'Index' } },
  { id: 'principios', no: '01', label: { es: 'Principios', en: 'Principles' } },
  { id: 'obra', no: '02', label: { es: 'Obra', en: 'Work' } },
  { id: 'cifras', no: '03', label: { es: 'Cifras', en: 'Figures' } },
  { id: 'contacto', no: '04', label: { es: 'Contacto', en: 'Contact' } },
];

export const UI = {
  role: { es: 'Ingeniero de sistemas', en: 'Systems engineer' },
  available: { es: 'Disponible · remoto', en: 'Available · remote' },
  open: { es: 'Abrir', en: 'Open' },
  close: { es: 'Cerrar', en: 'Close' },
  visit: { es: 'Visitar', en: 'Visit' },
  copy: { es: 'Copiar', en: 'Copy' },
  copied: { es: 'Copiado', en: 'Copied' },
  write: { es: 'Escribir', en: 'Write' },
  repo: { es: 'Repositorio', en: 'Repository' },
  liveSite: { es: 'Sitio en vivo', en: 'Live site' },
  commits: { es: 'commits', en: 'commits' },
  private: { es: 'privado', en: 'private' },
  theme: { es: 'Cambiar tema', en: 'Toggle theme' },
  language: { es: 'Switch to English', en: 'Cambiar a español' },
  run: { es: 'Ejecutar', en: 'Run' },
  source: { es: 'Fuente', en: 'Source' },
};

export const HERO = {
  lede: {
    es: [
      'Software basado en datos donde se cruzan el ',
      ['pricing'],
      ', el ',
      ['machine learning'],
      ' y la operación real de los negocios.',
    ],
    en: [
      'Data-driven software where ',
      ['pricing'],
      ', ',
      ['machine learning'],
      ' and real-world operations meet.',
    ],
  },
  facts: [
    {
      k: { es: 'Rol', en: 'Role' },
      v: {
        es: 'Ingeniero de sistemas · Fundador de CAFE',
        en: 'Systems engineer · Founder of CAFE',
      },
    },
    {
      k: { es: 'Base', en: 'Based' },
      v: { es: 'Metepec, México · UTC−6', en: 'Metepec, Mexico · UTC−6' },
    },
    {
      k: { es: 'Abierto a', en: 'Open to' },
      v: { es: 'Roles remotos de backend / ML', en: 'Remote backend / ML roles' },
    },
    {
      k: { es: 'Idiomas', en: 'Languages' },
      v: { es: 'Español · Inglés', en: 'Spanish · English' },
    },
  ],
  scroll: { es: 'Desliza', en: 'Scroll' },
};

export const PRINCIPLES = {
  title: { es: 'Principios', en: 'Principles' },
  statement: {
    es: 'Hoy me enfoco en métodos causales para precios dinámicos y en herramientas abiertas para México y Latinoamérica.',
    en: 'Right now I focus on causal methods for dynamic pricing, and on open tools for Mexico and Latin America.',
  },
  note: {
    es: 'Cuatro reglas que se pueden comprobar en el código.',
    en: 'Four rules you can verify in the code.',
  },
  items: [
    {
      title: { es: 'Causalidad antes que correlación.', en: 'Causation before correlation.' },
      body: {
        es: 'Un precio se decide con la respuesta real de la demanda, no con una coincidencia en los datos.',
        en: 'A price is set from how demand actually responds, not from a coincidence in the data.',
      },
      proof: 'CAFE',
      href: LINKS.cafe,
    },
    {
      title: { es: 'Cada cifra cita su fuente.', en: 'Every figure cites its source.' },
      body: {
        es: 'Tasas, tarifas y umbrales nombran el documento oficial del que salen y la fecha en que aplican.',
        en: 'Rates, brackets and thresholds name the official document they come from and the date they apply to.',
      },
      proof: 'mcp-mexico · calculadoras-mx',
      href: 'https://github.com/DiegoTepichin/calculadoras-mx',
    },
    {
      title: {
        es: 'Nada llega a main sin pasar las compuertas.',
        en: 'Nothing reaches main without passing the gates.',
      },
      body: {
        es: 'Lint, tipos, análisis de seguridad y pruebas son los mismos en local y en CI.',
        en: 'Lint, typing, security analysis and tests are the same locally and in CI.',
      },
      proof: 'cicd-pipeline',
      href: 'https://github.com/DiegoTepichin/cicd-pipeline',
    },
    {
      title: {
        es: 'La infraestructura se escribe, no se arma a mano.',
        en: 'Infrastructure is written, not clicked together.',
      },
      body: {
        es: 'Tres ambientes salen de los mismos módulos; solo cambian las variables.',
        en: 'Three environments come from the same modules; only the variables change.',
      },
      proof: 'iac-terraform',
      href: 'https://github.com/DiegoTepichin/iac-terraform',
    },
  ],
};

export const WORK = {
  title: { es: 'Obra', en: 'Work' },
  note: {
    es: 'Seis piezas. Cada fila se abre: adentro hay una demostración que puedes tocar.',
    en: 'Six pieces. Each row opens: inside there is a demo you can touch.',
  },
};

// `repo` joins a project with its entry in data/github.json. CAFE is a private product.
export const PROJECTS = [
  {
    id: 'cafe',
    name: 'CAFE',
    kind: { es: 'Motor de precios dinámicos', en: 'Dynamic pricing engine' },
    language: 'Python',
    badge: 'v4.3.0',
    summary: {
      es: 'Causal Adaptive Fusion Engine. Estima cómo responde realmente la demanda al precio —con inferencia causal en lugar de correlación— y lo convierte en recomendaciones de precio que se adaptan con el tiempo.',
      en: 'Causal Adaptive Fusion Engine. It estimates how demand actually responds to price — using causal inference instead of correlation — and turns that into price recommendations that adapt over time.',
    },
    facts: [
      {
        k: { es: 'Estado', en: 'Status' },
        v: {
          es: 'Disponible para licenciamiento y adquisición',
          en: 'Available for licensing and acquisition',
        },
      },
      {
        k: { es: 'Stack', en: 'Stack' },
        v: 'Python · NumPy · SciPy · pandas · XGBoost · LightGBM · FastAPI',
      },
      {
        k: { es: 'Capas', en: 'Layers' },
        v: {
          es: 'Datos de mercado → elasticidad causal → pronóstico de demanda → optimizador con restricciones → incertidumbre calibrada → decisión de precio',
          en: 'Market data → causal elasticity → demand forecast → constrained optimizer → calibrated uncertainty → price decision',
        },
      },
    ],
    links: [
      { label: 'cafe-pricing.com', href: LINKS.cafe },
      { label: LINKS.cafeEmail, href: `mailto:${LINKS.cafeEmail}` },
    ],
    demo: 'elasticity',
  },
  {
    id: 'calculadoras-mx',
    repo: 'calculadoras-mx',
    name: 'calculadoras-mx',
    kind: { es: 'Calculadoras fiscales y laborales', en: 'Tax & labor calculators' },
    summary: {
      es: 'Calculadoras de código abierto para México y Colombia: ISR, nómina, IMSS, finiquito. Cada resultado muestra la fórmula con tus números sustituidos, para que cualquiera pueda verificarla contra la ley que cita.',
      en: 'Open-source calculators for Mexico and Colombia: income tax, payroll, social security, severance. Every result shows the formula with your numbers substituted in, so anyone can check the math against the law it cites.',
    },
    facts: [
      {
        k: { es: 'Alcance', en: 'Scope' },
        v: { es: '11 calculadoras · 2 países', en: '11 calculators · 2 countries' },
      },
      {
        k: { es: 'Datos', en: 'Data' },
        v: {
          es: 'Una fuente oficial citada por archivo (SAT, DOF, INEGI, DIAN). Nada se consulta en tiempo de ejecución.',
          en: 'One official source cited per file (SAT, DOF, INEGI, DIAN). Nothing is fetched at runtime.',
        },
      },
      {
        k: { es: 'Stack', en: 'Stack' },
        v: {
          es: 'Next.js 16 · TypeScript · sitio estático',
          en: 'Next.js 16 · TypeScript · fully static',
        },
      },
    ],
    demo: 'isr',
  },
  {
    id: 'mcp-mexico',
    repo: 'mcp-mexico',
    name: 'mcp-mexico',
    kind: { es: 'Servidor MCP de datos públicos', en: 'MCP server for public data' },
    summary: {
      es: 'Da a los agentes de IA datos oficiales de México: tipo de cambio FIX y tasas de Banxico, inflación del INEGI, UMA y tablas de ISR. Cada resultado nombra su fuente oficial y la fecha a la que aplica.',
      en: 'Gives AI agents official Mexican data: Banxico FIX exchange and interest rates, INEGI inflation, UMA values and ISR tax tables. Every result names its official source and the date it applies to.',
    },
    facts: [
      {
        k: { es: 'Herramientas', en: 'Tools' },
        v: {
          es: '8 · dos funcionan sin conexión ni tokens',
          en: '8 · two work offline with no tokens',
        },
      },
      { k: { es: 'Clientes', en: 'Clients' }, v: 'Claude Desktop · Claude Code · Cursor' },
      { k: { es: 'Stack', en: 'Stack' }, v: 'Python · Model Context Protocol · uv' },
    ],
    demo: 'tools',
  },
  {
    id: 'cicd-pipeline',
    repo: 'cicd-pipeline',
    name: 'cicd-pipeline',
    kind: { es: 'Cadena de entrega con compuertas', en: 'Security-gated delivery chain' },
    summary: {
      es: 'Una API Flask deliberadamente pequeña como vehículo de una cadena de entrega completa. Cada cambio pasa por lint, tipos, SAST, pruebas con umbral de cobertura, una imagen endurecida, smoke test y escaneo de vulnerabilidades. Solo entonces la imagen se firma y se publica.',
      en: 'A deliberately small Flask API as the vehicle for a complete delivery chain. Every change goes through lint, typing, SAST, tests with a coverage threshold, a hardened image, a smoke test and a vulnerability scan. Only then is the image signed and published.',
    },
    facts: [
      { k: { es: 'Cobertura', en: 'Coverage' }, v: { es: 'Umbral ≥ 90 %', en: 'Threshold ≥ 90%' } },
      { k: { es: 'Matriz', en: 'Matrix' }, v: 'Python 3.11 – 3.14' },
      {
        k: { es: 'Artefacto', en: 'Artifact' },
        v: {
          es: 'Imagen amd64 + arm64 firmada con Cosign, con SBOM y procedencia',
          en: 'amd64 + arm64 image signed with Cosign, with SBOM and provenance',
        },
      },
    ],
    demo: 'flow',
    flow: [
      { name: 'pre-commit', note: 'ruff · mypy · hadolint' },
      { name: 'Ruff', note: { es: 'lint + formato', en: 'lint + format' } },
      { name: 'mypy', note: { es: 'tipos', en: 'typing' } },
      { name: 'Bandit', note: 'SAST' },
      { name: 'pytest', note: { es: 'cobertura ≥ 90 %', en: 'coverage ≥ 90%' } },
      { name: 'Buildx', note: 'amd64 + arm64 · SBOM' },
      { name: 'Smoke', note: 'GET /health' },
      { name: 'Trivy', note: 'CRITICAL / HIGH = fail' },
      { name: 'Cosign', note: { es: 'firma sin llaves', en: 'keyless signature' } },
      { name: 'GHCR', note: ':sha · :latest' },
    ],
  },
  {
    id: 'sys-monitor',
    repo: 'sys-monitor',
    name: 'sys-monitor',
    kind: { es: 'Monitoreo de host en tiempo real', en: 'Real-time host monitoring' },
    summary: {
      es: 'Un agente psutil, una API Flask autenticada y un dashboard en React. Una alternativa pequeña y autocontenida para cuando Prometheus + Grafana son demasiado para un solo servidor, un homelab o una máquina de desarrollo.',
      en: 'A psutil agent, an authenticated Flask API and a React dashboard. A small, self-contained alternative for when Prometheus + Grafana are a lot to run for a single server, a homelab or a dev box.',
    },
    facts: [
      {
        k: { es: 'Vista', en: 'View' },
        v: {
          es: 'CPU, memoria, disco, red y procesos en vivo',
          en: 'Live CPU, memory, disk, network and processes',
        },
      },
      {
        k: { es: 'Ingesta', en: 'Ingestion' },
        v: { es: 'API key verificada en tiempo constante', en: 'API key checked in constant time' },
      },
      {
        k: { es: 'Despliegue', en: 'Deploy' },
        v: { es: 'Un contenedor · docker compose up', en: 'One container · docker compose up' },
      },
    ],
    demo: 'flow',
    flow: [
      { name: 'agent.py', note: 'psutil · daemon' },
      { name: 'POST', note: '/api/metrics' },
      { name: 'Auth', note: 'X-API-Key' },
      { name: { es: 'Umbrales', en: 'Thresholds' }, note: 'CPU · RAM · disk' },
      { name: 'FIFO', note: 'deque(maxlen) + Lock' },
      { name: 'Dashboard', note: { es: 'React · cada 2 s', en: 'React · every 2 s' } },
    ],
  },
  {
    id: 'iac-terraform',
    repo: 'iac-terraform',
    name: 'iac-terraform',
    kind: { es: 'AWS multi-ambiente como código', en: 'Multi-environment AWS as code' },
    summary: {
      es: 'Infraestructura de AWS modular y segura por defecto en tres ambientes aislados (dev, staging, prod) desde una sola base de código: VPC, ALB y Auto Scaling en subredes privadas, con state remoto bloqueado, pruebas y CI con escaneo de seguridad.',
      en: 'Modular, secure-by-default AWS infrastructure across three isolated environments (dev, staging, prod) from a single codebase: VPC, ALB and Auto Scaling in private subnets, with locked remote state, tests and a CI pipeline with security scanning.',
    },
    facts: [
      { k: 'Checkov', v: { es: '58 aprobadas · 0 fallidas', en: '58 passed · 0 failed' } },
      {
        k: 'State',
        v: {
          es: 'S3 cifrado y versionado · bloqueo en DynamoDB',
          en: 'Encrypted, versioned S3 · DynamoDB lock',
        },
      },
      { k: { es: 'Ambientes', en: 'Environments' }, v: 'dev · staging · prod' },
    ],
    demo: 'flow',
    flow: [
      { name: 'fmt', note: 'terraform fmt' },
      { name: 'validate', note: { es: 'entradas validadas', en: 'validated inputs' } },
      { name: 'test', note: 'terraform test' },
      { name: 'tflint', note: 'lint' },
      { name: 'checkov', note: '58 / 0' },
      { name: 'plan', note: 'make plan' },
      { name: 'apply', note: 'dev · staging · prod' },
    ],
  },
];

// The eight tools exposed by mcp-mexico, as listed in its README.
export const MCP_TOOLS = [
  {
    name: 'get_fix_rate',
    what: { es: 'Tipo de cambio FIX USD/MXN', en: 'FIX USD/MXN exchange rate' },
    source: 'Banxico SIE',
  },
  {
    name: 'get_fix_rate_range',
    what: { es: 'FIX diario entre dos fechas', en: 'Daily FIX between two dates' },
    source: 'Banxico SIE',
  },
  {
    name: 'get_interest_rate',
    what: { es: 'Tasa objetivo, TIIE, CETES', en: 'Target rate, TIIE, CETES' },
    source: 'Banxico SIE',
  },
  {
    name: 'get_interest_rate_range',
    what: { es: 'Una tasa entre dos fechas', en: 'One rate between two dates' },
    source: 'Banxico SIE',
  },
  {
    name: 'get_inflation',
    what: { es: 'INPC e inflación de un mes', en: 'INPC index and inflation for a month' },
    source: 'INEGI',
  },
  {
    name: 'get_inflation_range',
    what: { es: 'Inflación mes a mes en un rango', en: 'Monthly inflation over a range' },
    source: 'INEGI',
  },
  {
    name: 'get_uma',
    what: { es: 'Valores de la UMA 2020–2026', en: 'UMA values 2020–2026' },
    source: 'INEGI',
    offline: true,
  },
  {
    name: 'get_isr_table',
    what: { es: 'Tablas de ISR 2020–2026', en: 'ISR tax tables 2020–2026' },
    source: 'SAT / DOF',
    offline: true,
  },
];

export const MCP_INSTALL =
  'claude mcp add mcp-mexico -e BANXICO_TOKEN=your-token -e INEGI_TOKEN=your-token -- uvx mcp-mexico';

export const DEMOS = {
  elasticity: {
    caption: { es: 'Por qué importa la elasticidad', en: 'Why elasticity matters' },
    slider: { es: 'Elasticidad precio de la demanda', en: 'Price elasticity of demand' },
    best: { es: 'Precio óptimo', en: 'Best price' },
    cost: { es: '× costo unitario', en: '× unit cost' },
    margin: { es: 'Margen', en: 'Margin' },
    axis: { es: 'precio →', en: 'price →' },
    profit: { es: 'utilidad', en: 'profit' },
    note: {
      es: 'Modelo de libro de texto (demanda de elasticidad constante), no el motor. Un error en la elasticidad es un error en el precio: por eso CAFE la estima de forma causal y con intervalos.',
      en: 'Textbook model (constant-elasticity demand), not the engine. An error in elasticity is an error in price: that is why CAFE estimates it causally, with intervals.',
    },
  },
  isr: {
    caption: { es: 'ISR mensual 2026, calculado aquí', en: 'Monthly ISR 2026, computed here' },
    slider: { es: 'Ingreso gravable mensual', en: 'Monthly taxable income' },
    result: { es: 'ISR del mes', en: 'ISR for the month' },
    rate: { es: 'Tasa efectiva', en: 'Effective rate' },
    how: { es: 'Cómo se calculó', en: 'How it was computed' },
    lower: { es: 'límite inferior', en: 'lower limit' },
    excess: { es: 'excedente', en: 'excess' },
    fixed: { es: 'cuota fija', en: 'fixed fee' },
    note: {
      es: 'Tarifa del Art. 96 LISR (Anexo 8 RMF 2026), la misma que usa el repositorio. Antes del subsidio para el empleo; la calculadora completa lo aplica.',
      en: 'Art. 96 LISR tariff (Anexo 8 RMF 2026), the same one the repository uses. Before the employment subsidy; the full calculator applies it.',
    },
  },
  tools: {
    caption: { es: 'Las ocho herramientas', en: 'The eight tools' },
    offline: { es: 'sin conexión', en: 'offline' },
    install: { es: 'Instalar en Claude Code', en: 'Install in Claude Code' },
  },
  flow: {
    caption: { es: 'El recorrido de un cambio', en: 'The path of a change' },
  },
};

export const FIGURES = {
  title: { es: 'Cifras', en: 'Figures' },
  note: {
    es: 'Sin adjetivos. Lo que dice GitHub y lo que dicen los repositorios.',
    en: 'No adjectives. What GitHub says and what the repositories say.',
  },
  curated: [
    {
      value: '11',
      label: { es: 'calculadoras en 2 países', en: 'calculators across 2 countries' },
      source: 'calculadoras-mx',
    },
    {
      value: '8',
      label: { es: 'herramientas MCP con fuente oficial', en: 'MCP tools with official sources' },
      source: 'mcp-mexico',
    },
    {
      value: '58/0',
      label: {
        es: 'revisiones Checkov aprobadas / fallidas',
        en: 'Checkov checks passed / failed',
      },
      source: 'iac-terraform',
    },
    {
      value: '≥90%',
      label: { es: 'cobertura exigida para publicar', en: 'coverage required to ship' },
      source: 'cicd-pipeline',
    },
  ],
  repos: { es: 'repositorios públicos', en: 'public repositories' },
  commits: { es: 'commits en repositorios públicos', en: 'commits across public repositories' },
  languages: { es: 'Código por lenguaje', en: 'Code by language' },
  toolbox: { es: 'Herramientas', en: 'Toolbox' },
  synced: { es: 'API pública de GitHub, sincronizada el', en: 'GitHub public API, synced on' },
};

export const TOOLBOX = [
  {
    group: { es: 'Datos y ML', en: 'Data & ML' },
    items: ['Python', 'NumPy', 'SciPy', 'pandas', 'scikit-learn', 'XGBoost', 'LightGBM'],
  },
  { group: { es: 'Backend', en: 'Backend' }, items: ['FastAPI', 'Flask', 'MCP', 'pytest'] },
  { group: { es: 'Web', en: 'Web' }, items: ['TypeScript', 'React', 'Next.js'] },
  {
    group: { es: 'Entrega', en: 'Delivery' },
    items: ['Docker', 'GitHub Actions', 'Terraform', 'AWS', 'Trivy', 'Cosign'],
  },
];

export const CONTACT = {
  title: { es: 'Contacto', en: 'Contact' },
  word: { es: 'Hablemos', en: 'Let’s talk' },
  body: {
    es: 'Busco roles remotos de backend y machine learning. Si CAFE te interesa para licenciamiento o adquisición, también es aquí.',
    en: 'I am looking for remote backend and machine learning roles. If CAFE interests you for licensing or acquisition, this is also the place.',
  },
  channels: [
    { k: 'Email', v: LINKS.email, href: `mailto:${LINKS.email}`, copy: LINKS.email },
    { k: 'LinkedIn', v: 'in/diego-duron-tepichin', href: LINKS.linkedin },
    { k: 'GitHub', v: 'DiegoTepichin', href: LINKS.github },
    { k: 'CAFE', v: LINKS.cafeEmail, href: `mailto:${LINKS.cafeEmail}`, copy: LINKS.cafeEmail },
  ],
  colophon: {
    es: 'Compuesto en Archivo y JetBrains Mono. React, Vite y CSS, sin plantillas.',
    en: 'Set in Archivo and JetBrains Mono. React, Vite and CSS, no templates.',
  },
};

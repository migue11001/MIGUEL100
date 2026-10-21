/* ═══════════════════════════════════════════════════════════
   PROJECT CATALOG — shared by index.html (gallery) and drawing.html (project page).
   Add a project here and it shows up in the gallery and gets its own
   page at drawing.html#<name>.
   After adding one, upload its gallery thumbnail to Supabase images/miniaturas/<name>.jpg
   (put the PDF/PNG in thumbs/ — git-ignored — and run ./scripts/make-thumbs.sh → thumbs/out/<name>.jpg)
   and the project page pictures to images/PROJECTS/.
═══════════════════════════════════════════════════════════ */
/* Gallery thumbnails (800px JPG, uploaded by hand as <name>.jpg) */
const THUMBS_URL   = 'https://jzvezovdglfzjyslahoz.supabase.co/storage/v1/object/public/images/miniaturas/';
/* Project page pictures (central picture + breakdown) */
const PROJECTS_URL = 'https://jzvezovdglfzjyslahoz.supabase.co/storage/v1/object/public/images/PROJECTS/';
/* Fixed breakdown thumbnails (01-requirements, 02-…), reusable by every project */
const FIXED_THUMBS_URL = 'https://jzvezovdglfzjyslahoz.supabase.co/storage/v1/object/public/images/miniaturas/mini-fijas/';

const DRAWINGS = [
    {
        name: 'D10', id: 'D10-P10', code: 'PROJECT-10',   // code: shown on the menu button
        title: 'Flanged 90° elbow valve assembly',
        /* Description under the central picture: three parts, each with a title (kept in English, like the
           stage names) and its text in the site's three languages — English is the page language,
           ES / IT are swapped in by the language switch */
        about: [
            {
                title: 'Function and purpose',
                en: 'The FLANGED 90° ELBOW VALVE ASSEMBLY is an angled valve assembly with flanged connections that turns the flow direction through 90°. Depending on its internal design, it can open or shut off the flow and, in certain models, regulate the flow rate of the fluid. It thus combines an angled connection and a control function in a single component, ready to be integrated into the existing process line.',
                es: 'El FLANGED 90° ELBOW VALVE ASSEMBLY es un conjunto de válvula acodada con conexiones bridadas que cambia la dirección del flujo en 90°. Según el diseño interno, puede abrir o cerrar el paso y, en determinados modelos, regular el caudal del fluido. Así combina una conexión angular con una función de control en un solo componente para integrarse en la línea de proceso actual.',
                it: "Il FLANGED 90° ELBOW VALVE ASSEMBLY è un gruppo valvola a gomito con attacchi flangiati che devia la direzione del flusso di 90°. A seconda del design interno, può aprire o chiudere il passaggio e, in alcuni modelli, regolare la portata del fluido. Unisce così un collegamento angolare e una funzione di controllo in un unico componente, da integrare nella linea di processo esistente.",
            },
            {
                title: 'Design and installation',
                en: 'The assembly features an angled body and flanges that connect to the pipework with suitable bolts and gaskets. This removable joint makes installation, alignment, inspection and maintenance easier. Choosing the right gaskets and tightening the bolts to specification help ensure proper sealing and reduce the risk of leaks in service.',
                es: 'El conjunto incorpora un cuerpo angular y bridas que se conectan a la tubería mediante pernos y juntas adecuadas. Esta unión desmontable facilita la instalación, el alineamiento, las inspecciones y el mantenimiento. La selección correcta de juntas y el apriete según las especificaciones ayudan a asegurar un sellado apropiado y reducir el riesgo de fugas durante el servicio.',
                it: "Il gruppo comprende un corpo angolare e flange che si collegano alla tubazione mediante bulloni e guarnizioni adeguati. Questo collegamento smontabile facilita l'installazione, l'allineamento, le ispezioni e la manutenzione. La scelta corretta delle guarnizioni e il serraggio secondo le specifiche contribuiscono a garantire una tenuta adeguata e a ridurre il rischio di perdite durante l'esercizio.",
            },
            {
                title: 'Applications and technical requirements',
                en: 'It is used in industrial circuits that need the flow redirected together with an integrated valve, for example in process lines or fluid-handling equipment. Its technical suitability depends on the fluid, the materials, the type of actuation and sealing, and the pressure and temperature ranges defined for the installation. Always check the technical data sheet.',
                es: 'Se utiliza en circuitos industriales donde se necesita orientar el flujo y disponer de una válvula integrada, por ejemplo en líneas de proceso o equipos de conducción. La idoneidad técnica depende del fluido, los materiales, el tipo de accionamiento y sellado, así como de los rangos de presión y temperatura definidos para la instalación. Conviene consultar la ficha técnica.',
                it: "Si utilizza nei circuiti industriali in cui occorre deviare il flusso e disporre di una valvola integrata, ad esempio nelle linee di processo o negli impianti di convogliamento. L'idoneità tecnica dipende dal fluido, dai materiali, dal tipo di azionamento e di tenuta, nonché dagli intervalli di pressione e temperatura definiti per l'impianto. Si consiglia di consultare la scheda tecnica.",
            },
        ],
        /* Central picture (file in Supabase images/PROJECTS/) */
        hero: { label: 'Flanged 90° elbow valve assembly — 3D render with drawing views',
                img: 'PROJECT-10.webp' },
        /* "Drawing breakdown" slots (01, 02, 03…) — also the choices of the menu panel.
           Add a picture with img: { title: '…', text: '…', img: 'D10-1.webp' }
           (img = file name in Supabase images/PROJECTS/, or a full URL; add photo: true for a photo
           so it keeps its colours instead of the blueprint look). Add {} for more slots. */
        breakdown: [
            { title: 'Requirements', img: FIXED_THUMBS_URL + '01-requirements.webp', photo: true },
            { title: 'Technical design', img: FIXED_THUMBS_URL + '02-technical-design.webp', photo: true },
            { title: '3D modeling and prototyping', img: FIXED_THUMBS_URL + '03-3d-modeling-prototyping.webp', photo: true },
            { title: 'Analysis and validation', img: FIXED_THUMBS_URL + '04-analysis-validation.webp', photo: true },
            { title: 'Manufacturing', img: FIXED_THUMBS_URL + '05-manufacturing.webp', photo: true },
            { title: 'First article', img: FIXED_THUMBS_URL + '06-first-article.webp', photo: true },
        ],
    },
    {
        name: 'D20', id: 'D20-P20', code: 'PROJECT-20',
        thumb: 'D20.png',   // gallery thumbnail file in miniaturas/ (default <name>.jpg)
        title: 'Robotic welding arm',
        about: [
            {
                title: 'Function and purpose',
                en: 'The ROBOT-WELDING assembly is a six-axis articulated arm fitted with a MIG/MAG welding torch. It moves the torch along programmed paths with constant speed, angle and distance to the workpiece, producing repeatable welds and freeing operators from repetitive, hazardous work in the welding cell.',
                es: 'El conjunto ROBOT-WELDING es un brazo articulado de seis ejes equipado con una antorcha de soldadura MIG/MAG. Desplaza la antorcha por trayectorias programadas con velocidad, ángulo y distancia a la pieza constantes, logrando soldaduras repetibles y liberando a los operarios de tareas repetitivas y peligrosas en la célula de soldadura.',
                it: "Il gruppo ROBOT-WELDING è un braccio articolato a sei assi dotato di torcia di saldatura MIG/MAG. Muove la torcia lungo traiettorie programmate con velocità, angolo e distanza dal pezzo costanti, ottenendo saldature ripetibili e sollevando gli operatori da lavori ripetitivi e pericolosi nella cella di saldatura.",
            },
            {
                title: 'Design and installation',
                en: 'The arm is built from a base, a rotating column, a lower arm, an upper arm and a wrist that carries the torch, with a reach of about 1650 mm. The base is bolted to the floor or to a riser, and the joints house the motors and reduction gears. The drawing gives the overall dimensions, the working angles and a 1:3 detail of the shoulder joint.',
                es: 'El brazo se compone de una base, una columna giratoria, un brazo inferior, un brazo superior y una muñeca que porta la antorcha, con un alcance de unos 1650 mm. La base se fija al suelo o a un pedestal con pernos, y las articulaciones alojan los motores y reductores. El plano recoge las dimensiones generales, los ángulos de trabajo y un detalle 1:3 de la articulación del hombro.',
                it: "Il braccio è composto da una base, una colonna rotante, un braccio inferiore, un braccio superiore e un polso che porta la torcia, con uno sbraccio di circa 1650 mm. La base si fissa al pavimento o a un piedistallo tramite bulloni, e i giunti alloggiano motori e riduttori. Il disegno riporta le dimensioni d'ingombro, gli angoli di lavoro e un dettaglio 1:3 del giunto della spalla.",
            },
            {
                title: 'Applications and technical requirements',
                en: 'It is used for arc welding of steel structures, frames and components in series production. Its suitability depends on the payload of the torch and cable package, the required reach and accuracy, the welding process and the safety of the cell (guarding, fume extraction). Always check the technical data sheet.',
                es: 'Se utiliza en la soldadura por arco de estructuras, bastidores y componentes de acero en producción en serie. La idoneidad depende de la carga de la antorcha y su paquete de cables, del alcance y la precisión requeridos, del proceso de soldadura y de la seguridad de la célula (protecciones, extracción de humos). Conviene consultar la ficha técnica.',
                it: "Si utilizza nella saldatura ad arco di strutture, telai e componenti in acciaio nella produzione in serie. L'idoneità dipende dal carico della torcia e del fascio cavi, dallo sbraccio e dalla precisione richiesti, dal processo di saldatura e dalla sicurezza della cella (protezioni, aspirazione fumi). Si consiglia di consultare la scheda tecnica.",
            },
        ],
        hero: { label: 'Robotic welding arm — exploded 3D render with drawing views',
                img: 'PROJECT-20.webp' },
        breakdown: [
            { title: 'Requirements', img: FIXED_THUMBS_URL + '01-requirements.webp', photo: true },
            { title: 'Technical design', img: FIXED_THUMBS_URL + '02-technical-design.webp', photo: true },
            { title: '3D modeling and prototyping', img: FIXED_THUMBS_URL + '03-3d-modeling-prototyping.webp', photo: true },
            { title: 'Analysis and validation', img: FIXED_THUMBS_URL + '04-analysis-validation.webp', photo: true },
            { title: 'Manufacturing', img: FIXED_THUMBS_URL + '05-manufacturing.webp', photo: true },
            { title: 'First article', img: FIXED_THUMBS_URL + '06-first-article.webp', photo: true },
        ],
    },
    {
        name: 'D30', id: 'D30-P30', code: 'PROJECT-30',
        thumb: 'D30.png',   // gallery thumbnail file in miniaturas/ (default <name>.jpg)
        title: '3-axis CNC milling machine',
        about: [
            {
                title: 'Function and purpose',
                en: 'The CNC assembly is a compact 3-axis gantry milling machine. Three stepper motors drive ball screws that move the spindle along X, Y and Z under numerical control, so parts in wood, plastics and light alloys can be machined accurately and repeatably straight from a CAD/CAM program.',
                es: 'El conjunto CNC es una fresadora compacta de pórtico de 3 ejes. Tres motores paso a paso accionan husillos de bolas que desplazan el cabezal en X, Y y Z bajo control numérico, de modo que se pueden mecanizar piezas de madera, plásticos y aleaciones ligeras con precisión y repetibilidad directamente desde un programa CAD/CAM.',
                it: "Il gruppo CNC è una fresatrice compatta a portale a 3 assi. Tre motori passo-passo azionano viti a ricircolo di sfere che muovono il mandrino lungo X, Y e Z sotto controllo numerico, così da lavorare pezzi in legno, plastica e leghe leggere con precisione e ripetibilità direttamente da un programma CAD/CAM.",
            },
            {
                title: 'Design and installation',
                en: 'A rigid base frame of about 450 × 620 mm carries a slotted work table and two side plates that support the gantry. Each axis runs on linear guides with carriages and a ball screw held in bearing blocks, coupled directly to its motor. The drawing gives the overall dimensions, the travel and the assembly of the X, Y and Z axes.',
                es: 'Un bastidor rígido de unos 450 × 620 mm soporta una mesa de trabajo perforada y dos placas laterales que sostienen el pórtico. Cada eje se desplaza sobre guías lineales con patines y un husillo de bolas apoyado en soportes de rodamientos, acoplado directamente a su motor. El plano recoge las dimensiones generales, los recorridos y el montaje de los ejes X, Y y Z.',
                it: "Un telaio rigido di circa 450 × 620 mm sostiene un piano di lavoro forato e due fiancate che reggono il portale. Ogni asse scorre su guide lineari con pattini e una vite a ricircolo di sfere montata su supporti con cuscinetti, accoppiata direttamente al proprio motore. Il disegno riporta le dimensioni d'ingombro, le corse e il montaggio degli assi X, Y e Z.",
            },
            {
                title: 'Applications and technical requirements',
                en: 'It is used for prototyping, engraving and small-batch machining in workshops and labs. Its suitability depends on the material to be cut, the spindle power, the working area and the required accuracy, as well as on the rigidity of the frame and safe operation (enclosure, chip extraction). Always check the technical data sheet.',
                es: 'Se utiliza para prototipado, grabado y mecanizado de pequeñas series en talleres y laboratorios. La idoneidad depende del material a mecanizar, la potencia del cabezal, el área de trabajo y la precisión requerida, así como de la rigidez del bastidor y de un uso seguro (cerramiento, aspiración de virutas). Conviene consultar la ficha técnica.',
                it: "Si utilizza per prototipazione, incisione e lavorazioni di piccole serie in officine e laboratori. L'idoneità dipende dal materiale da lavorare, dalla potenza del mandrino, dall'area di lavoro e dalla precisione richiesta, oltre che dalla rigidità del telaio e da un uso sicuro (carenatura, aspirazione trucioli). Si consiglia di consultare la scheda tecnica.",
            },
        ],
        hero: { label: '3-axis CNC milling machine — exploded 3D render with drawing views',
                img: 'PROJECT-30.webp' },
        breakdown: [
            { title: 'Requirements', img: FIXED_THUMBS_URL + '01-requirements.webp', photo: true },
            { title: 'Technical design', img: FIXED_THUMBS_URL + '02-technical-design.webp', photo: true },
            { title: '3D modeling and prototyping', img: FIXED_THUMBS_URL + '03-3d-modeling-prototyping.webp', photo: true },
            { title: 'Analysis and validation', img: FIXED_THUMBS_URL + '04-analysis-validation.webp', photo: true },
            { title: 'Manufacturing', img: FIXED_THUMBS_URL + '05-manufacturing.webp', photo: true },
            { title: 'First article', img: FIXED_THUMBS_URL + '06-first-article.webp', photo: true },
        ],
    },
];

/* Gallery layout: one horizontal row per entry (up to ~20 projects per row), by name */
const GALLERY_ROWS = [
    { title: 'PROJECTS-2026', drawings: ['D10', 'D20', 'D30'] },
];

function findDrawing(name) {
    return DRAWINGS.find(d => d.name === name) || null;
}

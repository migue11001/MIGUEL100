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
];

/* Gallery layout: one horizontal row per entry (up to ~20 projects per row), by name */
const GALLERY_ROWS = [
    { title: 'PROJECTS-2026', drawings: ['D10'] },
];

function findDrawing(name) {
    return DRAWINGS.find(d => d.name === name) || null;
}

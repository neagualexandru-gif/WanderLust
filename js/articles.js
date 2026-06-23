'use strict';

// 1. BAZA DE DATE LOCALĂ DE ARTICOLE (Cu text detaliat pentru fiecare pop-up)
const articoleData = [
    { 
        id: 1, 
        categorie: 'Europa', 
        titlu: 'Secretele ascunse ale Romei', 
        descriere: 'Descoperă colțurile mai puțin explorate ale Orașului Etern, departe de aglomerație.', 
        continutExtins: '<p>Roma oferă mult mai mult decât Colosseumul și Fontana di Trevi. Îți recomandăm o plimbare în pitorescul <strong>Cartier Coppedè</strong>, o bijuterie arhitecturală ascunsă.</p>',
        imagine: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&width=600' 
    },
    { 
        id: 2, 
        categorie: 'Asia', 
        titlu: 'Ghid de supraviețuire în Tokyo', 
        descriere: 'Tot ce trebuie să știi despre transport, cultură și mâncare în cea mai vibrantă metropolă.', 
        continutExtins: '<p>Tokyo poate fi copleșitor. Pentru a naviga eficient, folosește un card digital Suica sau Pasmo direct pe telefon și evită orele de vârf (08:00 - 09:00) în stațiile mari precum Shinjuku.</p>',
        imagine: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&width=600' 
    },
    { 
        id: 3, 
        categorie: 'America', 
        titlu: 'Aventuri în Marele Canion', 
        descriere: 'Trasee recomandate și sfaturi pentru o experiență de neuitat pe coasta de vest.', 
        continutExtins: '<p>Marele Canion oferă peisaje uluitoare. Traseul Bright Angel Trail este excelent dar solicitant. Asigură-te că ai minimum 3 litri de apă de persoană și începe drumeția înainte de răsăritul soarelui.</p>',
        imagine: 'https://images.unsplash.com/photo-1615551043360-33de8b5f410c?q=80&width=600' 
    },
    { 
        id: 4, 
        categorie: 'Europa', 
        titlu: 'O zi printre canalele Veneției', 
        descriere: 'Cum să eviți capcanele turistice și să experimentezi adevărata atmosferă venețiană.', 
        continutExtins: '<p>Părăsește traseul principal dintre Gara Santa Lucia și Piața San Marco. Explorează cartierul liniștit Cannaregio și oprește-te la un „bacaro” local pentru chicchetti (gustări tradiționale) și un pahar de vin alb.</p>',
        imagine: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&width=600' 
    },
    { 
        id: 5, 
        categorie: 'Asia', 
        titlu: 'Explorând templele din Bali', 
        descriere: 'Codul de conduită și cele mai fotogenice locuri sacre de pe insula zeilor.', 
        continutExtins: '<p>Vizitarea templelor din Bali impune respectarea tradițiilor. Poartă întotdeauna un sarong (disponibil gratuit la intrare). Îți recomandăm templele Pura Lempuyang și Uluwatu la apus.</p>',
        imagine: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&width=600' 
    },
    { 
        id: 6, 
        categorie: 'Africa', 
        titlu: 'Safari în Kenya: Ghid complet', 
        descriere: 'Cea mai bună perioadă pentru a vedea Marea Migrație în Rezervația Maasai Mara.', 
        continutExtins: '<p>Marea Migrație are loc de obicei între iulie și octombrie. Rezervă un ghid local autorizat care cunoaște mișcările felinelor mari și alege cazări de tip eco-lodge pentru a sprijini comunitatea.</p>',
        imagine: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&width=600' 
    },
    { 
        id: 7, 
        categorie: 'Europa', 
        titlu: 'Trasee montane în munții Elveției', 
        descriere: 'Ghid practic pentru pasionații de drumeții alpine în regiunea Interlaken.', 
        continutExtins: '<p>Munții Elvețieni dispun de o infrastructură impecabilă. Traseul de la Schynige Platte la First oferă panorame magnifice asupra lacurilor Brienz și Thun, fiind ideal pentru o zi întreagă de aventură.</p>',
        imagine: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&width=600' 
    },
    { 
        id: 8, 
        categorie: 'America', 
        titlu: 'Descoperă ritmul din Havana, Cuba', 
        descriere: 'O incursiune în cultura, arhitectura clasică și istoria fascinantă a Cubei.', 
        continutExtins: '<p>Havana pare încremenită în timp. Plimbă-te cu o mașină decapotabilă din anii \'50 de-a lungul faimoasei promenade Malecón și lasă-te purtat de ritmurile de muzică salsa live de pe străzile din Habana Vieja.</p>',
        imagine: 'https://free-spirit.ro/wp-content/uploads/2025/06/Cuba.webp' 
    }
];

// 2. FUNCTIA DE RENDERING ȘI FILTRARE DINAMICĂ
const initFiltrareDinamica = () => {
    const grid = document.getElementById('articlesGrid');
    const filterButtons = document.querySelectorAll('#filterContainer .filter-btn');
    const searchBar = document.getElementById('searchBar');
    const modalEl = document.getElementById('articleModal');

    if (!grid) return;

    // Definim instanța modalului o singură dată aici pentru a evita duplicarea în memorie
    let bootstrapModal = null;
    if (modalEl) {
        bootstrapModal = new bootstrap.Modal(modalEl);
    }

    let currentCategory = 'toate';
    let currentSearchText = '';

    // Funcția care randează cardurile în grid
    const renderArticles = () => {
        const filtered = articoleData.filter(articol => {
            const matchesCategory = currentCategory === 'toate' || articol.categorie.toLowerCase() === currentCategory;
            const matchesSearch = articol.titlu.toLowerCase().includes(currentSearchText) || 
                                  articol.descriere.toLowerCase().includes(currentSearchText);
            return matchesCategory && matchesSearch;
        });

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="col-12 text-center py-5 text-muted">
                    <i class="fas fa-search fs-2 mb-2"></i>
                    <p>Nu s-au găsit articole care să corespundă criteriilor.</p>
                </div>`;
            return;
        }

        // Construim cardurile pe un grid simetric col-lg-3 (câte 4 pe rând pe ecranele mari)
        grid.innerHTML = filtered.map(articol => `
            <div class="col-md-6 col-lg-3">
                <div class="card h-100 shadow-sm border-0 bg-white" style="transition: transform 0.2s; border-radius: 10px; overflow: hidden;">
                    <div class="position-relative overflow-hidden" style="height: 180px;">
                        <img src="${articol.imagine}" class="card-img-top w-100 h-100" style="object-fit: cover;" alt="${articol.titlu}">
                        <span class="badge position-absolute top-0 end-0 m-3" style="background-color: #FF7043;">${articol.categorie}</span>
                    </div>
                    <div class="card-body d-flex flex-column p-3">
                        <h3 class="h6 card-title fw-bold text-dark mb-2" style="font-family: 'Playfair Display', serif; line-height: 1.4;">${articol.titlu}</h3>
                        <p class="card-text text-muted flex-grow-1 small mb-3">${articol.descriere}</p>
                        <button class="btn btn-sm text-start p-0 fw-bold border-0 bg-transparent btn-citeste-articol" data-id="${articol.id}" style="color: #00897B; width: max-content;">
                            Citește mai mult <i class="fas fa-arrow-right ms-1"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Reatașăm evenimentele pe butoanele nou create
        attachModalEvents();
    };

    // 3. LOGICA CONECTĂRII DATELOR CU MODALUL REUTILIZABIL
    const attachModalEvents = () => {
        const buttons = document.querySelectorAll('.btn-citeste-articol');
        if (!bootstrapModal) return;

        buttons.forEach(button => {
            button.addEventListener('click', function () {
                const articolId = parseInt(this.getAttribute('data-id'), 10);
                const articol = articoleData.find(a => a.id === articolId);

                if (articol) {
                    // Injectăm dinamic datele în elementele ferestrei modale existente în HTML
                    document.getElementById('modalTitle').innerText = articol.titlu;
                    document.getElementById('modalBadge').innerText = articol.categorie;
                    document.getElementById('modalImg').setAttribute('src', articol.imagine);
                    document.getElementById('modalImg').setAttribute('alt', articol.titlu);
                    document.getElementById('modalFullContent').innerHTML = articol.continutExtins;

                    // Afișăm fereastra modală salvată în instanța principală
                    bootstrapModal.show();
                }
            });
        });
    };

    // Filtrare butoane continente
    filterButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const rawFilter = this.getAttribute('data-filter');
            currentCategory = rawFilter ? rawFilter.toLowerCase().trim() : 'toate';
            renderArticles();
        });
    });

    // Filtrare în timp real din bară de căutare
    if (searchBar) {
        searchBar.addEventListener('input', function () {
            currentSearchText = this.value.toLowerCase().trim();
            renderArticles();
        });
    }

    // Prima rulare automată a paginii
    renderArticles();
};

document.addEventListener('DOMContentLoaded', initFiltrareDinamica);
// =========================
// ANIMAÇÃO DOS CARDS
// =========================

const boxes = document.querySelectorAll(".box");

function revealBoxes() {

    boxes.forEach(box => {

        const top = box.getBoundingClientRect().top;

        if (top < window.innerHeight - 80) {
            box.classList.add("show");
        }

    });

}

window.addEventListener("scroll", revealBoxes);
window.addEventListener("load", revealBoxes);


// =========================
// CARROSSEL
// =========================

const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {

    const cards = carousel.querySelectorAll('.box');
    const prev = carousel.querySelector('.prev');
    const next = carousel.querySelector('.next');

    let current = 0;

    function updateCarousel() {

        cards.forEach(card => {
            card.classList.remove('active');
        });

        cards[current].classList.add('active');
    }

    next.addEventListener('click', () => {

        current++;

        if (current >= cards.length) {
            current = 0;
        }

        updateCarousel();
    });

    prev.addEventListener('click', () => {

        current--;

        if (current < 0) {
            current = cards.length - 1;
        }

        updateCarousel();
    });

    setInterval(() => {

        current++;

        if (current >= cards.length) {
            current = 0;
        }

        updateCarousel();

    }, 4000);

    updateCarousel();

});

// =====================
// TROCA DE TEMA
// =====================

const themeBtn = document.getElementById("themeToggle");

function applyTheme(theme){

    if(theme === "light"){

        document.body.classList.add("light-theme");
        themeBtn.innerHTML = "☀️";

    }else{

        document.body.classList.remove("light-theme");
        themeBtn.innerHTML = "🌙";

    }

}

const savedTheme = localStorage.getItem("theme");

if(savedTheme){
    applyTheme(savedTheme);
}

themeBtn.addEventListener("click", () => {

    const isLight =
    document.body.classList.toggle("light-theme");

    if(isLight){

        themeBtn.innerHTML = "☀️";
        localStorage.setItem("theme","light");

    }else{

        themeBtn.innerHTML = "🌙";
        localStorage.setItem("theme","dark");

    }

});

// =====================
// TRADUÇÃO
// =====================

const languageSelector = document.getElementById("languageSelector");

const translations = {

    pt: {

        navHome: "Início",
        navAdvantages: "Vantagens",
        navTechnology: "Tecnologia",
        navImpacts: "Impactos",
        navGame: "Jogo",

        heroMiniTitle: "TECNOLOGIA AGRÍCOLA",
        heroTitle: 'Uso de <span>Drones</span> na Agricultura',
        heroText: "Os drones revolucionaram o agronegócio moderno, trazendo monitoramento inteligente, redução de custos e maior eficiência na produção agrícola.",
        exploreBtn: "Explorar Tema",

        benefitsLabel: "BENEFÍCIOS",
        benefitsTitle: "Vantagens dos Drones",

        adv1Title: "Monitoramento Inteligente",
        adv1Text: "Os drones permitem acompanhar grandes áreas agrícolas em poucos minutos, gerando imagens detalhadas e dados importantes para a tomada de decisões.",

        adv2Title: "Economia de Recursos",
        adv2Text: "A utilização de drones reduz custos operacionais e melhora a eficiência do trabalho agrícola.",

        adv3Title: "Aplicação de Precisão",
        adv3Text: "Os drones conseguem aplicar fertilizantes e defensivos apenas onde existe necessidade.",

        techLabel: "INOVAÇÃO",
        techTitle: "Agricultura Inteligente",
        techText1: "A integração de drones com inteligência artificial permite mapas detalhados das plantações, análise do solo e identificação de doenças.",
        techText2: "Sensores térmicos e câmeras especiais ajudam produtores a tomarem decisões mais rápidas e eficientes.",

        impactLabel: "SUSTENTABILIDADE",
        impactTitle: "Impactos Positivos",

        impact1Title: "Menos Desperdício",
        impact2Title: "Aumento da Produção",
        impact3Title: "Preservação Ambiental",
        impact4Title: "Análise Rápida",

        gameLabel: "MINI GAME",
        gameTitle: "Drone Farm Game",
        gameText1: "Controle um drone agrícola em missões dentro do campo. Abasteça o tanque, pulverize toda a área, colete frutas e entregue a carga no caminhão.",
        gameText2: "O jogo simula algumas funções reais dos drones utilizados na agricultura moderna, mostrando como a tecnologia pode ajudar produtores rurais.",
        playBtn: "Jogar Agora",

        footerText: "© 2026 - Uso de Drones na Agricultura - Rafael Antonio Zamoner",

        adv1Li1: "Identificação de falhas na plantação",
        adv1Li2: "Mapeamento de áreas afetadas por pragas",
        adv1Li3: "Monitoramento em tempo real",
        adv1Li4: "Redução de inspeções manuais",

        adv2Li1: "Menor consumo de combustível",
        adv2Li2: "Redução de mão de obra",
        adv2Li3: "Menos desperdício de produtos",
        adv2Li4: "Maior retorno financeiro",

        adv3Li1: "Maior precisão operacional",
        adv3Li2: "Menor impacto ambiental",
        adv3Li3: "Aplicação localizada",
        adv3Li4: "Maior eficiência produtiva",

        impact1Li1: "Uso racional de recursos",
        impact1Li2: "Menor contaminação do solo",
        impact1Li3: "Redução de perdas financeiras",
        impact1Li4: "Maior sustentabilidade",

        impact2Li1: "Maior rendimento por hectare",
        impact2Li2: "Redução de falhas produtivas",
        impact2Li3: "Melhor gestão agrícola",
        impact2Li4: "Resultados mais consistentes",

        impact3Li1: "Menor emissão de poluentes",
        impact3Li2: "Redução de produtos químicos",
        impact3Li3: "Proteção de áreas naturais",
        impact3Li4: "Uso consciente do solo",

        impact4Li1: "Tomada de decisão rápida",
        impact4Li2: "Maior produtividade operacional",
        impact4Li3: "Mapeamento detalhado",
        impact4Li4: "Resposta imediata a problemas",
    },

    en: {

        navHome: "Home",
        navAdvantages: "Advantages",
        navTechnology: "Technology",
        navImpacts: "Impacts",
        navGame: "Game",

        heroMiniTitle: "AGRICULTURAL TECHNOLOGY",
        heroTitle: 'Use of <span>Drones</span> in Agriculture',
        heroText: "Drones have revolutionized modern agriculture by providing intelligent monitoring, cost reduction and greater production efficiency.",
        exploreBtn: "Explore Topic",

        benefitsLabel: "BENEFITS",
        benefitsTitle: "Advantages of Drones",

        adv1Title: "Smart Monitoring",
        adv1Text: "Drones can monitor large agricultural areas in minutes, generating detailed images and valuable data for decision making.",

        adv2Title: "Resource Savings",
        adv2Text: "The use of drones reduces operating costs and improves agricultural efficiency.",

        adv3Title: "Precision Application",
        adv3Text: "Drones can apply fertilizers and pesticides only where needed.",

        techLabel: "INNOVATION",
        techTitle: "Smart Agriculture",
        techText1: "The integration of drones with artificial intelligence enables detailed crop mapping, soil analysis and disease detection.",
        techText2: "Thermal sensors and special cameras help farmers make faster and more efficient decisions.",

        impactLabel: "SUSTAINABILITY",
        impactTitle: "Positive Impacts",

        impact1Title: "Less Waste",
        impact2Title: "Production Increase",
        impact3Title: "Environmental Preservation",
        impact4Title: "Fast Analysis",

        gameLabel: "MINI GAME",
        gameTitle: "Drone Farm Game",
        gameText1: "Control an agricultural drone through missions in the field. Refill the tank, spray the area, collect fruits and deliver the cargo.",
        gameText2: "The game simulates real agricultural drone functions, showing how technology helps farmers.",
        playBtn: "Play Now",

        footerText: "© 2026 - Use of Drones in Agriculture - Rafael Antonio Zamoner",

        adv1Li1: "Identification of crop failures",
        adv1Li2: "Mapping of pest affected areas",
        adv1Li3: "Real-time monitoring",
        adv1Li4: "Reduced manual inspections",

        adv2Li1: "Lower fuel consumption",
        adv2Li2: "Reduced labor costs",
        adv2Li3: "Less product waste",
        adv2Li4: "Higher financial return",

        adv3Li1: "Greater operational precision",
        adv3Li2: "Lower environmental impact",
        adv3Li3: "Localized application",
        adv3Li4: "Higher production efficiency",

        impact1Li1: "Rational use of resources",
        impact1Li2: "Less soil contamination",
        impact1Li3: "Reduced financial losses",
        impact1Li4: "Greater sustainability",

        impact2Li1: "Higher yield per hectare",
        impact2Li2: "Reduced production failures",
        impact2Li3: "Better farm management",
        impact2Li4: "More consistent results",

        impact3Li1: "Lower pollutant emissions",
        impact3Li2: "Reduced chemical use",
        impact3Li3: "Protection of natural areas",
        impact3Li4: "Conscious soil use",

        impact4Li1: "Faster decision making",
        impact4Li2: "Higher operational productivity",
        impact4Li3: "Detailed mapping",
        impact4Li4: "Immediate response to problems",
    },

    es: {

        navHome: "Inicio",
        navAdvantages: "Ventajas",
        navTechnology: "Tecnología",
        navImpacts: "Impactos",
        navGame: "Juego",

        heroMiniTitle: "TECNOLOGÍA AGRÍCOLA",
        heroTitle: 'Uso de <span>Drones</span> en la Agricultura',
        heroText: "Los drones han revolucionado la agricultura moderna mediante monitoreo inteligente, reducción de costos y mayor eficiencia productiva.",
        exploreBtn: "Explorar Tema",

        benefitsLabel: "BENEFICIOS",
        benefitsTitle: "Ventajas de los Drones",

        adv1Title: "Monitoreo Inteligente",
        adv1Text: "Los drones permiten monitorear grandes áreas agrícolas en pocos minutos, generando imágenes detalladas y datos importantes para la toma de decisiones.",

        adv2Title: "Ahorro de Recursos",
        adv2Text: "El uso de drones reduce costos operativos y mejora la eficiencia agrícola.",

        adv3Title: "Aplicación de Precisión",
        adv3Text: "Los drones pueden aplicar fertilizantes y pesticidas solo donde es necesario.",

        techLabel: "INNOVACIÓN",
        techTitle: "Agricultura Inteligente",
        techText1: "La integración de drones con inteligencia artificial permite mapas detallados de cultivos, análisis del suelo e identificación de enfermedades.",
        techText2: "Los sensores térmicos y cámaras especiales ayudan a los productores a tomar decisiones más rápidas y eficientes.",

        impactLabel: "SOSTENIBILIDAD",
        impactTitle: "Impactos Positivos",

        impact1Title: "Menos Desperdicio",
        impact2Title: "Aumento de la Producción",
        impact3Title: "Preservación Ambiental",
        impact4Title: "Análisis Rápido",

        gameLabel: "MINI GAME",
        gameTitle: "Drone Farm Game",
        gameText1: "Controla un dron agrícola en misiones dentro del campo. Llena el tanque, pulveriza el área, recolecta frutas y entrega la carga.",
        gameText2: "El juego simula funciones reales de drones agrícolas, mostrando cómo la tecnología ayuda a los productores rurales.",
        playBtn: "Jugar Ahora",

        footerText: "© 2026 - Uso de Drones en la Agricultura - Rafael Antonio Zamoner",

        adv1Li1: "Identificación de fallas en el cultivo",
        adv1Li2: "Mapeo de áreas afectadas por plagas",
        adv1Li3: "Monitoreo en tiempo real",
        adv1Li4: "Reducción de inspecciones manuales",

        adv2Li1: "Menor consumo de combustible",
        adv2Li2: "Reducción de mano de obra",
        adv2Li3: "Menos desperdicio de productos",
        adv2Li4: "Mayor retorno financiero",

        adv3Li1: "Mayor precisión operativa",
        adv3Li2: "Menor impacto ambiental",
        adv3Li3: "Aplicación localizada",
        adv3Li4: "Mayor eficiencia productiva",

        impact1Li1: "Uso racional de recursos",
        impact1Li2: "Menor contaminación del suelo",
        impact1Li3: "Reducción de pérdidas financieras",
        impact1Li4: "Mayor sostenibilidad",

        impact2Li1: "Mayor rendimiento por hectárea",
        impact2Li2: "Reducción de fallas productivas",
        impact2Li3: "Mejor gestión agrícola",
        impact2Li4: "Resultados más consistentes",

        impact3Li1: "Menor emisión de contaminantes",
        impact3Li2: "Reducción de productos químicos",
        impact3Li3: "Protección de áreas naturales",
        impact3Li4: "Uso consciente del suelo",

        impact4Li1: "Toma de decisiones rápida",
        impact4Li2: "Mayor productividad operativa",
        impact4Li3: "Mapeo detallado",
        impact4Li4: "Respuesta inmediata a problemas",
    }

};

function changeLanguage(lang){

    Object.keys(translations[lang]).forEach(id => {

        const element = document.getElementById(id);

        if(!element) return;

        if(id === "heroTitle"){
            element.innerHTML = translations[lang][id];
        }else{
            element.textContent = translations[lang][id];
        }

    });

    localStorage.setItem("language", lang);
}

languageSelector.addEventListener("change", () => {
    changeLanguage(languageSelector.value);
});

const savedLanguage = localStorage.getItem("language") || "pt";

languageSelector.value = savedLanguage;
changeLanguage(savedLanguage);

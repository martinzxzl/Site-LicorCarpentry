// ============================================================
// MENU MOBILE
// O JS só faz UMA coisa: liga e desliga a classe "active".
// Todo o visual (painel deslizando, X do ícone, links entrando)
// está no mobile.css. Se quiser mudar a aparência, mexa lá.
// ============================================================

const botaoMenu = document.querySelector(".mobile-menu");
const painel = document.querySelector(".nav-list");
const links = document.querySelectorAll(".nav-list a");

// Abre ou fecha o menu
function alternarMenu(abrir) {
    painel.classList.toggle("active", abrir);
    botaoMenu.classList.toggle("active", abrir);
    botaoMenu.setAttribute("aria-expanded", abrir);
    botaoMenu.setAttribute("aria-label", abrir ? "Close menu" : "Open menu");
}

// Só roda se a página tiver o botão e o painel (evita erro)
if (botaoMenu && painel) {

    // Clique no hambúrguer: abre se estava fechado, fecha se estava aberto
    botaoMenu.addEventListener("click", () => {
        alternarMenu(!painel.classList.contains("active"));
    });

    // Clicar em um link fecha o menu
    links.forEach((link) => {
        link.addEventListener("click", () => alternarMenu(false));
    });

    // Tecla Esc fecha o menu
    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") alternarMenu(false);
    });

    // Se a tela crescer para desktop (1000px+), garante o menu fechado
    window.matchMedia("(min-width: 1000px)").addEventListener("change", (e) => {
        if (e.matches) alternarMenu(false);
    });
}

function medirHeader() {
    const h = document.querySelector("header").offsetHeight;
    document.documentElement.style.setProperty("--header-h", h + "px");
}
medirHeader();
window.addEventListener("resize", medirHeader);
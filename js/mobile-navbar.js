// ============================================================
// MENU MOBILE
// Este código só funciona em telas menores que 1000px.
// No computador ele fica desligado e o seu CSS manda sozinho.
// ============================================================

// "class" é como uma receita: agrupa tudo que o menu precisa fazer.
class MobileNavbar {

    // O constructor roda quando o menu é criado.
    // Aqui o JS procura no HTML os elementos que vai controlar.
    constructor(mobileMenu, navList, navLinks) {
        this.mobileMenu = document.querySelector(mobileMenu);   // o ícone do hambúrguer
        this.navList = document.querySelector(navList);         // o painel lateral
        this.navLinks = document.querySelectorAll(navLinks);    // os <li> (Home, Services, Gallery)
        this.lines = this.mobileMenu
            ? this.mobileMenu.querySelectorAll("div")           // as 3 linhas do hambúrguer
            : [];

        this.isOpen = false; // começa fechado

        // Garante que o "this" continue sendo o menu dentro do clique
        this.handleClick = this.handleClick.bind(this);
    }

    // Prepara as animações (só valem no mobile)
    setup() {
        // O ícone fica por cima do painel (senão o X aparece cortado)
        this.mobileMenu.style.position = "relative";
        this.mobileMenu.style.zIndex = "20";

        // O painel desliza suavemente
        this.navList.style.transition = "transform 0.3s ease-in";
        this.navList.style.zIndex = "10";

        // As linhas do ícone se movem suavemente quando viram X
        this.lines.forEach((line) => {
            line.style.transition = "transform 0.3s ease, opacity 0.3s ease";
        });

        // Os links começam deslocados para a direita, prontos para entrar
        this.navLinks.forEach((link) => {
            link.style.transition = "opacity 0.4s ease, transform 0.4s ease";
            link.style.transform = "translateX(50px)";
        });
    }

    // Abre ou fecha o painel lateral
    animateMenu() {
        this.navList.style.transform = this.isOpen
            ? "translateX(0)"       // aberto: painel na tela
            : "translateX(100%)";   // fechado: painel escondido à direita
    }

    // Faz os links aparecerem um de cada vez
    animateLinks() {
        this.navLinks.forEach((link, index) => {
            if (this.isOpen) {
                // cada link espera um pouco mais que o anterior
                link.style.transitionDelay = `${index / 7 + 0.2}s`;
                link.style.opacity = "1";
                link.style.transform = "translateX(0)";
            } else {
                link.style.transitionDelay = "0s";
                link.style.opacity = "0";
                link.style.transform = "translateX(50px)";
            }
        });
    }

    // Transforma o hambúrguer em X (e de volta)
    animateIcon() {
        const [line1, line2, line3] = this.lines; // separa as 3 linhas

        if (this.isOpen) {
            line1.style.transform = "translateY(10px) rotate(45deg)";   // linha de cima gira
            line2.style.opacity = "0";                                  // linha do meio some
            line3.style.transform = "translateY(-10px) rotate(-45deg)"; // linha de baixo gira
        } else {
            line1.style.transform = "none";
            line2.style.opacity = "1";
            line3.style.transform = "none";
        }
    }

    // Roda toda vez que o ícone é clicado
    handleClick(event) {
        event.preventDefault(); // evita que o clique recarregue a página

        this.isOpen = !this.isOpen; // inverte: aberto vira fechado e vice-versa

        // Guarda o estado como classe "active" (útil se você quiser usar no CSS)
        this.navList.classList.toggle("active", this.isOpen);
        this.mobileMenu.classList.toggle("active", this.isOpen);

        // Executa as 3 animações
        this.animateMenu();
        this.animateLinks();
        this.animateIcon();
    }

    // Fica "escutando" o clique no ícone
    addClickEvent() {
        this.mobileMenu.addEventListener("click", this.handleClick);
    }

    // LIGA o menu mobile
    init() {
        if (this.mobileMenu && this.navList) {
            this.setup();
            this.addClickEvent();
        }
        return this;
    }

    // DESLIGA o menu mobile (usado quando a tela fica grande)
    destroy() {
        if (!this.mobileMenu || !this.navList) return;

        // para de escutar o clique
        this.mobileMenu.removeEventListener("click", this.handleClick);

        // volta ao estado "fechado"
        this.isOpen = false;
        this.navList.classList.remove("active");
        this.mobileMenu.classList.remove("active");

        // apaga todos os estilos que o JS colocou,
        // assim só o seu CSS de desktop fica valendo
        this.navList.removeAttribute("style");
        this.mobileMenu.removeAttribute("style");
        this.lines.forEach((line) => line.removeAttribute("style"));
        this.navLinks.forEach((link) => link.removeAttribute("style"));
    }
}

// Cria o menu, dizendo ao JS quais elementos do HTML usar
const mobileNavbar = new MobileNavbar(
    ".mobile-menu",   // ícone
    ".nav-list",      // painel
    ".nav-list li"    // links
);

// Pergunta ao navegador: "a tela tem menos de 1000px?"
// (mesmo valor do @media do seu mobile.css)
const telaPequena = window.matchMedia("(max-width: 999px)");

// Liga o menu em tela pequena e desliga em tela grande
function verificarTela() {
    if (telaPequena.matches) {
        mobileNavbar.init();
    } else {
        mobileNavbar.destroy();
    }
}

// Roda quando a página abre...
verificarTela();

// ...e roda de novo sempre que a tela passar de pequena para grande (ou o contrário)
telaPequena.addEventListener("change", verificarTela);



// ============================================================
// CORREÇÃO DO HOVER NO ÍCONE
// No HTML, o ícone está dentro de um <a>, e o CSS de "header a"
// aplica o traço de hover nele. Aqui o JS tira o ícone de dentro
// do <a>, sem você precisar mexer no HTML.
// ============================================================
function tirarIconeDoLink() {
    const icone = document.querySelector(".mobile-menu");
    if (!icone) return;

    // procura o <a> que envolve o ícone
    const link = icone.closest("a");

    if (link && link.parentNode) {
        // coloca o ícone ao lado do <a>, no lugar dele
        link.parentNode.insertBefore(icone, link);
        // remove o <a> que sobrou vazio
        link.remove();
    }
}

tirarIconeDoLink();
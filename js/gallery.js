// ============================================================
// GALERIA (jQuery + Magnific Popup)
// 1) Hover: a imagem inteira cresce (classe .is-hover, CSS em gallery.css)
// 2) Clique: abre a imagem grande num popup com setas
// ============================================================
$(function () {

    // ----- 1) HOVER -----
    // Só em dispositivos com mouse. No celular não existe "passar o mouse",
    // e o toque deixaria a imagem presa no estado crescido.
    if (window.matchMedia("(hover: hover)").matches) {
        $(".gallery a")
            .on("mouseenter", function () { $(this).addClass("is-hover"); })
            .on("mouseleave", function () { $(this).removeClass("is-hover"); });
    }

    // ----- 2) POPUP -----
    $(".gallery").magnificPopup({
        delegate: "a",              // quais elementos abrem o popup
        type: "image",
        mainClass: "mfp-fade",
        removalDelay: 300,          // espera o fade terminar
        gallery: {
            enabled: true,          // setas + contador
            navigateByImgClick: true,
            preload: [0, 1]
        },
        image: {
            titleSrc: "title"       // legenda = atributo title do <a>
        },
        callbacks: {
            // ao abrir o popup, tira o estado de hover da miniatura
            open: function () { $(".gallery a").removeClass("is-hover"); }
        }
    });
});

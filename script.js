/* =========================================================
   INVITACIÓN DENISE & MIGUEL
   SCRIPT.JS
========================================================= */


/* =========================================================
   ELEMENTOS
========================================================= */

const envelope =
    document.getElementById("envelope");

const seal =
    document.getElementById("seal");

const closeEnvelope =
    document.getElementById("closeEnvelope");


/* =========================================================
   CONFIGURACIÓN
========================================================= */

const OPEN_TIME = 1600;


/* =========================================================
   ABRIR SOBRE
========================================================= */

function openEnvelope() {

    backgroundMusic.play()
    .then(() => {

        musicButton.textContent = "🔊";

    })
    .catch((error) => {

        console.log(
            "No se pudo iniciar la música:",
            error
        );

    });
    /*
        Evitamos que pueda activarse
        varias veces mientras se abre.
    */

    if (
        envelope.classList.contains("opened")
    ) {

        return;

    }


    /*
        Bloqueamos el scroll mientras
        se realiza la animación.
    */

    document.body.style.overflow = "hidden";


    /*
        Activamos las dos puertas.
    */

    envelope.classList.add("opened");


    /*
        Cuando termina la animación,
        permitimos cerrar nuevamente
        el sobre.
    */

    setTimeout(() => {

        envelope.classList.add("can-close");

    }, OPEN_TIME);


    /*
        Después de la apertura,
        el usuario puede desplazarse
        normalmente por toda la invitación.
    */

   setTimeout(() => {

    document.body.style.overflow = "";

    /*
        Una vez terminada la apertura,
        retiramos la pantalla del sobre
        para revelar completamente el Hero.
    */

    envelope.classList.add("hidden");

}, OPEN_TIME);

}


/* =========================================================
   CERRAR SOBRE
========================================================= */

function closeEnvelopeAnimation() {

    /*
        Volvemos a bloquear el scroll
        mientras las puertas regresan.
    */

    document.body.style.overflow = "hidden";


    /*
        Quitamos el estado abierto.
    */

    envelope.classList.remove("opened");

    envelope.classList.remove("can-close");


    /*
        Esperamos a que termine la animación.
    */

    setTimeout(() => {

        document.body.style.overflow = "";

    }, OPEN_TIME);

}


/* =========================================================
   MÚSICA DE FONDO
========================================================= */

const backgroundMusic =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");


/* =========================================================
   BOTÓN DE MÚSICA
========================================================= */

musicButton.addEventListener("click", () => {

    if (backgroundMusic.paused) {

        backgroundMusic.play();

        musicButton.textContent = "🔊";

        musicButton.setAttribute(
            "aria-label",
            "Pausar música"
        );

    } else {

        backgroundMusic.pause();

        musicButton.textContent = "🔇";

        musicButton.setAttribute(
            "aria-label",
            "Reproducir música"
        );

    }

});



/* =========================================================
   EVENTO DEL SELLO
========================================================= */

seal.addEventListener(
    "click",
    openEnvelope
);


/* =========================================================
   EVENTO CERRAR
========================================================= */

closeEnvelope.addEventListener(
    "click",
    closeEnvelopeAnimation
);


/* =========================================================
   SOPORTE PARA TECLADO
========================================================= */

seal.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            openEnvelope();

        }

    }
);


/* =========================================================
   EVITAR SCROLL CON RUEDA
   MIENTRAS EL SOBRE ESTÁ CERRADO
========================================================= */

window.addEventListener(
    "wheel",
    (event) => {

        if (
            !envelope.classList.contains("opened")
        ) {

            event.preventDefault();

        }

    },
    {
        passive: false
    }
);


/* =========================================================
   EVITAR SCROLL TÁCTIL
   MIENTRAS EL SOBRE ESTÁ CERRADO
========================================================= */

window.addEventListener(
    "touchmove",
    (event) => {

        if (
            !envelope.classList.contains("opened")
        ) {

            event.preventDefault();

        }

    },
    {
        passive: false
    }
);


/* =========================================================
   ALTURA REAL DEL VIEWPORT
   ESPECIALMENTE PARA CELULARES
========================================================= */

function updateViewportHeight() {

    const viewportHeight =
        window.visualViewport
            ? window.visualViewport.height
            : window.innerHeight;


    document.documentElement.style.setProperty(
        "--vh",
        `${viewportHeight}px`
    );

}


updateViewportHeight();


/* =========================================================
   ACTUALIZAR AL CAMBIAR TAMAÑO
========================================================= */

window.addEventListener(
    "resize",
    updateViewportHeight
);


/* =========================================================
   VISUAL VIEWPORT
========================================================= */

if (window.visualViewport) {

    window.visualViewport.addEventListener(
        "resize",
        updateViewportHeight
    );

}


/* =========================================================
   CUENTA REGRESIVA
   DENISE & MIGUEL
========================================================= */


/* =========================================================
   ELEMENTOS
========================================================= */

const countdown =
    document.getElementById("countdown");

const countdownFinished =
    document.getElementById("countdownFinished");

const greatDaySection =
    document.querySelector(".great-day-section");

const daysElement =
    document.getElementById("days");

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");


/* =========================================================
   FECHA DEL GRAN DÍA
========================================================= */

/*
    21 de noviembre de 2026
    00:00:00

    La hora se interpreta en la zona horaria
    del dispositivo donde se abre la invitación.
*/

const weddingDate =
    new Date(
        2026,
        10,
        21,
        0,
        0,
        0
    );


/* =========================================================
   ACTUALIZAR CUENTA REGRESIVA
========================================================= */

function updateCountdown() {

    const now =
        new Date();

    const difference =
        weddingDate.getTime()
        -
        now.getTime();


    /*
        Si la fecha ya llegó,
        mostramos el mensaje final.
    */

    if (difference <= 0) {

        greatDaySection.classList.add(
            "is-finished"
        );

        return;

    }


    /* =====================================================
       CÁLCULO DEL TIEMPO
    ===================================================== */

    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                difference %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (
                difference %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (
                difference %
                (1000 * 60)
            ) /
            1000
        );


    /* =====================================================
       MOSTRAR VALORES
    ===================================================== */

    daysElement.textContent =
        String(days).padStart(2, "0");

    hoursElement.textContent =
        String(hours).padStart(2, "0");

    minutesElement.textContent =
        String(minutes).padStart(2, "0");

    secondsElement.textContent =
        String(seconds).padStart(2, "0");

}


/* =========================================================
   EJECUCIÓN INICIAL
========================================================= */

updateCountdown();


/* =========================================================
   ACTUALIZAR CADA SEGUNDO
========================================================= */

const countdownInterval =
    setInterval(
        updateCountdown,
        1000
    );

    /* =========================================================
   SWIPER — NUESTROS RECUERDOS
========================================================= */


/* =========================================================
   ELEMENTOS
========================================================= */

const memoryTrack =
    document.getElementById("memoryTrack");

const memoryPrev =
    document.getElementById("memoryPrev");

const memoryNext =
    document.getElementById("memoryNext");

const memoryCurrent =
    document.getElementById("memoryCurrent");

const memoryTotal =
    document.getElementById("memoryTotal");

const memoryDots =
    document.querySelectorAll(".memory-dot");

const memorySlides =
    document.querySelectorAll(".memory-slide");


/* =========================================================
   CONFIGURACIÓN
========================================================= */

let currentMemory =
    0;

const totalMemories =
    memorySlides.length;


/* =========================================================
   ACTUALIZAR CONTADOR
========================================================= */

memoryTotal.textContent =
    String(totalMemories).padStart(2, "0");


/* =========================================================
   MOSTRAR FOTOGRAFÍA
========================================================= */

function showMemory(index) {

    /*
        Evitamos salirnos de los límites.
    */

    if (index < 0) {

        index =
            totalMemories - 1;

    }


    if (index >= totalMemories) {

        index = 0;

    }


    currentMemory =
        index;


    /*
        Movemos el track.
    */

    memoryTrack.style.transform =
        `translateX(-${currentMemory * 100}%)`;


    /*
        Actualizamos el contador.
    */

    memoryCurrent.textContent =
        String(currentMemory + 1).padStart(2, "0");


    /*
        Actualizamos los puntos.
    */

    memoryDots.forEach(
        (dot, dotIndex) => {

            dot.classList.toggle(
                "active",
                dotIndex === currentMemory
            );

        }
    );

}


/* =========================================================
   BOTÓN ANTERIOR
========================================================= */

memoryPrev.addEventListener(
    "click",
    () => {

        showMemory(
            currentMemory - 1
        );

    }
);


/* =========================================================
   BOTÓN SIGUIENTE
========================================================= */

memoryNext.addEventListener(
    "click",
    () => {

        showMemory(
            currentMemory + 1
        );

    }
);


/* =========================================================
   PUNTOS
========================================================= */

memoryDots.forEach(
    (dot) => {

        dot.addEventListener(
            "click",
            () => {

                const slideIndex =
                    Number(
                        dot.dataset.slide
                    );

                showMemory(
                    slideIndex
                );

            }
        );

    }
);


/* =========================================================
   SWIPE TÁCTIL
========================================================= */

let memoryTouchStartX = 0;

let memoryTouchEndX = 0;


/* ---------------------------------------------------------
   INICIO DEL TOUCH
--------------------------------------------------------- */

memoryTrack.addEventListener(
    "touchstart",
    (event) => {

        memoryTouchStartX =
            event.touches[0].clientX;

    },
    {
        passive: true
    }
);


/* ---------------------------------------------------------
   FINAL DEL TOUCH
--------------------------------------------------------- */

memoryTrack.addEventListener(
    "touchend",
    (event) => {

        memoryTouchEndX =
            event.changedTouches[0].clientX;


        handleMemorySwipe();

    },
    {
        passive: true
    }
);


/* =========================================================
   DETECTAR DIRECCIÓN DEL SWIPE
========================================================= */

function handleMemorySwipe() {

    const swipeDistance =
        memoryTouchStartX -
        memoryTouchEndX;


    /*
        50px evita cambios accidentales
        por pequeños movimientos.
    */

    if (
        Math.abs(swipeDistance) < 50
    ) {

        return;

    }


    /*
        Dedo hacia la izquierda
        = siguiente fotografía.
    */

    if (swipeDistance > 0) {

        showMemory(
            currentMemory + 1
        );

    }


    /*
        Dedo hacia la derecha
        = fotografía anterior.
    */

    else {

        showMemory(
            currentMemory - 1
        );

    }

}


/* =========================================================
   INICIALIZAR
========================================================= */

showMemory(0);

/* =========================================================
   ANIMACIÓN DEL ITINERARIO
========================================================= */

const itineraryItems =
    document.querySelectorAll(
        ".itinerary-item"
    );


const itineraryObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },
        {
            threshold: 0.25
        }
    );


itineraryItems.forEach(
    (item) => {

        itineraryObserver.observe(item);

    }
);
/* =========================================================
   URL DE GOOGLE APPS SCRIPT
========================================================= */

const URL_SCRIPT =
    "https://script.google.com/macros/s/AKfycbxo_N47_9kCwh7N4nmu994cz4KKnYkPQijrMPY9S0qP25I2zEcME-Ju7TxozZT7wNRH/exec";


/* =========================================================
   IDENTIFICAR INVITACIÓN DESDE LA URL
========================================================= */

const params = new URLSearchParams(
    window.location.search
);

const guestId = params.get("id");


/* =========================================================
   ELEMENTOS DEL FORMULARIO
========================================================= */

const guestNameElement =
    document.getElementById("guestName");

const guestTicketsElement =
    document.getElementById("guestTickets");

const attendingYes =
    document.getElementById("attendingYes");

const attendingNo =
    document.getElementById("attendingNo");

const confirmAttendance =
    document.getElementById("confirmAttendance");

const rsvpResponse =
    document.getElementById("rsvpResponse");


/* =========================================================
   CARGAR DATOS DE LA INVITACIÓN
========================================================= */

async function loadGuestData() {

    if (!guestId) {

        rsvpResponse.textContent =
            "No pudimos identificar tu invitación.";

        return;

    }


    try {

        const response =
            await fetch(
                `${URL_SCRIPT}?id=${encodeURIComponent(guestId)}`
            );


        const guest =
            await response.json();


        /* =================================================
           INVITACIÓN ENCONTRADA
        ================================================== */

        if (guest.success) {

            const tickets =
                Number(guest.tickets);


            guestTicketsElement.textContent =
                tickets +
                (
                    tickets === 1
                        ? " pase"
                        : " pases"
                );

        }


        /* =================================================
           INVITACIÓN NO ENCONTRADA
        ================================================== */

        else {

            guestTicketsElement.textContent =
                "";

            rsvpResponse.textContent =
                guest.message ||
                "No encontramos tu invitación.";

        }


    } catch (error) {

        console.error(
            "Error al cargar la invitación:",
            error
        );

        guestTicketsElement.textContent =
            "";

        rsvpResponse.textContent =
            "No pudimos cargar tu invitación.";

    }

}


/* =========================================================
   EJECUTAR CARGA DE LA INVITACIÓN
========================================================= */

loadGuestData();


/* =========================================================
   OPCIÓN DE ASISTENCIA SELECCIONADA
========================================================= */

let attendanceStatus = "";


/* =========================================================
   ASISTIRÉ
========================================================= */

attendingYes.addEventListener("click", () => {

    attendanceStatus = "Sí";

    attendingYes.classList.add("selected");

    attendingNo.classList.remove("selected");

    rsvpResponse.textContent = "";

});


/* =========================================================
   NO PODRÉ ASISTIR
========================================================= */

attendingNo.addEventListener("click", () => {

    attendanceStatus = "No";

    attendingNo.classList.add("selected");

    attendingYes.classList.remove("selected");

    rsvpResponse.textContent = "";

});


/* =========================================================
   CONFIRMAR ASISTENCIA
========================================================= */

confirmAttendance.addEventListener(
    "click",
    async () => {


        /* =============================================
           OBTENER NOMBRE
        ============================================== */

        const name =
            guestNameElement
                ? guestNameElement.value.trim()
                : "";


        /* =============================================
           COMPROBAR NOMBRE
        ============================================== */

        if (name === "") {

            rsvpResponse.textContent =
                "Por favor, escribe tu nombre.";

            if (guestNameElement) {

                guestNameElement.focus();

            }

            return;

        }


        /* =============================================
           COMPROBAR OPCIÓN DE ASISTENCIA
        ============================================== */

        if (attendanceStatus === "") {

            rsvpResponse.textContent =
                "Por favor, selecciona una opción.";

            return;

        }


        /* =============================================
           COMPROBAR ID
        ============================================== */

        if (!guestId) {

            rsvpResponse.textContent =
                "No pudimos identificar tu invitación.";

            return;

        }


        /* =============================================
           OBTENER MENSAJE
        ============================================== */

        const messageElement =
            document.getElementById(
                "guestMessage"
            );


        const message =
            messageElement
                ? messageElement.value.trim()
                : "";


        /* =============================================
           DESACTIVAR BOTÓN
        ============================================== */

        confirmAttendance.disabled =
            true;

        confirmAttendance.textContent =
            "Enviando...";


        /* =============================================
           ENVIAR A GOOGLE APPS SCRIPT
        ============================================== */

        try {

            const response =
                await fetch(
                    URL_SCRIPT,
                    {
                        method: "POST",

                        body: JSON.stringify({

                            id:
                                guestId,

                            name:
                                name,

                            attendance:
                                attendanceStatus,

                            message:
                                message

                        })
                    }
                );


            const result =
                await response.json();


            /* =========================================
               RESPUESTA EXITOSA
            ========================================== */

            if (result.success) {

                if (
                    attendanceStatus === "Sí"
                ) {

                    rsvpResponse.textContent =
                        "¡Gracias por confirmar tu asistencia! Nos encantará compartir este día contigo.";

                } else {

                    rsvpResponse.textContent =
                        "Gracias por avisarnos. Te agradecemos mucho tu cariño y buenos deseos.";

                }


                confirmAttendance.textContent =
                    "Confirmación enviada";


            } else {

                rsvpResponse.textContent =
                    result.message ||
                    "No pudimos registrar tu respuesta.";

                confirmAttendance.disabled =
                    false;

                confirmAttendance.textContent =
                    "Confirmar asistencia";

            }


        } catch (error) {

            console.error(
                "Error al enviar confirmación:",
                error
            );

            rsvpResponse.textContent =
                "No pudimos enviar tu confirmación. Inténtalo nuevamente.";

            confirmAttendance.disabled =
                false;

            confirmAttendance.textContent =
                "Confirmar asistencia";

        }

    }
);

/* =========================================================
   BRILLOS ELEGANTES
========================================================= */

const sparklesContainer =
    document.getElementById("sparkles");


function createSparkle() {

    const sparkle =
        document.createElement("span");

    sparkle.classList.add("sparkle");


    /* =============================================
       POSICIÓN
    ============================================== */

    sparkle.style.left =
        Math.random() * 100 + "%";


    /* =============================================
       TAMAÑO
    ============================================== */

    const size =
        3 + Math.random() * 4;

    sparkle.style.width =
        size + "px";

    sparkle.style.height =
        size + "px";


    /* =============================================
       VELOCIDAD
    ============================================== */

    const duration =
        4.5 + Math.random() * 5;

    sparkle.style.animationDuration =
        duration + "s";


    /* =============================================
       ALGUNOS SERÁN DESTELLOS
    ============================================== */

    if (Math.random() < 0.25) {

        sparkle.classList.add("star");

    }


    /* =============================================
       AGREGAR
    ============================================== */

    sparklesContainer.appendChild(
        sparkle
    );


    /* =============================================
       ELIMINAR
    ============================================== */

    setTimeout(() => {

        sparkle.remove();

    }, duration * 1000);

}


/* =========================================================
   GENERAR BRILLOS
========================================================= */

setInterval(() => {

    createSparkle();

}, 400);
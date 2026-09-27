// =====================================================
// ✨ PARTICLES.JS
// SISTEM PARTIKEL BIRU — BERUBAH BENTUK SESUAI GESTURE
// TERMASUK TULISAN DARI KUMPULAN PARTIKEL
// BACKGROUND HITAM
// =====================================================

let particleCanvas = null;
let pctx = null;
let pW = 0;
let pH = 0;

// Lebih banyak partikel biar makin rame
const PARTICLE_COUNT = 650;

let particles = [];

let currentShape = "idle";
let currentTextPhrase = "";
let particleSceneActive = false;

// Lapisan bintang latar
const BG_STAR_COUNT = 180;
let bgStars = [];


// =====================================================
// UTIL
// =====================================================

function prandom(min, max) {
    return Math.random() * (max - min) + min;
}

function pdist(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        const tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
}


// =====================================================
// SETUP CANVAS
// =====================================================

function createParticleCanvas() {

    if (particleCanvas) return;

    particleCanvas = document.createElement("canvas");

    particleCanvas.style.position = "fixed";
    particleCanvas.style.top = "0";
    particleCanvas.style.left = "0";

    particleCanvas.style.width = "100%";
    particleCanvas.style.height = "100%";

    particleCanvas.style.background = "#000000";

    particleCanvas.style.opacity = "0";
    particleCanvas.style.transition = "opacity 1.4s ease";

    particleCanvas.style.zIndex = "5";
    particleCanvas.style.pointerEvents = "none";

    document.body.appendChild(particleCanvas);

    pctx = particleCanvas.getContext("2d");

    resizeParticleCanvas();

    window.addEventListener(
        "resize",
        resizeParticleCanvas
    );
}


function resizeParticleCanvas() {

    if (!particleCanvas) return;

    const dpr =
        Math.min(window.devicePixelRatio || 1, 2);

    pW = window.innerWidth;
    pH = window.innerHeight;

    particleCanvas.width = pW * dpr;
    particleCanvas.height = pH * dpr;

    pctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    initBgStars();

    if (particleSceneActive) {

        if (currentShape === "text") {
            applyTextShape();
        } else {
            setParticleShape(currentShape);
        }
    }
}


// =====================================================
// INISIALISASI PARTIKEL UTAMA
// =====================================================

function initParticles() {

    particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {

        particles.push({

            x: Math.random() * pW,
            y: Math.random() * pH,

            tx: Math.random() * pW,
            ty: Math.random() * pH,

            size: prandom(1.1, 3.0),

            // Gerakan dibuat lebih seragam agar transisi smooth
            speed: prandom(0.055, 0.075),

            twinkle: Math.random() * Math.PI * 2,

            tone: Math.random()
        });
    }
}


// =====================================================
// INISIALISASI BINTANG LATAR
// =====================================================

function initBgStars() {

    bgStars = [];

    for (let i = 0; i < BG_STAR_COUNT; i++) {

        bgStars.push({

            x: Math.random() * pW,
            y: Math.random() * pH,

            size: prandom(0.5, 1.6),

            phase: Math.random() * Math.PI * 2,

            speed: prandom(0.015, 0.045)
        });
    }
}


// =====================================================
// GENERATOR BENTUK: HATI
// =====================================================

function heartPoints(count, cx, cy, scale) {

    const pts = [];

    for (let i = 0; i < count; i++) {

        const t =
            (i / count) * Math.PI * 2;

        const x =
            16 * Math.pow(Math.sin(t), 3);

        const y = -(
            13 * Math.cos(t) -
            5 * Math.cos(2 * t) -
            2 * Math.cos(3 * t) -
            Math.cos(4 * t)
        );

        pts.push({
            x: cx + x * scale,
            y: cy + y * scale
        });
    }

    return pts;
}


// =====================================================
// UTIL: SEBAR TITIK MERATA DI SEKITAR POLIGON
// =====================================================

function polygonOutlinePoints(count, vertices) {

    const segLengths = [];
    let total = 0;

    for (let i = 0; i < vertices.length; i++) {

        const a = vertices[i];
        const b = vertices[(i + 1) % vertices.length];

        const d =
            Math.hypot(
                b.x - a.x,
                b.y - a.y
            );

        segLengths.push(d);
        total += d;
    }

    const pts = [];

    for (let i = 0; i < count; i++) {

        let distLeft =
            (i / count) * total;

        let idx = 0;

        while (
            distLeft > segLengths[idx] &&
            idx < segLengths.length - 1
        ) {

            distLeft -= segLengths[idx];
            idx++;
        }

        const a = vertices[idx];
        const b =
            vertices[(idx + 1) % vertices.length];

        const t =
            segLengths[idx] === 0
                ? 0
                : distLeft / segLengths[idx];

        pts.push({
            x: a.x + (b.x - a.x) * t,
            y: a.y + (b.y - a.y) * t
        });
    }

    return pts;
}


// =====================================================
// GENERATOR BENTUK: BINTANG
// =====================================================

function starPoints(
    count,
    cx,
    cy,
    outerR,
    innerR,
    spikes
) {

    const vertices = [];

    const step =
        Math.PI / spikes;

    let rot = -Math.PI / 2;

    for (
        let i = 0;
        i < spikes * 2;
        i++
    ) {

        const r =
            (i % 2 === 0)
                ? outerR
                : innerR;

        vertices.push({

            x:
                cx +
                Math.cos(rot) * r,

            y:
                cy +
                Math.sin(rot) * r
        });

        rot += step;
    }

    return polygonOutlinePoints(
        count,
        vertices
    );
}


// =====================================================
// GENERATOR BENTUK: SATURNUS
// =====================================================

function saturnPoints(count, cx, cy) {

    const planetR =
        Math.min(pW, pH) * 0.09;

    const ringRx =
        planetR * 2.6;

    const ringRy =
        planetR * 0.9;

    const tilt = -0.35;

    const ringCount =
        Math.round(count * 0.6);

    const bodyCount =
        count - ringCount;

    const pts = [];

    for (
        let i = 0;
        i < bodyCount;
        i++
    ) {

        const t =
            (i / bodyCount) *
            Math.PI * 2;

        pts.push({

            x:
                cx +
                Math.cos(t) * planetR,

            y:
                cy +
                Math.sin(t) * planetR
        });
    }

    for (
        let i = 0;
        i < ringCount;
        i++
    ) {

        const t =
            (i / ringCount) *
            Math.PI * 2;

        const ex =
            Math.cos(t) * ringRx;

        const ey =
            Math.sin(t) * ringRy;

        pts.push({

            x:
                cx +
                ex * Math.cos(tilt) -
                ey * Math.sin(tilt),

            y:
                cy +
                ex * Math.sin(tilt) +
                ey * Math.cos(tilt)
        });
    }

    return pts;
}


// =====================================================
// GENERATOR BENTUK: TULISAN DARI PARTIKEL
// =====================================================

function computeTextLayout(phrase) {

    const testCtx =
        document
            .createElement("canvas")
            .getContext("2d");

    const words =
        phrase.split(" ");

    let lines;

    if (words.length <= 3) {

        lines = [phrase];

    } else {

        const mid =
            Math.ceil(words.length / 2);

        lines = [

            words
                .slice(0, mid)
                .join(" "),

            words
                .slice(mid)
                .join(" ")
        ];
    }

    let fontSize =
        Math.round(
            Math.min(pW, pH) * 0.15
        );

    fontSize =
        Math.max(
            36,
            Math.min(fontSize, 130)
        );

    const maxWidth =
        pW * 0.88;

    for (let i = 0; i < 25; i++) {

        testCtx.font =
            "600 " +
            fontSize +
            "px 'Cormorant Garamond', serif";

        let widest = 0;

        for (
            let j = 0;
            j < lines.length;
            j++
        ) {

            const w =
                testCtx.measureText(
                    lines[j]
                ).width;

            if (w > widest) {
                widest = w;
            }
        }

        if (
            widest <= maxWidth ||
            fontSize <= 22
        ) {
            break;
        }

        fontSize -= 3;
    }

    return {
        fontSize: fontSize,
        lines: lines
    };
}


function textPoints(
    count,
    lines,
    cx,
    cy,
    fontSize
) {

    const off =
        document.createElement("canvas");

    off.width = pW;
    off.height = pH;

    const octx =
        off.getContext("2d");

    octx.fillStyle = "#ffffff";

    octx.font =
        "600 " +
        fontSize +
        "px 'Cormorant Garamond', serif";

    octx.textAlign = "center";
    octx.textBaseline = "middle";

    const lineHeight =
        fontSize * 1.28;

    const startY =
        cy -
        ((lines.length - 1) *
            lineHeight) / 2;

    for (
        let i = 0;
        i < lines.length;
        i++
    ) {

        octx.fillText(
            lines[i],
            cx,
            startY +
            i * lineHeight
        );
    }

    const imgData =
        octx.getImageData(
            0,
            0,
            pW,
            pH
        ).data;

    const candidates = [];

    // Sampling dibuat lebih rapat agar bentuk huruf lebih solid
    const step = 2;

    for (
        let y = 0;
        y < pH;
        y += step
    ) {

        for (
            let x = 0;
            x < pW;
            x += step
        ) {

            const idx =
                (y * pW + x) * 4;

            if (
                imgData[idx + 3] > 120
            ) {

                candidates.push({
                    x: x,
                    y: y
                });
            }
        }
    }

    shuffleArray(candidates);

    const pts = [];

    // Distribusi partikel dibuat lebih merata
    // supaya huruf tidak memiliki bagian yang terlalu kosong.
    if (candidates.length > 0) {

        const stride =
            candidates.length / count;

        for (
            let i = 0;
            i < count;
            i++
        ) {

            const idx =
                Math.min(
                    candidates.length - 1,
                    Math.floor(i * stride)
                );

            const base =
                candidates[idx];

            pts.push({

                x:
                    base.x +
                    prandom(-0.35, 0.35),

                y:
                    base.y +
                    prandom(-0.35, 0.35)
            });
        }

    } else {

        for (
            let i = 0;
            i < count;
            i++
        ) {

            pts.push({
                x: cx,
                y: cy
            });
        }
    }

    return pts;
}


function applyTextShape() {

    if (
        !particleCanvas ||
        particles.length === 0
    ) {
        return;
    }

    const layout =
        computeTextLayout(
            currentTextPhrase
        );

    const cx =
        pW / 2;

    const cy =
        pH / 2;

    const points =
        textPoints(
            PARTICLE_COUNT,
            layout.lines,
            cx,
            cy,
            layout.fontSize
        );

    for (
        let i = 0;
        i < particles.length;
        i++
    ) {

        const p =
            points[
                i % points.length
            ];

        particles[i].tx = p.x;
        particles[i].ty = p.y;
    }
}


// =====================================================
// GANTI BENTUK PARTIKEL
// =====================================================

function setParticleShape(
    shapeName,
    phrase
) {

    if (
        !particleCanvas ||
        particles.length === 0
    ) {
        return;
    }

    currentShape =
        shapeName;

    if (
        shapeName === "text"
    ) {

        currentTextPhrase =
            phrase || "";

        applyTextShape();

        return;
    }

    const cx =
        pW / 2;

    const cy =
        pH / 2;

    let points = null;

    if (
        shapeName === "heart"
    ) {

        const scale =
            Math.min(pW, pH) / 34;

        points =
            heartPoints(
                PARTICLE_COUNT,
                cx,
                cy,
                scale
            );

    } else if (
        shapeName === "star"
    ) {

        const outerR =
            Math.min(pW, pH) * 0.24;

        const innerR =
            outerR * 0.42;

        points =
            starPoints(
                PARTICLE_COUNT,
                cx,
                cy,
                outerR,
                innerR,
                5
            );

    } else if (
        shapeName === "saturn"
    ) {

        points =
            saturnPoints(
                PARTICLE_COUNT,
                cx,
                cy
            );
    }

    if (points) {

        for (
            let i = 0;
            i < particles.length;
            i++
        ) {

            const p =
                points[
                    i % points.length
                ];

            particles[i].tx = p.x;
            particles[i].ty = p.y;
        }

    } else {

        assignIdleTargets();
    }
}

window.setParticleShape =
    setParticleShape;


function assignIdleTargets() {

    for (
        let i = 0;
        i < particles.length;
        i++
    ) {

        particles[i].tx =
            prandom(
                pW * 0.12,
                pW * 0.88
            );

        particles[i].ty =
            prandom(
                pH * 0.12,
                pH * 0.88
            );
    }
}


// =====================================================
// IDLE
// =====================================================

setInterval(function () {

    if (
        currentShape === "idle" &&
        particleSceneActive
    ) {

        assignIdleTargets();
    }

}, 3500);


// =====================================================
// TAMPILKAN SCENE PARTIKEL
// =====================================================

function showParticleScene() {

    createParticleCanvas();

    if (
        particles.length === 0
    ) {

        initParticles();
    }

    if (
        bgStars.length === 0
    ) {

        initBgStars();
    }

    particleSceneActive =
        true;

    particleCanvas.style.opacity =
        "1";

    requestAnimationFrame(
        animateParticles
    );
}

window.showParticleScene =
    showParticleScene;


// =====================================================
// LOOP ANIMASI PARTIKEL
// =====================================================

function animateParticles() {

    if (!particleSceneActive) {
        return;
    }

    // Saat teks aktif, jejak dikurangi
    // supaya tulisan lebih bersih dan terbaca.
    pctx.fillStyle =
        currentShape === "text"
            ? "rgba(0, 0, 0, 0.34)"
            : "rgba(0, 0, 0, 0.22)";

    pctx.fillRect(
        0,
        0,
        pW,
        pH
    );


    // ---------- BINTANG LATAR ----------

    for (
        let i = 0;
        i < bgStars.length;
        i++
    ) {

        const s =
            bgStars[i];

        s.phase +=
            s.speed;

        const a =
            0.12 +
            Math.sin(s.phase) *
            0.12;

        pctx.beginPath();

        pctx.fillStyle =
            "rgba(120, 170, 255," +
            Math.max(
                a,
                0.03
            ).toFixed(2) +
            ")";

        pctx.arc(
            s.x,
            s.y,
            s.size,
            0,
            Math.PI * 2
        );

        pctx.fill();
    }


    // ---------- PARTIKEL UTAMA ----------

    for (
        let i = 0;
        i < particles.length;
        i++
    ) {

        const p =
            particles[i];

        // Pergerakan menuju target dibuat smooth
        p.x +=
            (p.tx - p.x) *
            p.speed;

        p.y +=
            (p.ty - p.y) *
            p.speed;

        p.twinkle +=
            0.05;

        const glow =
            0.55 +
            Math.sin(p.twinkle) *
            0.35;


        // Dua nuansa biru
        const r =
            p.tone > 0.5
                ? 120
                : 90;

        const g =
            p.tone > 0.5
                ? 210
                : 190;

        const b = 255;


        // ---------- HALO ----------

        pctx.beginPath();

        pctx.fillStyle =
            "rgba(" +
            r + "," +
            g + "," +
            b + "," +
            (
                glow *
                (
                    currentShape === "text"
                        ? 0.09
                        : 0.14
                )
            ).toFixed(2) +
            ")";

        pctx.arc(
            p.x,
            p.y,
            p.size *
                (
                    currentShape === "text"
                        ? 1.35
                        : 1.6
                ),
            0,
            Math.PI * 2
        );

        pctx.fill();


        // ---------- INTI TERANG ----------

        pctx.beginPath();

        pctx.fillStyle =
            "rgba(" +
            r + "," +
            g + "," +
            b + "," +
            glow.toFixed(2) +
            ")";

        pctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );

        pctx.fill();
    }


    requestAnimationFrame(
        animateParticles
    );
}
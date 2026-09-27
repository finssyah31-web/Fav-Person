// =====================================================
// 🌹 ANIMASI TANGAN — V8.6 MAGICAL ROSE GARDEN
// =====================================================
// V8.6
// - 4 natural blooming roses
// - 2 roses LEFT
// - 2 roses RIGHT
// - Side roses grow from natural branches
// - Sequential blooming
// - V8.4 realistic rose bloom preserved
// - Magical butterflies
// - Falling petals
// - Bloom magic particles
// - More branches / leaves / buds
// - Living grass
// - Atmospheric moonlight
// - Cinematic depth
// =====================================================


// =====================================================
// FONT MAGICAL
// =====================================================

const fontLink = document.createElement("link");

fontLink.rel = "stylesheet";

fontLink.href =
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap";

document.head.appendChild(fontLink);


// =====================================================
// CANVAS
// =====================================================

const canvas =
    document.getElementById("canvas");

const ctx =
    canvas.getContext("2d");

let W = 0;
let H = 0;

const startTime =
    performance.now();


// =====================================================
// PARTICLES
// =====================================================

const stars = [];
const fireflies = [];
const grass = [];
const soilParticles = [];
const petals = [];
const dust = [];
const foregroundLeaves = [];
const bloomParticles = [];
const magicParticles = [];
const butterflies = [];


// =====================================================
// UTILITY
// =====================================================

function random(min, max) {

    return Math.random() *
        (max - min) +
        min;
}


function clamp(v, min, max) {

    return Math.max(
        min,
        Math.min(max, v)
    );
}


function smooth(t) {

    t = clamp(t, 0, 1);

    return t * t *
        (3 - 2 * t);
}


function easeOutCubic(t) {

    t = clamp(t, 0, 1);

    return 1 -
        Math.pow(
            1 - t,
            3
        );
}


function easeOutBack(t) {

    t = clamp(t, 0, 1);

    const c1 =
        1.70158;

    const c3 =
        c1 + 1;

    return (
        1 +
        c3 *
        Math.pow(t - 1, 3) +
        c1 *
        Math.pow(t - 1, 2)
    );
}


// =====================================================
// RESIZE
// =====================================================

function resize() {

    const dpr =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );

    W =
        window.innerWidth;

    H =
        window.innerHeight;

    canvas.width =
        W * dpr;

    canvas.height =
        H * dpr;

    canvas.style.width =
        W + "px";

    canvas.style.height =
        H + "px";

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

    createGrass();
    createSoil();
    createPetals();
    createDust();
    createForegroundLeaves();
    createMagicParticles();
    createButterflies();
}

window.addEventListener(
    "resize",
    resize
);


// =====================================================
// STARS
// =====================================================

for (let i = 0; i < 220; i++) {

    stars.push({

        x:
            Math.random(),

        y:
            Math.random() *
            0.74,

        size:
            random(
                0.35,
                1.9
            ),

        phase:
            random(
                0,
                Math.PI * 2
            ),

        brightness:
            random(
                0.3,
                0.9
            )
    });
}


// =====================================================
// FIREFLIES
// =====================================================

for (let i = 0; i < 100; i++) {

    fireflies.push({

        x:
            Math.random(),

        y:
            random(
                0.35,
                0.86
            ),

        size:
            random(
                0.8,
                2.8
            ),

        speed:
            random(
                0.3,
                1.1
            ),

        phase:
            random(
                0,
                Math.PI * 2
            ),

        drift:
            random(
                15,
                50
            )
    });
}


// =====================================================
// GRASS
// =====================================================

function createGrass() {

    grass.length = 0;

    for (let i = 0; i < 480; i++) {

        grass.push({

            x:
                random(
                    -30,
                    W + 30
                ),

            height:
                random(
                    15,
                    68
                ),

            width:
                random(
                    0.7,
                    2.2
                ),

            phase:
                random(
                    0,
                    Math.PI * 2
                ),

            layer:
                Math.random(),

            bend:
                random(
                    0.7,
                    1.5
                )
        });
    }
}


// =====================================================
// SOIL
// =====================================================

function createSoil() {

    soilParticles.length = 0;

    for (let i = 0; i < 260; i++) {

        soilParticles.push({

            x:
                random(
                    0,
                    W
                ),

            y:
                random(
                    H * 0.81,
                    H
                ),

            size:
                random(
                    0.4,
                    2.5
                ),

            alpha:
                random(
                    0.12,
                    0.42
                )
        });
    }
}


// =====================================================
// FALLING PETALS
// =====================================================

function createPetals() {

    petals.length = 0;

    for (let i = 0; i < 65; i++) {

        petals.push({

            x:
                random(
                    0,
                    W
                ),

            y:
                random(
                    H * 0.08,
                    H
                ),

            size:
                random(
                    1.8,
                    5.5
                ),

            speed:
                random(
                    0.12,
                    0.52
                ),

            phase:
                random(
                    0,
                    Math.PI * 2
                ),

            rotation:
                random(
                    0,
                    Math.PI * 2
                ),

            rotationSpeed:
                random(
                    -0.008,
                    0.008
                ),

            drift:
                random(
                    18,
                    45
                ),

            alpha:
                random(
                    0.25,
                    0.55
                )
        });
    }
}


// =====================================================
// DUST
// =====================================================

function createDust() {

    dust.length = 0;

    for (let i = 0; i < 130; i++) {

        dust.push({

            x:
                random(
                    0,
                    W
                ),

            y:
                random(
                    H * 0.20,
                    H * 0.86
                ),

            size:
                random(
                    0.5,
                    1.8
                ),

            phase:
                random(
                    0,
                    Math.PI * 2
                ),

            speed:
                random(
                    0.1,
                    0.5
                )
        });
    }
}


// =====================================================
// FOREGROUND LEAVES
// =====================================================

function createForegroundLeaves() {

    foregroundLeaves.length = 0;

    for (let i = 0; i < 30; i++) {

        foregroundLeaves.push({

            x:
                random(
                    -70,
                    W + 70
                ),

            y:
                random(
                    H * 0.69,
                    H * 0.98
                ),

            size:
                random(
                    20,
                    65
                ),

            angle:
                random(
                    -1.2,
                    1.2
                ),

            phase:
                random(
                    0,
                    Math.PI * 2
                ),

            depth:
                random(
                    0.4,
                    1
                )
        });
    }
}


// =====================================================
// ✨ MAGIC PARTICLES
// =====================================================

function createMagicParticles() {

    magicParticles.length = 0;

    for (let i = 0; i < 100; i++) {

        magicParticles.push({

            angle:
                random(
                    0,
                    Math.PI * 2
                ),

            radius:
                random(
                    40,
                    170
                ),

            speed:
                random(
                    0.00012,
                    0.00045
                ),

            phase:
                random(
                    0,
                    Math.PI * 2
                ),

            size:
                random(
                    0.7,
                    2.2
                ),

            alpha:
                random(
                    0.18,
                    0.65
                ),

            vertical:
                random(
                    0.35,
                    0.75
                )
        });
    }
}


// =====================================================
// 🦋 BUTTERFLIES
// =====================================================

function createButterflies() {

    butterflies.length = 0;

    for (let i = 0; i < 7; i++) {

        butterflies.push({

            x:
                random(
                    W * 0.15,
                    W * 0.85
                ),

            y:
                random(
                    H * 0.30,
                    H * 0.72
                ),

            size:
                random(
                    7,
                    13
                ),

            speed:
                random(
                    0.00018,
                    0.00042
                ),

            phase:
                random(
                    0,
                    Math.PI * 2
                ),

            drift:
                random(
                    25,
                    75
                ),

            vertical:
                random(
                    12,
                    35
                ),

            direction:
                Math.random() > 0.5
                    ? 1
                    : -1
        });
    }
}


// =====================================================
// BLOOM PARTICLES
// =====================================================

function createBloomParticles(
    x,
    y
) {

    for (let i = 0; i < 70; i++) {

        const angle =
            random(
                0,
                Math.PI * 2
            );

        const speed =
            random(
                0.3,
                1.5
            );

        bloomParticles.push({

            x,
            y,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            life:
                random(
                    0.5,
                    1
                ),

            size:
                random(
                    0.8,
                    2.5
                )
        });
    }
}


// =====================================================
// BACKGROUND
// =====================================================

function drawBackground(time) {

    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            0,
            H
        );

    gradient.addColorStop(
        0,
        "#01020a"
    );

    gradient.addColorStop(
        0.30,
        "#020817"
    );

    gradient.addColorStop(
        0.55,
        "#071525"
    );

    gradient.addColorStop(
        0.78,
        "#0a170d"
    );

    gradient.addColorStop(
        1,
        "#010301"
    );

    ctx.fillStyle =
        gradient;

    ctx.fillRect(
        0,
        0,
        W,
        H
    );


    // =================================================
    // ATMOSPHERIC GLOW
    // =================================================

    const atmosphere =
        ctx.createRadialGradient(
            W * 0.5,
            H * 0.43,
            10,
            W * 0.5,
            H * 0.43,
            H * 0.75
        );

    atmosphere.addColorStop(
        0,
        "rgba(100,150,220,0.13)"
    );

    atmosphere.addColorStop(
        0.5,
        "rgba(40,80,150,0.035)"
    );

    atmosphere.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );

    ctx.fillStyle =
        atmosphere;

    ctx.fillRect(
        0,
        0,
        W,
        H
    );


    // =================================================
    // MOON
    // =================================================

    const moonX =
        W * 0.82;

    const moonY =
        H * 0.16;


    const moonGlow =
        ctx.createRadialGradient(
            moonX,
            moonY,
            5,
            moonX,
            moonY,
            230
        );

    moonGlow.addColorStop(
        0,
        "rgba(255,255,255,0.22)"
    );

    moonGlow.addColorStop(
        0.25,
        "rgba(210,225,255,0.09)"
    );

    moonGlow.addColorStop(
        1,
        "rgba(255,255,255,0)"
    );

    ctx.fillStyle =
        moonGlow;

    ctx.beginPath();

    ctx.arc(
        moonX,
        moonY,
        230,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // moon

    ctx.beginPath();

    ctx.arc(
        moonX,
        moonY,
        35,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "rgba(247,249,255,0.88)";

    ctx.shadowBlur =
        35;

    ctx.shadowColor =
        "rgba(220,235,255,0.8)";

    ctx.fill();

    ctx.shadowBlur = 0;


    // =================================================
    // MOON CRATERS
    // =================================================

    ctx.fillStyle =
        "rgba(170,180,200,0.15)";

    ctx.beginPath();

    ctx.arc(
        moonX - 11,
        moonY - 8,
        5,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.beginPath();

    ctx.arc(
        moonX + 12,
        moonY + 10,
        4,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.beginPath();

    ctx.arc(
        moonX - 5,
        moonY + 15,
        3,
        0,
        Math.PI * 2
    );

    ctx.fill();
}


// =====================================================
// STARS
// =====================================================

function drawStars(time) {

    for (const star of stars) {

        const twinkle =
            star.brightness *
            (
                0.55 +
                Math.sin(
                    time * 0.0018 +
                    star.phase
                ) * 0.35
            );

        ctx.beginPath();

        ctx.arc(
            star.x * W,
            star.y * H,
            star.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255,255,255,${twinkle})`;

        ctx.fill();
    }
}


// =====================================================
// MIST
// =====================================================

function drawMist(time) {

    for (let i = 0; i < 6; i++) {

        const y =
            H * (
                0.42 +
                i * 0.075
            );

        const x =
            W * 0.5 +
            Math.sin(
                time * 0.00015 + i
            ) * 130;

        const mist =
            ctx.createRadialGradient(
                x,
                y,
                0,
                x,
                y,
                250
            );

        mist.addColorStop(
            0,
            "rgba(130,170,190,0.035)"
        );

        mist.addColorStop(
            1,
            "rgba(130,170,190,0)"
        );

        ctx.fillStyle =
            mist;

        ctx.fillRect(
            x - 270,
            y - 90,
            540,
            180
        );
    }
}


// =====================================================
// GROUND
// =====================================================

function drawGround(time) {

    const groundY =
        H * 0.81;


    const soil =
        ctx.createLinearGradient(
            0,
            groundY,
            0,
            H
        );

    soil.addColorStop(
        0,
        "#1b2918"
    );

    soil.addColorStop(
        0.2,
        "#111a10"
    );

    soil.addColorStop(
        0.6,
        "#080d08"
    );

    soil.addColorStop(
        1,
        "#020302"
    );

    ctx.fillStyle =
        soil;

    ctx.fillRect(
        0,
        groundY,
        W,
        H - groundY
    );


    // =================================================
    // MOSS
    // =================================================

    ctx.beginPath();

    ctx.moveTo(
        0,
        groundY
    );

    for (
        let x = 0;
        x <= W;
        x += 10
    ) {

        const wave =
            Math.sin(
                x * 0.018
            ) * 5 +
            Math.sin(
                x * 0.043
            ) * 2.5;

        ctx.lineTo(
            x,
            groundY + wave
        );
    }

    ctx.lineTo(
        W,
        H
    );

    ctx.lineTo(
        0,
        H
    );

    ctx.closePath();

    ctx.fillStyle =
        "#101b10";

    ctx.fill();


    // =================================================
    // SOIL PARTICLES
    // =================================================

    for (
        const p of soilParticles
    ) {

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(130,150,105,${p.alpha})`;

        ctx.fill();
    }


    // =================================================
    // GRASS
    // =================================================

    for (
        const g of grass
    ) {

        const wind =
            Math.sin(
                time * 0.0014 +
                g.phase
            ) *
            7 *
            g.bend;

        const baseY =
            groundY + 5;

        ctx.beginPath();

        ctx.moveTo(
            g.x,
            baseY
        );

        ctx.quadraticCurveTo(
            g.x + wind,
            baseY -
            g.height * 0.55,
            g.x +
            wind * 1.4,
            baseY -
            g.height
        );

        ctx.strokeStyle =
            g.layer > 0.5
                ? "rgba(75,155,80,0.68)"
                : "rgba(105,175,100,0.42)";

        ctx.lineWidth =
            g.width;

        ctx.stroke();
    }


    // =================================================
    // SMALL MOSS LIGHT
    // =================================================

    const mossGlow =
        ctx.createRadialGradient(
            W * 0.5,
            groundY,
            0,
            W * 0.5,
            groundY,
            W * 0.55
        );

    mossGlow.addColorStop(
        0,
        "rgba(100,180,100,0.045)"
    );

    mossGlow.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );

    ctx.fillStyle =
        mossGlow;

    ctx.fillRect(
        0,
        groundY - 30,
        W,
        120
    );
}


// =====================================================
// BRANCH
// =====================================================

function drawBranch(
    startX,
    startY,
    endX,
    endY,
    width,
    time,
    growth
) {

    if (growth <= 0)
        return;

    const g =
        easeOutCubic(
            growth
        );

    const sway =
        Math.sin(
            time * 0.0011 +
            startX * 0.01
        ) * 3.5;

    const currentX =
        startX +
        (endX - startX) *
        g;

    const currentY =
        startY +
        (endY - startY) *
        g;

    ctx.beginPath();

    ctx.moveTo(
        startX,
        startY
    );

    ctx.quadraticCurveTo(
        (
            startX +
            currentX
        ) / 2 +
        sway,

        (
            startY +
            currentY
        ) / 2,

        currentX,
        currentY
    );

    ctx.strokeStyle =
        "#4c7044";

    ctx.lineWidth =
        width *
        (
            0.5 +
            g * 0.5
        );

    ctx.lineCap =
        "round";

    ctx.shadowBlur = 8;

    ctx.shadowColor =
        "rgba(70,140,80,0.3)";

    ctx.stroke();

    ctx.shadowBlur = 0;
}


// =====================================================
// LEAF
// =====================================================

function drawLeaf(
    x,
    y,
    size,
    angle,
    time,
    growth
) {

    if (growth <= 0)
        return;

    const g =
        easeOutBack(
            growth
        );

    const sway =
        Math.sin(
            time * 0.0013 +
            x * 0.01
        ) * 0.06;

    ctx.save();

    ctx.globalAlpha =
        clamp(
            growth,
            0,
            1
        );

    ctx.translate(
        x,
        y
    );

    ctx.rotate(
        angle + sway
    );

    ctx.scale(
        g,
        g
    );

    ctx.beginPath();

    ctx.moveTo(
        0,
        0
    );

    ctx.bezierCurveTo(
        size * 0.5,
        -size * 0.7,
        size * 1.2,
        -size * 0.7,
        size,
        0
    );

    ctx.bezierCurveTo(
        size * 0.6,
        size * 0.45,
        size * 0.2,
        size * 0.4,
        0,
        0
    );


    const gradient =
        ctx.createLinearGradient(
            0,
            -size,
            size,
            size
        );

    gradient.addColorStop(
        0,
        "#83b967"
    );

    gradient.addColorStop(
        0.45,
        "#3c713e"
    );

    gradient.addColorStop(
        1,
        "#17351f"
    );

    ctx.fillStyle =
        gradient;

    ctx.fill();


    // vein

    ctx.beginPath();

    ctx.moveTo(
        0,
        0
    );

    ctx.lineTo(
        size * 0.9,
        -size * 0.05
    );

    ctx.strokeStyle =
        "rgba(205,235,185,0.48)";

    ctx.lineWidth = 1;

    ctx.stroke();

    ctx.restore();
}


// =====================================================
// BUD
// =====================================================

function drawBud(
    x,
    y,
    scale,
    time,
    growth
) {

    if (growth <= 0)
        return;

    const g =
        smooth(growth);

    const pulse =
        1 +
        Math.sin(
            time * 0.002 +
            x
        ) * 0.035;

    ctx.save();

    ctx.translate(
        x,
        y
    );

    ctx.scale(
        scale *
        pulse *
        g,

        scale *
        pulse *
        g
    );


    // glow

    const glow =
        ctx.createRadialGradient(
            0,
            -8,
            2,
            0,
            -8,
            30
        );

    glow.addColorStop(
        0,
        "rgba(255,255,255,0.2)"
    );

    glow.addColorStop(
        1,
        "rgba(255,255,255,0)"
    );

    ctx.fillStyle =
        glow;

    ctx.beginPath();

    ctx.arc(
        0,
        -8,
        30,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // bud

    ctx.beginPath();

    ctx.moveTo(
        0,
        12
    );

    ctx.bezierCurveTo(
        -15,
        -5,
        -11,
        -28,
        0,
        -35
    );

    ctx.bezierCurveTo(
        11,
        -28,
        15,
        -5,
        0,
        12
    );

    ctx.fillStyle =
        "#f8f9f6";

    ctx.shadowBlur = 15;

    ctx.shadowColor =
        "rgba(255,255,255,0.8)";

    ctx.fill();

    ctx.shadowBlur = 0;


    // sepal

    ctx.beginPath();

    ctx.moveTo(
        -9,
        5
    );

    ctx.lineTo(
        0,
        -7
    );

    ctx.lineTo(
        9,
        5
    );

    ctx.fillStyle =
        "#507849";

    ctx.fill();

    ctx.restore();
}


// =====================================================
// 🌹 REALISTIC ROSE BLOOM
// =====================================================

function drawRose(
    x,
    y,
    scale,
    time,
    bloom
) {

    if (bloom <= 0)
        return;

    const b =
        smooth(bloom);


    const outer =
        smooth(
            clamp(
                (b - 0.08) /
                0.40,
                0,
                1
            )
        );

    const middle =
        smooth(
            clamp(
                (b - 0.30) /
                0.40,
                0,
                1
            )
        );

    const inner =
        smooth(
            clamp(
                (b - 0.58) /
                0.42,
                0,
                1
            )
        );


    const breathing =
        1 +
        Math.sin(
            time * 0.0015
        ) * 0.018;

    const sway =
        Math.sin(
            time * 0.0009 +
            x * 0.01
        ) * 2.2;


    ctx.save();

    ctx.translate(
        x + sway,
        y
    );

    ctx.scale(
        scale * breathing,
        scale * breathing
    );


    // =================================================
    // FLOWER AURA
    // =================================================

    const glowStrength =
        0.10 +
        b * 0.18;

    const aura =
        ctx.createRadialGradient(
            0,
            0,
            3,
            0,
            0,
            145
        );

    aura.addColorStop(
        0,
        `rgba(255,255,255,${glowStrength})`
    );

    aura.addColorStop(
        0.4,
        "rgba(225,240,255,0.07)"
    );

    aura.addColorStop(
        1,
        "rgba(255,255,255,0)"
    );

    ctx.fillStyle =
        aura;

    ctx.beginPath();

    ctx.arc(
        0,
        0,
        145,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // =================================================
    // PETAL FUNCTION
    // =================================================

    function petal(
        angle,
        radius,
        width,
        height,
        open,
        alpha
    ) {

        if (open <= 0)
            return;

        const currentRadius =
            radius *
            (
                0.18 +
                open * 0.82
            );

        const px =
            Math.cos(angle) *
            currentRadius;

        const py =
            Math.sin(angle) *
            currentRadius *
            0.68;

        const rotation =
            angle +
            Math.PI / 2 +
            (
                1 - open
            ) * 0.48;

        const petalScale =
            0.12 +
            open * 0.88;

        ctx.save();

        ctx.translate(
            px,
            py
        );

        ctx.rotate(
            rotation
        );

        ctx.scale(
            petalScale,
            petalScale
        );

        ctx.beginPath();

        ctx.moveTo(
            0,
            -height
        );

        ctx.bezierCurveTo(
            width,
            -height * 0.65,
            width * 1.05,
            height * 0.35,
            0,
            height
        );

        ctx.bezierCurveTo(
            -width * 1.05,
            height * 0.35,
            -width,
            -height * 0.65,
            0,
            -height
        );

        const gradient =
            ctx.createLinearGradient(
                -width,
                -height,
                width,
                height
            );

        gradient.addColorStop(
            0,
            `rgba(255,255,255,${alpha})`
        );

        gradient.addColorStop(
            0.55,
            `rgba(246,248,245,${alpha})`
        );

        gradient.addColorStop(
            1,
            `rgba(215,220,215,${alpha})`
        );

        ctx.fillStyle =
            gradient;

        ctx.shadowBlur =
            7 +
            open * 10;

        ctx.shadowColor =
            "rgba(255,255,255,0.55)";

        ctx.fill();

        ctx.restore();
    }


    // =================================================
    // OUTER PETALS
    // =================================================

    const outerCount = 9;

    for (
        let i = 0;
        i < outerCount;
        i++
    ) {

        const angle =
            i *
            Math.PI * 2 /
            outerCount;

        petal(
            angle,
            58,
            25,
            48,
            outer,
            0.97
        );
    }


    // =================================================
    // MIDDLE PETALS
    // =================================================

    const middleCount = 8;

    for (
        let i = 0;
        i < middleCount;
        i++
    ) {

        const angle =
            i *
            Math.PI * 2 /
            middleCount +
            0.38;

        petal(
            angle,
            37,
            22,
            43,
            middle,
            0.99
        );
    }


    // =================================================
    // INNER PETALS
    // =================================================

    const innerCount = 7;

    for (
        let i = 0;
        i < innerCount;
        i++
    ) {

        const angle =
            i *
            Math.PI * 2 /
            innerCount +
            0.2;

        petal(
            angle,
            20,
            18,
            32,
            inner,
            1
        );
    }


    // =================================================
    // CENTER CURLS
    // =================================================

    const center =
        smooth(
            clamp(
                (b - 0.72) /
                0.28,
                0,
                1
            )
        );


    for (
        let i = 0;
        i < 6;
        i++
    ) {

        const angle =
            i * 1.05 +
            time * 0.00005;

        const radius =
            3 +
            i * 2.3;

        const px =
            Math.cos(angle) *
            radius *
            center;

        const py =
            Math.sin(angle) *
            radius *
            0.55 *
            center;


        ctx.save();

        ctx.translate(
            px,
            py
        );

        ctx.rotate(
            angle
        );

        ctx.beginPath();

        ctx.ellipse(
            0,
            0,
            13 * center,
            7 * center,
            0,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "#ffffff";

        ctx.shadowBlur = 8;

        ctx.shadowColor =
            "rgba(255,255,255,0.8)";

        ctx.fill();

        ctx.restore();
    }


    // center

    ctx.beginPath();

    ctx.arc(
        0,
        0,
        5 * center,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#e4e8e3";

    ctx.fill();

    ctx.restore();
}


// =====================================================
// ✨ MAGIC PARTICLES AROUND 4 ROSES
// =====================================================

function drawMagicParticles(
    time,
    flowers
) {

    for (
        const flower of flowers
    ) {

        if (
            flower.bloom <
            0.35
        )
            continue;


        const strength =
            smooth(
                clamp(
                    (
                        flower.bloom -
                        0.35
                    ) /
                    0.65,
                    0,
                    1
                )
            );


        for (
            let i = 0;
            i < magicParticles.length;
            i++
        ) {

            const p =
                magicParticles[i];

            const angle =
                p.angle +
                time * p.speed +
                flower.offset;

            const radius =
                p.radius +
                Math.sin(
                    time * 0.001 +
                    p.phase
                ) * 15;

            const px =
                flower.x +
                Math.cos(angle) *
                radius;

            const py =
                flower.y +
                Math.sin(angle) *
                radius *
                p.vertical;

            const alpha =
                (
                    p.alpha *
                    strength
                ) *
                (
                    0.55 +
                    Math.sin(
                        time * 0.0025 +
                        p.phase
                    ) * 0.45
                );


            ctx.beginPath();

            ctx.arc(
                px,
                py,
                p.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(220,245,255,${alpha})`;

            ctx.shadowBlur =
                14;

            ctx.shadowColor =
                "rgba(210,240,255,0.9)";

            ctx.fill();

            ctx.shadowBlur = 0;
        }
    }
}


// =====================================================
// ✨ BLOOM SPARKLES
// =====================================================

function drawBloomSparkles(
    x,
    y,
    time,
    bloom
) {

    if (bloom < 0.45)
        return;

    const strength =
        smooth(
            clamp(
                (bloom - 0.45) /
                0.55,
                0,
                1
            )
        );


    for (
        let i = 0;
        i < 24;
        i++
    ) {

        const angle =
            time * 0.00035 +
            i *
            Math.PI * 2 /
            24;

        const radius =
            65 +
            Math.sin(
                time * 0.0015 +
                i
            ) * 18;


        const px =
            x +
            Math.cos(angle) *
            radius;

        const py =
            y +
            Math.sin(angle) *
            radius *
            0.55;


        const alpha =
            (
                0.10 +
                Math.sin(
                    time * 0.003 +
                    i
                ) * 0.07
            ) *
            strength;


        ctx.beginPath();

        ctx.arc(
            px,
            py,
            1.3,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(235,248,255,${alpha})`;

        ctx.shadowBlur =
            14;

        ctx.shadowColor =
            "rgba(230,245,255,0.9)";

        ctx.fill();

        ctx.shadowBlur = 0;
    }
}


// =====================================================
// BLOOM PARTICLES
// =====================================================

function drawBloomParticles() {

    for (
        let i =
            bloomParticles.length - 1;

        i >= 0;

        i--
    ) {

        const p =
            bloomParticles[i];

        p.x +=
            p.vx;

        p.y +=
            p.vy;

        p.vy -=
            0.005;

        p.life -=
            0.006;


        if (
            p.life <= 0
        ) {

            bloomParticles.splice(
                i,
                1
            );

            continue;
        }


        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255,255,255,${p.life})`;

        ctx.shadowBlur =
            12;

        ctx.shadowColor =
            "rgba(255,255,255,0.8)";

        ctx.fill();

        ctx.shadowBlur = 0;
    }
}


// =====================================================
// FIREFLIES
// =====================================================

function drawFireflies(time) {

    for (
        const f of fireflies
    ) {

        const x =
            f.x * W +
            Math.sin(
                time * 0.0005 *
                f.speed +
                f.phase
            ) *
            f.drift;

        const y =
            f.y * H +
            Math.cos(
                time * 0.0007 *
                f.speed +
                f.phase
            ) *
            f.drift *
            0.7;


        const alpha =
            0.22 +
            Math.sin(
                time * 0.003 +
                f.phase
            ) * 0.28;


        ctx.beginPath();

        ctx.arc(
            x,
            y,
            f.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(220,255,220,${alpha})`;

        ctx.shadowBlur =
            18;

        ctx.shadowColor =
            "rgba(200,255,220,0.9)";

        ctx.fill();

        ctx.shadowBlur = 0;
    }
}


// =====================================================
// 🌸 FALLING PETALS
// =====================================================

function drawPetals(time) {

    for (
        const p of petals
    ) {

        p.y +=
            p.speed;

        p.rotation +=
            p.rotationSpeed;


        if (
            p.y >
            H + 20
        ) {

            p.y =
                H * 0.08;

            p.x =
                random(
                    0,
                    W
                );
        }


        const x =
            p.x +
            Math.sin(
                time * 0.001 +
                p.phase
            ) *
            p.drift;


        ctx.save();

        ctx.translate(
            x,
            p.y
        );

        ctx.rotate(
            p.rotation
        );

        ctx.beginPath();

        ctx.ellipse(
            0,
            0,
            p.size,
            p.size * 0.55,
            0,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255,255,255,${p.alpha})`;

        ctx.shadowBlur = 8;

        ctx.shadowColor =
            "rgba(255,255,255,0.7)";

        ctx.fill();

        ctx.restore();
    }
}


// =====================================================
// 🌸 PETALS FROM FLOWERS
// =====================================================

function drawFlowerPetals(
    time,
    x,
    y,
    bloom,
    seed
) {

    if (
        bloom <
        0.70
    )
        return;


    const strength =
        smooth(
            clamp(
                (bloom - 0.70) /
                0.30,
                0,
                1
            )
        );


    for (
        let i = 0;
        i < 4;
        i++
    ) {

        const angle =
            time * 0.00015 +
            seed +
            i * 1.8;

        const radius =
            75 +
            Math.sin(
                time * 0.0008 +
                i
            ) * 25;

        const px =
            x +
            Math.cos(angle) *
            radius;

        const py =
            y +
            Math.sin(angle) *
            radius *
            0.55 +
            Math.sin(
                time * 0.0012 +
                i
            ) * 15;


        const alpha =
            0.15 *
            strength *
            (
                0.5 +
                Math.sin(
                    time * 0.002 +
                    i
                ) * 0.5
            );


        ctx.save();

        ctx.translate(
            px,
            py
        );

        ctx.rotate(
            angle +
            Math.PI / 2
        );

        ctx.scale(
            0.8,
            0.45
        );

        ctx.beginPath();

        ctx.ellipse(
            0,
            0,
            7,
            11,
            0,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255,255,255,${alpha})`;

        ctx.shadowBlur =
            10;

        ctx.shadowColor =
            "rgba(255,255,255,0.5)";

        ctx.fill();

        ctx.restore();
    }
}


// =====================================================
// DUST
// =====================================================

function drawDust(time) {

    for (
        const d of dust
    ) {

        const x =
            d.x +
            Math.sin(
                time * 0.0006 *
                d.speed +
                d.phase
            ) * 25;

        const y =
            d.y +
            Math.cos(
                time * 0.0005 *
                d.speed +
                d.phase
            ) * 20;


        const alpha =
            0.05 +
            Math.sin(
                time * 0.002 +
                d.phase
            ) * 0.04;


        ctx.beginPath();

        ctx.arc(
            x,
            y,
            d.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(190,220,255,${alpha})`;

        ctx.fill();
    }
}


// =====================================================
// 🦋 BUTTERFLIES
// =====================================================

function drawButterflies(time) {

    for (
        const b of butterflies
    ) {

        const baseX =
            b.x +
            Math.sin(
                time * b.speed +
                b.phase
            ) *
            b.drift;

        const baseY =
            b.y +
            Math.cos(
                time * b.speed * 1.3 +
                b.phase
            ) *
            b.vertical;


        const flap =
            Math.sin(
                time * 0.018 +
                b.phase
            );

        const wing =
            Math.abs(flap);


        const rotation =
            Math.sin(
                time * b.speed * 0.8 +
                b.phase
            ) * 0.3;


        ctx.save();

        ctx.translate(
            baseX,
            baseY
        );

        ctx.rotate(
            rotation
        );

        ctx.scale(
            b.direction,
            1
        );


        // glow

        ctx.beginPath();

        ctx.arc(
            0,
            0,
            b.size * 1.8,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(220,240,255,0.035)";

        ctx.fill();


        // left wing

        ctx.save();

        ctx.scale(
            wing + 0.12,
            1
        );

        ctx.beginPath();

        ctx.ellipse(
            -b.size * 0.65,
            -b.size * 0.18,
            b.size * 0.75,
            b.size,
            -0.45,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(210,235,255,0.72)";

        ctx.shadowBlur =
            12;

        ctx.shadowColor =
            "rgba(190,225,255,0.8)";

        ctx.fill();

        ctx.restore();


        // right wing

        ctx.save();

        ctx.scale(
            wing + 0.12,
            1
        );

        ctx.beginPath();

        ctx.ellipse(
            b.size * 0.65,
            -b.size * 0.18,
            b.size * 0.75,
            b.size,
            0.45,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(225,240,255,0.68)";

        ctx.shadowBlur =
            12;

        ctx.shadowColor =
            "rgba(190,225,255,0.8)";

        ctx.fill();

        ctx.restore();


        // body

        ctx.beginPath();

        ctx.ellipse(
            0,
            0,
            b.size * 0.13,
            b.size * 0.75,
            0,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(70,80,70,0.9)";

        ctx.fill();


        // antenna

        ctx.beginPath();

        ctx.moveTo(
            -1,
            -b.size * 0.5
        );

        ctx.quadraticCurveTo(
            -b.size * 0.5,
            -b.size,
            -b.size * 0.65,
            -b.size * 1.1
        );

        ctx.moveTo(
            1,
            -b.size * 0.5
        );

        ctx.quadraticCurveTo(
            b.size * 0.5,
            -b.size,
            b.size * 0.65,
            -b.size * 1.1
        );

        ctx.strokeStyle =
            "rgba(210,225,220,0.6)";

        ctx.lineWidth =
            0.7;

        ctx.stroke();

        ctx.restore();
    }
}


// =====================================================
// FOREGROUND LEAVES
// =====================================================

function drawForegroundLeaves(time) {

    for (
        const leaf of foregroundLeaves
    ) {

        const sway =
            Math.sin(
                time * 0.001 +
                leaf.phase
            ) * 0.08;


        ctx.save();

        ctx.globalAlpha =
            0.18 +
            leaf.depth * 0.16;

        ctx.translate(
            leaf.x,
            leaf.y
        );

        ctx.rotate(
            leaf.angle +
            sway
        );


        ctx.beginPath();

        ctx.moveTo(
            0,
            0
        );

        ctx.bezierCurveTo(
            leaf.size * 0.5,
            -leaf.size * 0.7,
            leaf.size * 1.2,
            -leaf.size * 0.7,
            leaf.size,
            0
        );

        ctx.bezierCurveTo(
            leaf.size * 0.6,
            leaf.size * 0.45,
            leaf.size * 0.2,
            leaf.size * 0.4,
            0,
            0
        );

        ctx.fillStyle =
            "#315d36";

        ctx.fill();

        ctx.restore();
    }
}


// =====================================================
// 🌹 PLANT V8.6
// =====================================================

function drawPlant(
    x,
    y,
    scale,
    growth,
    mainBloom,
    sideBloom,
    side,
    time
) {

    const groundY =
        H * 0.81;


    // =================================================
    // MAIN STEM
    // =================================================

    drawBranch(
        x,
        groundY,
        x,
        y + 48,
        5 * scale,
        time,
        growth
    );


    // =================================================
    // MAIN BRANCHES
    // =================================================

    drawBranch(
        x,
        H * 0.70,
        x +
        side * W * 0.14,
        H * 0.55,
        3 * scale,
        time,
        growth
    );


    drawBranch(
        x,
        H * 0.65,
        x +
        side * W * 0.09,
        H * 0.44,
        3 * scale,
        time,
        growth
    );


    drawBranch(
        x,
        H * 0.74,
        x -
        side * W * 0.09,
        H * 0.58,
        3 * scale,
        time,
        growth
    );


    drawBranch(
        x,
        H * 0.69,
        x +
        side * W * 0.04,
        H * 0.50,
        2 * scale,
        time,
        growth
    );


    // =================================================
    // EXTRA NATURAL BRANCHES
    // =================================================

    drawBranch(
        x +
        side * W * 0.03,
        H * 0.61,

        x +
        side * W * 0.18,

        H * 0.47,

        1.8 * scale,

        time,

        clamp(
            growth * 1.05,
            0,
            1
        )
    );


    drawBranch(
        x -
        side * W * 0.02,
        H * 0.72,

        x -
        side * W * 0.15,

        H * 0.62,

        1.8 * scale,

        time,

        clamp(
            growth * 0.95,
            0,
            1
        )
    );


    // =================================================
    // 🌹 SECOND FLOWER BRANCH
    // =================================================
    // Ini cabang khusus untuk mawar kedua.
    // Bukan ditempel di sebelah bunga utama,
    // tetapi tumbuh dari batang samping.

    const sideFlowerX =
        x +
        side * W * 0.135;

    const sideFlowerY =
        H * 0.585;


    drawBranch(
        x +
        side * W * 0.02,

        H * 0.68,

        sideFlowerX,

        sideFlowerY + 32,

        2.4 * scale,

        time,

        clamp(
            growth * 0.92,
            0,
            1
        )
    );


    // =================================================
    // SMALL BRANCH TO SIDE FLOWER
    // =================================================

    drawBranch(
        x +
        side * W * 0.075,

        H * 0.63,

        sideFlowerX,

        sideFlowerY + 32,

        1.5 * scale,

        time,

        clamp(
            growth * 0.96,
            0,
            1
        )
    );


    // =================================================
    // LEAVES
    // =================================================

    drawLeaf(
        x +
        side * W * 0.12,

        H * 0.56,

        35 * scale,

        side > 0
            ? -0.5
            : -2.6,

        time,

        growth
    );


    drawLeaf(
        x +
        side * W * 0.08,

        H * 0.67,

        42 * scale,

        side > 0
            ? 0.2
            : 2.8,

        time,

        growth
    );


    drawLeaf(
        x -
        side * W * 0.05,

        H * 0.62,

        38 * scale,

        side > 0
            ? -0.8
            : -2.3,

        time,

        growth
    );


    drawLeaf(
        x +
        side * W * 0.04,

        H * 0.48,

        30 * scale,

        side > 0
            ? -1
            : -2.1,

        time,

        growth
    );


    // =================================================
    // SIDE FLOWER LEAVES
    // =================================================

    drawLeaf(
        sideFlowerX -
        side * 8,

        sideFlowerY + 28,

        27 * scale,

        side > 0
            ? -0.8
            : -2.35,

        time,

        growth
    );


    drawLeaf(
        sideFlowerX +
        side * 4,

        sideFlowerY + 18,

        23 * scale,

        side > 0
            ? 0.2
            : 2.9,

        time,

        growth
    );


    drawLeaf(
        x +
        side * W * 0.16,

        H * 0.47,

        25 * scale,

        side > 0
            ? -0.9
            : -2.2,

        time,

        growth
    );


    drawLeaf(
        x -
        side * W * 0.12,

        H * 0.57,

        28 * scale,

        side > 0
            ? 2.7
            : 0.3,

        time,

        growth
    );


    // =================================================
    // BUDS
    // =================================================

    drawBud(
        x +
        side * W * 0.14,

        H * 0.53,

        0.65 * scale,

        time,

        growth
    );


    drawBud(
        x +
        side * W * 0.09,

        H * 0.43,

        0.50 * scale,

        time,

        growth
    );


    drawBud(
        x +
        side * W * 0.04,

        H * 0.49,

        0.42 * scale,

        time,

        growth
    );


    drawBud(
        x +
        side * W * 0.17,

        H * 0.46,

        0.36 * scale,

        time,

        clamp(
            growth * 1.05,
            0,
            1
        )
    );


    drawBud(
        x -
        side * W * 0.12,

        H * 0.56,

        0.32 * scale,

        time,

        clamp(
            growth * 0.95,
            0,
            1
        )
    );


    // =================================================
    // SIDE FLOWER BUD
    // =================================================

    drawBud(
        sideFlowerX,

        sideFlowerY + 27,

        0.38 * scale,

        time,

        clamp(
            growth * 0.90,
            0,
            1
        )
    );


    // =================================================
    // 🌹 MAIN ROSE
    // =================================================

    drawRose(
        x,
        y,
        scale,
        time,
        mainBloom
    );


    drawBloomSparkles(
        x,
        y,
        time,
        mainBloom
    );


    // =================================================
    // 🌹 SECOND ROSE
    // =================================================

    drawRose(
        sideFlowerX,
        sideFlowerY,
        scale * 0.63,
        time,
        sideBloom
    );


    drawBloomSparkles(
        sideFlowerX,
        sideFlowerY,
        time,
        sideBloom
    );
}


// =====================================================
// 🌹 TITLE
// =====================================================

function drawTitle(time) {

    const start =
        300;

    const duration =
        2600;


    const raw =
        clamp(
            (time - start) /
            duration,
            0,
            1
        );


    const reveal =
        smooth(raw);


    const opacity =
        smooth(
            clamp(
                raw * 1.15,
                0,
                1
            )
        );


    const startY =
        H * 0.20;

    const finalY =
        H * 0.125;


    const y =
        startY +
        (
            finalY -
            startY
        ) *
        reveal;


    const fontSize =
        Math.max(
            32,
            Math.min(
                60,
                W * 0.056
            )
        );


    const scale =
        0.88 +
        easeOutBack(
            reveal
        ) *
        0.12;


    ctx.save();


    ctx.translate(
        W / 2,
        y
    );


    ctx.scale(
        scale,
        scale
    );


    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "middle";


    ctx.font =
        `600 ${fontSize}px "Cormorant Garamond", "Times New Roman", serif`;


    // large glow

    ctx.globalAlpha =
        opacity * 0.16;

    ctx.shadowBlur =
        55;

    ctx.shadowColor =
        "rgba(220,235,255,1)";

    ctx.fillStyle =
        "#ffffff";

    ctx.fillText(
        "HAII MEIRSHAA",
        0,
        0
    );


    // second glow

    ctx.globalAlpha =
        opacity * 0.30;

    ctx.shadowBlur =
        27;

    ctx.shadowColor =
        "rgba(255,255,255,1)";

    ctx.fillText(
        "HAII MEIRSHAA",
        0,
        0
    );


    // main text

    ctx.globalAlpha =
        opacity;

    ctx.shadowBlur =
        8;

    ctx.shadowColor =
        "rgba(220,235,255,0.95)";

    ctx.fillStyle =
        "#ffffff";

    ctx.fillText(
        "HAII MEIRSHAA",
        0,
        0
    );


    // highlight

    ctx.globalAlpha =
        opacity * 0.28;

    ctx.shadowBlur =
        0;

    ctx.fillStyle =
        "rgba(255,255,255,0.95)";

    ctx.fillText(
        "HAII MEIRSHAA",
        0,
        -1
    );


    ctx.restore();
}


// =====================================================
// CINEMATIC LIGHT
// =====================================================

function drawCinematicLight(time) {

    const x =
        W * 0.5 +
        Math.sin(
            time * 0.00025
        ) *
        W *
        0.16;


    const y =
        H * 0.48 +
        Math.cos(
            time * 0.0002
        ) *
        H *
        0.08;


    const light =
        ctx.createRadialGradient(
            x,
            y,
            0,
            x,
            y,
            H * 0.45
        );


    light.addColorStop(
        0,
        "rgba(180,210,255,0.035)"
    );

    light.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );


    ctx.fillStyle =
        light;

    ctx.fillRect(
        0,
        0,
        W,
        H
    );
}


// =====================================================
// DEPTH GLOW
// =====================================================

function drawDepthGlow(time) {

    const x =
        W * 0.5 +
        Math.sin(
            time * 0.00035
        ) *
        W * 0.25;

    const y =
        H * 0.68 +
        Math.cos(
            time * 0.00028
        ) *
        H * 0.06;


    const glow =
        ctx.createRadialGradient(
            x,
            y,
            0,
            x,
            y,
            H * 0.35
        );

    glow.addColorStop(
        0,
        "rgba(100,180,120,0.035)"
    );

    glow.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );

    ctx.fillStyle =
        glow;

    ctx.fillRect(
        0,
        0,
        W,
        H
    );
}


// =====================================================
// VIGNETTE
// =====================================================

function drawVignette() {

    const vignette =
        ctx.createRadialGradient(
            W / 2,
            H / 2,
            H * 0.20,
            W / 2,
            H / 2,
            H * 0.82
        );


    vignette.addColorStop(
        0,
        "rgba(0,0,0,0)"
    );

    vignette.addColorStop(
        0.68,
        "rgba(0,0,0,0.08)"
    );

    vignette.addColorStop(
        1,
        "rgba(0,0,0,0.62)"
    );


    ctx.fillStyle =
        vignette;

    ctx.fillRect(
        0,
        0,
        W,
        H
    );
}


// =====================================================
// MAIN ANIMATION
// =====================================================

let sparkleDone = [
    false,
    false,
    false,
    false
];

let animationCompleteDispatched = false;


// =====================================================
// 🌙 STOP / FADE-OUT ANIMASI KEBUN (dipanggil dari hand.js)
// =====================================================

let gardenActive = true;

function stopGardenAnimation() {

    if (!gardenActive) return;

    gardenActive = false;

    canvas.style.transition =
        "opacity 1.2s ease";

    canvas.style.opacity = "0";

    console.log(
        "🌙 Animasi kebun di-fade-out, digantikan kamera"
    );
}

window.stopGardenAnimation =
    stopGardenAnimation;


function animate(now) {

    // Berhenti total begitu kamera mengambil alih tampilan
    if (!gardenActive) return;

    const time =
        now -
        startTime;


    // =================================================
    // BACKGROUND
    // =================================================

    drawBackground(time);

    drawStars(time);

    drawMist(time);

    drawCinematicLight(time);

    drawDepthGlow(time);


    // =================================================
    // TITLE
    // =================================================

    drawTitle(time);


    // =================================================
    // GROUND
    // =================================================

    drawGround(time);


    // =================================================
    // GROWTH
    // =================================================

    const leftGrowth =
        easeOutCubic(
            clamp(
                (time - 650) /
                2600,
                0,
                1
            )
        );


    const rightGrowth =
        easeOutCubic(
            clamp(
                (time - 1200) /
                2600,
                0,
                1
            )
        );


    // =================================================
    // 🌹 4 BLOOM TIMELINES
    // =================================================

    // LEFT MAIN

    const leftMainBloom =
        smooth(
            clamp(
                (time - 1800) /
                4300,
                0,
                1
            )
        );


    // LEFT SIDE

    const leftSideBloom =
        smooth(
            clamp(
                (time - 3000) /
                4300,
                0,
                1
            )
        );


    // RIGHT MAIN

    const rightMainBloom =
        smooth(
            clamp(
                (time - 2600) /
                4300,
                0,
                1
            )
        );


    // RIGHT SIDE

    const rightSideBloom =
        smooth(
            clamp(
                (time - 3900) /
                4300,
                0,
                1
            )
        );


    // =================================================
    // LEFT PLANT
    // =================================================

    const leftX =
        W * 0.38;

    const leftY =
        H * 0.47;


    drawPlant(
        leftX,
        leftY,
        1.05,
        leftGrowth,
        leftMainBloom,
        leftSideBloom,
        -1,
        time
    );


    // =================================================
    // RIGHT PLANT
    // =================================================

    const rightX =
        W * 0.62;

    const rightY =
        H * 0.49;


    drawPlant(
        rightX,
        rightY,
        0.90,
        rightGrowth,
        rightMainBloom,
        rightSideBloom,
        1,
        time
    );


    // =================================================
    // 🌹 SIDE FLOWER POSITIONS
    // =================================================

    const leftSideX =
        leftX -
        W * 0.135;

    const leftSideY =
        H * 0.585;


    const rightSideX =
        rightX +
        W * 0.135;

    const rightSideY =
        H * 0.585;


    // =================================================
    // ✨ ALL 4 FLOWERS
    // =================================================

    const flowers = [

        {
            x:
                leftX,

            y:
                leftY,

            bloom:
                leftMainBloom,

            offset:
                0
        },

        {
            x:
                leftSideX,

            y:
                leftSideY,

            bloom:
                leftSideBloom,

            offset:
                1.5
        },

        {
            x:
                rightX,

            y:
                rightY,

            bloom:
                rightMainBloom,

            offset:
                3.2
        },

        {
            x:
                rightSideX,

            y:
                rightSideY,

            bloom:
                rightSideBloom,

            offset:
                4.8
        }
    ];


    // =================================================
    // MAGIC PARTICLES
    // =================================================

    drawMagicParticles(
        time,
        flowers
    );


    // =================================================
    // FLOWER PETALS
    // =================================================

    drawFlowerPetals(
        time,
        leftX,
        leftY,
        leftMainBloom,
        0
    );


    drawFlowerPetals(
        time,
        leftSideX,
        leftSideY,
        leftSideBloom,
        1.4
    );


    drawFlowerPetals(
        time,
        rightX,
        rightY,
        rightMainBloom,
        3.2
    );


    drawFlowerPetals(
        time,
        rightSideX,
        rightSideY,
        rightSideBloom,
        4.8
    );


    // =================================================
    // 💥 BLOOM BURSTS
    // =================================================

    if (
        leftMainBloom > 0.65 &&
        !sparkleDone[0]
    ) {

        createBloomParticles(
            leftX,
            leftY
        );

        sparkleDone[0] =
            true;
    }


    if (
        leftSideBloom > 0.65 &&
        !sparkleDone[1]
    ) {

        createBloomParticles(
            leftSideX,
            leftSideY
        );

        sparkleDone[1] =
            true;
    }


    if (
        rightMainBloom > 0.65 &&
        !sparkleDone[2]
    ) {

        createBloomParticles(
            rightX,
            rightY
        );

        sparkleDone[2] =
            true;
    }


    if (
        rightSideBloom > 0.65 &&
        !sparkleDone[3]
    ) {

        createBloomParticles(
            rightSideX,
            rightSideY
        );

        sparkleDone[3] =
            true;
    }


    drawBloomParticles();


    // =================================================
    // 🎬 ANIMASI SELESAI → KIRIM SINYAL
    // =================================================

    if (
        !animationCompleteDispatched &&
        leftMainBloom >= 1 &&
        leftSideBloom >= 1 &&
        rightMainBloom >= 1 &&
        rightSideBloom >= 1
    ) {

        animationCompleteDispatched = true;

        window.dispatchEvent(
            new CustomEvent("gardenAnimationComplete")
        );

        console.log(
            "🌹 Semua bunga mekar → animasi selesai"
        );
    }


    // =================================================
    // ATMOSPHERE
    // =================================================

    drawDust(time);

    drawPetals(time);

    drawFireflies(time);

    drawButterflies(time);


    // =================================================
    // FOREGROUND
    // =================================================

    drawForegroundLeaves(time);


    // =================================================
    // VIGNETTE
    // =================================================

    drawVignette();


    requestAnimationFrame(
        animate
    );
}


// =====================================================
// START
// =====================================================

resize();


// =====================================================
// WAIT FOR FONT
// =====================================================

if (
    document.fonts &&
    document.fonts.ready
) {

    document.fonts.ready.then(() => {

        requestAnimationFrame(
            animate
        );

    });

} else {

    requestAnimationFrame(
        animate
    );
}
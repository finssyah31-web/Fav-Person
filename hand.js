// =====================================================
// ✋ HAND.JS
// MEDIA PIPE HAND TRACKING
// TIDAK MENGUBAH GARDEN V8.6
// =====================================================

const MEDIAPIPE_URL =
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/+esm";

const WASM_URL =
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm";

const MODEL_URL =
    "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task";


let handLandmarker = null;
let video = null;
let cameraStream = null;

let handTrackingStarted = false;


// =====================================================
// MULAI HAND TRACKING
// =====================================================

async function startHandTracking() {

    if (handTrackingStarted) return;

    handTrackingStarted = true;

    console.log("✋ Memulai Hand Tracking...");


    try {

        // =================================================
        // LOAD MEDIAPIPE
        // =================================================

        const {
            FilesetResolver,
            HandLandmarker
        } = await import(MEDIAPIPE_URL);


        console.log("📦 MediaPipe berhasil dimuat");


        // =================================================
        // LOAD WASM
        // =================================================

        const vision =
            await FilesetResolver.forVisionTasks(
                WASM_URL
            );


        console.log("⚙️ Vision berhasil dimuat");


        // =================================================
        // LOAD MODEL
        // =================================================

        handLandmarker =
            await HandLandmarker.createFromOptions(
                vision,
                {

                    baseOptions: {
                        modelAssetPath: MODEL_URL
                    },

                    runningMode: "VIDEO",

                    numHands: 1,

                    minHandDetectionConfidence: 0.6,

                    minHandPresenceConfidence: 0.6,

                    minTrackingConfidence: 0.6

                }
            );


        console.log("🖐️ Hand Landmarker siap");


        // =================================================
        // BUAT VIDEO TERSEMBUNYI
        // =================================================

        video =
            document.createElement("video");


        video.autoplay = true;
        video.playsInline = true;
        video.muted = true;


        video.style.position = "fixed";
        video.style.left = "-10000px";
        video.style.top = "-10000px";

        video.style.width = "1px";
        video.style.height = "1px";

        video.style.opacity = "0";

        video.style.pointerEvents = "none";


        document.body.appendChild(video);


        // =================================================
        // AKTIFKAN KAMERA
        // =================================================

        cameraStream =
            await navigator.mediaDevices.getUserMedia({

                video: {

                    width: {
                        ideal: 1280
                    },

                    height: {
                        ideal: 720
                    },

                    facingMode: "user"

                },

                audio: false

            });


        video.srcObject = cameraStream;


        await video.play();


        console.log("📷 Kamera aktif");

        console.log("✋ Hand Tracking aktif");


        // =================================================
        // GANTI TAMPILAN: KEBUN FADE OUT → PARTIKEL TAMPIL
        // =================================================

        if (window.stopGardenAnimation) {

            window.stopGardenAnimation();

        }

        if (window.showParticleScene) {

            window.showParticleScene();

        }


        // =================================================
        // MULAI DETEKSI
        // =================================================

        detectHands();


    } catch (error) {

        console.error(
            "❌ Hand Tracking Error:",
            error
        );

        alert(
            "Hand tracking gagal jalan: " +
            error.message +
            "\n\nCek: (1) izin kamera browser, (2) dibuka lewat server (http://localhost atau https), bukan file:// langsung."
        );

        handTrackingStarted = false;

    }

}


// =====================================================
// DETEKSI TANGAN
// =====================================================

let lastVideoTime = -1;

function detectHands() {

    if (
        !video ||
        !handLandmarker
    ) {

        requestAnimationFrame(
            detectHands
        );

        return;
    }


    // Cuma deteksi kalau frame video-nya BENERAN baru.
    // Tanpa ini, MediaPipe bisa "macet diam" setelah 1 deteksi
    // karena diminta memproses frame yang sama berulang kali.
    if (
        video.readyState >= 2 &&
        video.currentTime !== lastVideoTime
    ) {

        lastVideoTime = video.currentTime;

        try {

            const result =
                handLandmarker.detectForVideo(
                    video,
                    performance.now()
                );


            if (
                result.landmarks &&
                result.landmarks.length > 0
            ) {

                const landmarks =
                    result.landmarks[0];


                // Hitung jumlah jari
                const fingers =
                    countFingers(
                        landmarks
                    );


                // Kirim gesture
                window.dispatchEvent(

                    new CustomEvent(
                        "handGesture",

                        {
                            detail: {

                                fingers: fingers,

                                landmarks: landmarks

                            }
                        }
                    )

                );

            }

        } catch (error) {

            console.error(
                "Detection error:",
                error
            );

        }

    }


    requestAnimationFrame(
        detectHands
    );

}


// =====================================================
// HITUNG JARI
// =====================================================

function countFingers(
    landmarks
) {

    let count = 0;


    // JEMPOL (dihitung pakai jarak, bukan posisi y,
    // karena jempol bergerak menyamping bukan ke atas)
    const thumbTipDist =
        Math.hypot(
            landmarks[4].x - landmarks[17].x,
            landmarks[4].y - landmarks[17].y
        );

    const thumbBaseDist =
        Math.hypot(
            landmarks[3].x - landmarks[17].x,
            landmarks[3].y - landmarks[17].y
        );

    if (thumbTipDist > thumbBaseDist * 1.05) {

        count++;

    }


    // TELUNJUK
    if (
        landmarks[8].y <
        landmarks[6].y
    ) {

        count++;

    }


    // JARI TENGAH
    if (
        landmarks[12].y <
        landmarks[10].y
    ) {

        count++;

    }


    // JARI MANIS
    if (
        landmarks[16].y <
        landmarks[14].y
    ) {

        count++;

    }


    // KELINGKING
    if (
        landmarks[20].y <
        landmarks[18].y
    ) {

        count++;

    }


    return count;

}


// =====================================================
// GESTURE
// =====================================================

let lastFingers = -1;

window.addEventListener(
    "handGesture",

    function (event) {

        const fingers =
            event.detail.fingers;

        // Cegah hitung ulang tiap frame kalau gesture-nya sama
        if (fingers === lastFingers) return;

        lastFingers = fingers;


        if (fingers === 0) {

            // 👊 GENGGAM → teks semangat (dari partikel)
            console.log("💪 GESTURE: SEMANGAT");

            if (window.setParticleShape) {
                window.setParticleShape("text", "semangat yaa, kerjain tugasnya");
            }

        }

        else if (fingers === 1) {

            // ☝️ 1 JARI → bentuk hati
            console.log("❤️ GESTURE: HATI");

            if (window.setParticleShape) {
                window.setParticleShape("heart");
            }

        }

        else if (fingers === 2) {

            // ✌️ 2 JARI → bentuk bintang
            console.log("⭐ GESTURE: BINTANG");

            if (window.setParticleShape) {
                window.setParticleShape("star");
            }

        }

        else if (fingers === 3) {

            // 🤟 3 JARI → teks sayang (dari partikel)
            console.log("💖 GESTURE: AKU SAYANG MEIRSHA");

            if (window.setParticleShape) {
                window.setParticleShape("text", "aku sayang meirsha");
            }

        }

        else if (fingers === 4) {

            // 🖐️ 4 JARI → bentuk Saturnus
            console.log("🪐 GESTURE: SATURNUS");

            if (window.setParticleShape) {
                window.setParticleShape("saturn");
            }

        }

        else if (fingers === 5) {

            // 🖐️✋ 5 JARI (telapak terbuka) → teks semoga lekas sembuh (dari partikel)
            console.log("🌸 GESTURE: SEMOGA LEKAS SEMBUH");

            if (window.setParticleShape) {
                window.setParticleShape("text", "semoga lekas sembuh yaa meirsha");
            }

        }

    }
);


// =====================================================
// JALANKAN SETELAH GARDEN SELESAI
// =====================================================

window.addEventListener(
    "gardenAnimationComplete",

    function () {

        console.log(
            "🌹 Garden selesai → ✋ Hand Tracking dimulai"
        );

        startHandTracking();

    }
);
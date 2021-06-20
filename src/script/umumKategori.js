const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "apa itu pajak?",
    choice1: "iuran wajib yang harus dibayar oleh rakyat kepada negara",
    choice2: "iuran wajib yang hanya dibayar oleh orang kaya kepada negara",
    choice3: "iuran wajib yang harus dibayar oleh rakyat kepada presiden",
    choice4: "iuran wajib yang harus dibayar kepada suatu organisasi",
    answer: 1,
  },
  {
    question:
      "Pajak merupakan iuran wajib yang dibayar oleh rakyat, manakah dibawah ini yang bukan merupakan pajak yang dibayar secara langsung oleh rakyat?",
    choice1: "PPN (Pajak pertambahan nilai)",
    choice2: "PPh (Pajak Penghasilan)",
    choice3: "PKB (Pajak Kendaraan Bermotor)",
    choice4: "PBB (Pajak Bumi dan Bangunan)",
    answer: 1,
  },
  {
    question: "Dimanakah kamu dapat menerima informasi tentang perpajakan?",
    choice1: "sosial media dirjen pajak",
    choice2: "sosial media selebgram",
    choice3: "toko kelontong",
    choice4: "warung bi eem",
    answer: 1,
  },
  {
    question: " dibawah ini, manakah yang merupakan pajak langsung?",
    choice1: "Pajak Pertambahan nilai & Pajak Kendaraan",
    choice2: "Pajak Bumi dan bangunan & Pajak Penjualan barang mewah",
    choice3: "Pajak Penghasilan & Pajak Kendaraan Bermotor",
    choice4: "Pajak Bea masuk & Pajak Penghasilan",
    answer: 3,
  },
  {
    question:
      "Manakah dibawah ini yang bukan merupakan besaran persentase tarif pajak?",
    choice1: "5% untuk penghasilan 0 s/d 50 juta",
    choice2: "30% untuk penghasilan > 500 juta",
    choice3: "15 % untuk penghasilan >50 juta s/d 250 juta",
    choice4: "50% untuk penghasilan < 50 juta",
    answer: 4,
  },
  {
    question: "Berdasarkan sifatnya, jenis pajak dibagi menjadi 2 yaitu ?",
    choice1: "Objektif dan substitusi",
    choice2: "Subjektif dan Objektif",
    choice3: "Subjektif dan Substitusi",
    choice4: "Komplementer dan Substitusi",
    answer: 2,
  },
  {
    question:
      "seseorang maupun badan organisasi yang berkewajiban untuk membayar pajak disebut ?",
    choice1: "berhak pajak",
    choice2: "Wajib Pajak",
    choice3: "Wajib hukum",
    choice4: "Sah pajak",
    answer: 2,
  },
  {
    question: "ada 4 fungsi pajak secara umum, kecuali...",
    choice1: "Fungsi mengatur",
    choice2: "Fungsi Pengorganisasian",
    choice3: "Fungsi Alokasi",
    choice4: "Fungsi Budgeting",
    answer: 2,
  },
  {
    question:
      " fungsi pajak yaitu budgeting atau anggaran, pada dasarnya digunakan untuk pembangunan negara. berikut yang termasuk pembangunan negara seperti ?",
    choice1: "pembangunan fasilitas pribadi",
    choice2: "pembangunan rumah mewah untuk pejabat",
    choice3: "pembangunan fasilitas publik",
    choice4: "pembangunan fasilitas apa adanya",
    answer: 2,
  },
  {
    question:
      "Sejak kapan sistem pemungutan pajak berupa pembayaran upeti diterapkan di Indonesia ?",
    choice1: "Zaman Neolitikum",
    choice2: "Zaman Penjajahan Jepang",
    choice3: "setelah kemerdekaan",
    choice4: "Zaman Kerajaan",
    answer: 4,
  },
  {
    question: "NPWP adalah singkatan dari..",
    choice1: "nomor pajak wajib pembayar",
    choice2: "nomor pembayar wajib pajak",
    choice3: "nomor pokok wajib pajak",
    choice4: "nomor pajak wajib pokok",
    answer: 3,
  },
  {
    question:
      "Apa sanksi yang diberikan apabila masyarakat tidak membayar Pajak SPT Tahunan?",
    choice1: "tidak mendapat hukuman apapun",
    choice2: "dipenjarakan selama satu hari",
    choice3:
      "diberikan sanksi berupa bunga 2% perbulan dari pajak yang terlambat disetorkan dan terparahnya dipenjarakan minimal selama 6 bulan",
    choice4: "dibebaskan",
    answer: 3,
  },
  {
    question: " Pengelolaan dana pajak di Indonesia dilakukan oleh..",
    choice1: "pemerintah pusat saja",
    choice2: "pemerintah daerah saja",
    choice3: "pemerintah pusat dan daerah",
    choice4: "pemerintahan",
    answer: 3,
  },
  {
    question: "yang termasuk kedalam janis pajak provinsi adalah..",
    choice1: "pajak hotel",
    choice2: "Pajak Bahan Bakar Kendaraan Bermotor",
    choice3: "Pajak HIburan",
    choice4: "Pajak Reklame",
    answer: 2,
  },
  {
    question: "UU No. 28 tahun 2007 berisi tentang ?",
    choice1: "Ketentuan umum dan tata cara perpajakan",
    choice2: "Pengalokasian pajak kepada pemerintah",
    choice3: "Fungsi Alokasi",
    choice4: "Fungsi Budgeting",
    answer: 1,
  },
];

const SCORE_POINTS = 6.67;
const MAX_QUESTIONS = 15;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 100);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();

// end js

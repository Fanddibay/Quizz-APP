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
    question: "Dibawah ini manakah yang termasuk pajak tidak langsung?",
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
      "Pajak memiliki beberapa unsur pembentuknya. dimanakah dibawah ini yang merupakan unsur pembentuk pajak ?",
    choice1: "Pajak tidak memiliki unsur paksaan dalam pemungutannya",
    choice2:
      "Imbal balik dari pemungutan pajak akan dirasakan untuk golongan tertentu",
    choice3: "Berlaku untuk seluruh masyarakat tanpa terkecuali",
    choice4: "Iuran dengan imbalan yang langsung dari negara",
    answer: 3,
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
    answer: 3,
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
    question: "Dibawah ini manakah manfaat dari adanya pajak ?",
    choice1: "membiayai proyek pembangunan yang tidak jelas",
    choice2:
      "tersedianya fasilitas private yang tidak dapat diakses oleh publik",
    choice3: "Tersedianya fasilitas umum dan infrastruktur yang memadai",
    choice4: "mengurangi jumlah fasilitas umum",
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
    question:
      "Berdasarkan lembaga pemungutnya, pajak dibagi menjadi 2 jenis. yaitu ?",
    choice1: "Redistribusi dan Bea Cukai",
    choice2: "Pajak Pusat dan Pajak Daerah",
    choice3: "Pajak pribadi dan pajak daerah",
    choice4: "Redistribusi dan Pajak Pusat",
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

function setStatusClass(element, answer) {
  if (answer) {
    element.classList.add("correct");
  } else {
    element.classList.add("incorrect");
  }
}

const SCORE_POINTS = 10;
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

    return window.location.assign("endUmum.html");
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
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();

// end js

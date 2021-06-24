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
    question:
      "Dibawah ini barang-barang yang dapat dikenakan pajak barang mewah ialah?",
    choice1: "Jaket harga Rp 30.000 ",
    choice2: "Beras",
    choice3: "Mobil Spor",
    choice4: "Topi sekolah",
    answer: 3,
  },
  {
    question:
      "setiap kamu belanja di toko swalayan favoritmu, di bawah sebelum jumlah total biaya pembelian ada sebuah pajak yang dikenakan sebesar 10% dari total belanja. Pajak apakah itu?",
    choice1: "Pajak langsung",
    choice2: "Pajak penghasilan",
    choice3: "Pajak Hotel",
    choice4: "Pajak Pertambahan Nilai",
    answer: 4,
  },
  {
    question:
      "pajak yang ditanggung oleh orang pribadi atau badan yang mendapatkan keuntungan dan/atau kedudukan sosial ekonomi yang lebih baik karena hak atas tanah dan bangunannya merupakan pengertian dari pajak?",
    choice1: "Pajak Badan",
    choice2: "Pajak Bumi dan Bangunan (PBB)",
    choice3: "Pajak Penambahan Nilai (PPN)",
    choice4: "Pajak Penghasilan (PPH)",
    answer: 2,
  },
  {
    question:
      "Berikut ini adalah beberapa faktor yang menentukan Dasar Penetapan NJOP Bangunan, kecuali",
    choice1: "Bahan yang digunakan dalam bangunan",
    choice2: "pemanfaatan",
    choice3: "Letak",
    choice4: "Kondisi Lingkungan",
    answer: 2,
  },
  {
    question: "Berapakah tarif pajak bumi dan bangunan?",
    choice1: "0,5%",
    choice2: "5%",
    choice3: "10%",
    choice4: "15%",
    answer: 1,
  },
  {
    question:
      "Berdasarkan Keputusan Menteri Keuangan Nomor 201/KMK.04/2000 ditetapkan, NJOPTKP untuk setiap daerah di kabupaten/kota setinggi-tingginya senilai.",
    choice1: "20.000.000",
    choice2: "12.000.000",
    choice3: "10.000.000",
    choice4: "15.000.000",
    answer: 2,
  },
  {
    question:
      " kamu merupakan seorang pegawai tetap yang bekerja di suatu perusahaan dan memiliki gaji atau upah, maka dari gaji atau upah kamu tersebut dikenakan pajak, apa nama pajak yang kamu bayar?",
    choice1: "Pajak Penghasilan Pasal 21",
    choice2: "Pajak Penghasilan Pasal 15",
    choice3: "Pajak Penghasilan Pasal 22",
    choice4: "Pajak Penghasilan Pasal 19",
    answer: 1,
  },
  {
    question: "Tarif pengenaan pajak penghasilan bersifat..",
    choice1: "Tetap/regresif (a fixed tax rate)",
    choice2: "Degresif (a degressive tax rate).",
    choice3: "Proporsional (a proportional tax rate).",
    choice4: "Progresif (a progressive tax rate).",
    answer: 4,
  },
  {
    question:
      "Berapa besarnya tarif pajak yang berlaku jika penghasilan tahunan sebesar Rp.50.000.000?",
    choice1: "20%",
    choice2: "15%",
    choice3: "5%",
    choice4: "10%",
    answer: 3,
  },
  {
    question:
      "Dibawah ini yang termasuk objek Pajak Penghasilan (PPh) ialah, kecuali...",
    choice1: "Dividen",
    choice2: "Laba Usaha",
    choice3: "Gaji Upah",
    choice4: "Warisan",
    answer: 4,
  },
  {
    question: "Dibawah ini yang termasuk objek pajak pajak, kecuali..",
    choice1: "Kendaraan Bermotor",
    choice2: "Rumah Mewah",
    choice3: "Gerobak",
    choice4: "Sebidang Tanah",
    answer: 3,
  },
  {
    question:
      "Pajak yang dikenakan apabila kamu membeli makanan di sebuah restoran disebut sebagai pajak?",
    choice1: "Pajak Restoran",
    choice2: "Pajak Pertambahan Nilai",
    choice3: "Pajak Penjualan Atas Barang Mewah",
    choice4: "Pajak Reklame",
    answer: 1,
  },
  {
    question: "Dibawah ini yang dibayarkan langsung oleh wajib pajak adalah",
    choice1: "Pajak KTP",
    choice2: "Pajak Ekspor",
    choice3: "Pajak Kendaraan Bermotor",
    choice4: "Bea Masuk",
    answer: 3,
  },
  {
    question:
      "Seorang influencer yang dibawah naungan agensi akan dikenakan pajak untuk penghasilannya. pajak apakah itu ?",
    choice1: "PPh 23",
    choice2: "PPh 21",
    choice3: "PPh 25",
    choice4: "PPh 29",
    answer: 1,
  },
  {
    question:
      "Berikut ini yang termasuk pajak yang dikelola oleh pemerintah pusat adalah",
    choice1: "Pajak Hotel",
    choice2: "Pajak Restoran",
    choice3: "Pajak Hiburan",
    choice4: "Pajak Penjualan atas Barang Mewah",
    answer: 4,
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

    return window.location.assign("endKategori.html");
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

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
      "Apabila kamu berbelanja di warung kelontongan, berapa besaran pajak PPN yang kamu bayar?",
    choice1: "10%",
    choice2: "0%",
    choice3: "5%",
    choice4: "0,2%",
    answer: 2,
  },
  {
    question:
      "Jika kamu memenangkan sebuah hadiah dari organisasi yang menyelenggarakan undian, dengan nilai hadiah sebesar Rp 10.000.000. Berapa pajak hadiah yang harus kamu bayarkan ? …(pajak hadiah = 25% dari nilai barang)",
    choice1: "2.500.000",
    choice2: "8.000.000",
    choice3: "7.500.000",
    choice4: "1.500.000",
    answer: 1,
  },
  {
    question:
      "Roni membeli sebuah Laptop seharga Rp 4.000.000. Bila PPN yang dikenakan sebesar 10% dari nilai barang. berapakah jumlah yang harus dibayar oleh Roni?",
    choice1: "4.040.000",
    choice2: "4.200.000",
    choice3: "4.400.000",
    choice4: "4.000.000",
    answer: 3,
  },
  {
    question:
      "Pajak Sarang Burung Walet merupakan jenis dari pajak daerah. siapakah yang akan mengelola dana tersebut?",
    choice1: "Pemerintah Provinsi",
    choice2: "Pemerintah Pusat",
    choice3: "Dirjen Pajak",
    choice4: "Pemerintah Kabupaten/Kota",
    answer: 4,
  },
  {
    question:
      " Dibawah ini, manakah yang merupakan manfaat dari pemungutan pajak?",
    choice1: "Dini dapat bersekolah karena kemampuannya",
    choice2:
      "Dini dapat bersekolah karena telah dibangun fasilitas pendidikan diderahnya",
    choice3: "Dini dapat bersekolah karena orang tuanya mencari pinjaman",
    choice4: "Dini dapat bersekolah karena memiliki cita-cita yang tinggi",
    answer: 2,
  },
  {
    question:
      "Endorsement merupakan salah satu penghasilan yang sedang marak saat ini. Apabila yang menerima penghasilan dalam endorse ini adalah seorang yang berada dalam naungan agensi dan dana endorse itu dikelola oleh pihak ketiga. maka, penghasilan tersebut akan dikategorikan ke dalam PPh pasal berapa?",
    choice1: "PPh pasal 23",
    choice2: "PPh pasal 21",
    choice3: "PPh pasal 26",
    choice4: "PPh pasal 29",
    answer: 1,
  },
  {
    question: "NJOPTKP adalah singkatan dari..",
    choice1: "Nilai Jual Objek Pajak Tidak Kena Pajak",
    choice2: "Nilai Jual Objek Pajak Tidak Kurang Pajak",
    choice3: "Nilai Jual Pajak Kena Pajak",
    choice4: "Nilai Jual Objek Pasar Tidak Kena Pajak",
    answer: 1,
  },
  {
    question: "what is 2 + 2",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "4",
    answer: 2,
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

    return window.location.assign("endLogika.html");
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

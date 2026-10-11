const questions = [
  {
    subject: "MATEMATIKA",
    question: "Berapakah hasil dari 8 × 7?",
    answers: ["54", "56", "48", "64"],
    correct: 1,
    explanation: "8 × 7 = 56. Hoshi bangga padamu!"
  },
  {
    subject: "IPA",
    question: "Planet yang kita tinggali adalah ...",
    answers: ["Mars", "Venus", "Bumi", "Jupiter"],
    correct: 2,
    explanation: "Betul! Kita tinggal di planet Bumi."
  },
  {
    subject: "BAHASA INDONESIA",
    question: "Kata yang memiliki arti sama dengan 'gembira' adalah ...",
    answers: ["Sedih", "Senang", "Marah", "Lelah"],
    correct: 1,
    explanation: "'Senang' memiliki arti yang sama atau mirip dengan 'gembira'."
  },
  {
    subject: "IPA",
    question: "Bagian tumbuhan yang biasanya menyerap air dari tanah adalah ...",
    answers: ["Bunga", "Daun", "Batang", "Akar"],
    correct: 3,
    explanation: "Akar menyerap air dan mineral dari tanah."
  },
  {
    subject: "MATEMATIKA",
    question: "Jika kamu punya 15 koin lalu mendapat 5 lagi, berapa jumlahnya?",
    answers: ["10", "15", "20", "25"],
    correct: 2,
    explanation: "15 + 5 = 20 koin. Quest selesai!"
  }
];

let current = 0;
let coins = 0;
let answered = false;
const coinCount = document.getElementById("coin-count");
const title = document.getElementById("question-title");
const questionText = document.getElementById("question-text");
const answersBox = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const progressText = document.getElementById("progress-text");
const progressBar = document.getElementById("progress-bar");

function renderQuestion() {
  answered = false;
  const q = questions[current];
  title.textContent = `Pertanyaan ${current + 1} · ${q.subject}`;
  questionText.textContent = q.question;
  answersBox.replaceChildren();
  feedback.className = "feedback";
  feedback.textContent = "Pilih jawabanmu untuk mendapatkan koin!";
  nextButton.disabled = true;
  nextButton.textContent = current === questions.length - 1 ? "Lihat hasil →" : "Berikutnya →";
  progressText.textContent = `${current} / ${questions.length}`;
  progressBar.style.width = `${(current / questions.length) * 100}%`;

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.textContent = `${String.fromCharCode(65 + index)}. ${answer}`;
    button.addEventListener("click", () => chooseAnswer(index, button));
    answersBox.appendChild(button);
  });
}

function chooseAnswer(index, selectedButton) {
  if (answered) return;
  answered = true;
  const q = questions[current];
  const buttons = [...answersBox.querySelectorAll("button")];
  buttons.forEach((button, i) => {
    button.disabled = true;
    if (i === q.correct) button.classList.add("correct");
  });

  if (index === q.correct) {
    coins += 10;
    coinCount.textContent = coins;
    feedback.className = "feedback good";
    feedback.textContent = `✨ Benar! +10 koin. ${q.explanation}`;
  } else {
    selectedButton.classList.add("wrong");
    feedback.className = "feedback bad";
    feedback.textContent = `Belum tepat, jangan menyerah ya! ${q.explanation}`;
  }

  progressText.textContent = `${current + 1} / ${questions.length}`;
  progressBar.style.width = `${((current + 1) / questions.length) * 100}%`;
  nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {
  if (!answered) return;
  if (current < questions.length - 1) {
    current++;
    renderQuestion();
    return;
  }

  title.textContent = "Quest selesai! ✨";
  questionText.textContent = `Kamu menyelesaikan ${questions.length} pertanyaan dan mengumpulkan ${coins} koin!`;
  answersBox.replaceChildren();
  feedback.className = "feedback good";
  feedback.textContent = "Terima kasih sudah belajar bersama Hoshi. Mau mencoba lagi?";
  nextButton.disabled = false;
  nextButton.textContent = "Main lagi ↻";
  nextButton.onclick = () => {
    current = 0;
    coins = 0;
    coinCount.textContent = coins;
    nextButton.onclick = null;
    renderQuestion();
  };
});

renderQuestion();

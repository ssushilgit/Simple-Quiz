
const questions = [
    {
        question: "Which is the highest peak in the world?",
        answers: [
            { text: "Mt. Everest", correct: true },
            { text: "Mt. Dhaulagiri", correct: false },
            { text: "Naga Parbat", correct: false },
            { text: "Mt. K2", correct: false },
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Saturn", correct: false },
        ]
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        answers: [
            { text: "Charles Dickens", correct: false },
            { text: "William Shakespeare", correct: true },
            { text: "Jane Austen", correct: false },
            { text: "Mark Twain", correct: false },
        ]
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        answers: [
            { text: "Gold", correct: false },
            { text: "Silver", correct: false },
            { text: "Iron", correct: false },
            { text: "Oxygen", correct: true },
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Rome", correct: false },
            { text: "Paris", correct: true },
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
        ]
    },
    {
        question: "Which ocean is the largest by area?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
        ]
    },
    {
        question: "Who was the first President of the United States?",
        answers: [
            { text: "Thomas Jefferson", correct: false },
            { text: "Abraham Lincoln", correct: false },
            { text: "George Washington", correct: true },
            { text: "John Adams", correct: false },
        ]
    },
    {
        question: "Which gas do plants primarily use for photosynthesis?",
        answers: [
            { text: "Carbon dioxide", correct: true },
            { text: "Oxygen", correct: false },
            { text: "Nitrogen", correct: false },
            { text: "Hydrogen", correct: false },
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1 ;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"; 
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again!";
    nextButton.style.display = "block";

}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});


startQuiz();
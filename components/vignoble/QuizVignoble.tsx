"use client";

import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

interface QuizVignobleProps {
  questions: QuizQuestion[];
  title?: string;
  footerText?: string;
}

export function QuizVignoble({
  questions,
  title = "Quiz Terroir de Gaillac",
  footerText = "Participez au tirage au sort mensuel ! Pour être éligible, partagez votre résultat sur vos réseaux sociaux avec le hashtag #GaillacQuiz. Seuls les participants ayant partagé seront retenus.",
}: QuizVignobleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    if (selectedAnswer === questions[currentQuestion].correctIndex) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResults(false);
  };

  const progress = ((currentQuestion + (showResults ? 1 : 0)) / questions.length) * 100;

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          className="inline-flex items-center justify-center min-h-[44px] px-8 py-4 bg-slate-100 hover:bg-slate-200 border border-slate-300 hover:border-slate-400 text-slate-900 font-medium text-lg tracking-wide transition-all duration-300 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          aria-label="Ouvrir le quiz sur le terroir de Gaillac"
        >
          Tester mes connaissances
        </button>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        {/* Overlay clair (pas sombre) */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        
        <DialogPrimitive.Content className="fixed top-[50%] left-[50%] z-50 grid w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] max-w-lg max-h-[90vh] overflow-y-auto translate-x-[-50%] translate-y-[-50%] gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:p-5 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <DialogPrimitive.Title className="text-base sm:text-lg font-serif text-slate-900 text-center pb-1 sm:pb-2 leading-tight">
            {title}
          </DialogPrimitive.Title>
          
          <DialogPrimitive.Close className="absolute top-3 right-3 sm:top-4 sm:right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none">
            <XIcon className="h-5 w-5 sm:h-4 sm:w-4" />
            <span className="sr-only">Fermer</span>
          </DialogPrimitive.Close>

        {/* Barre de progression */}
        <div className="w-full h-1.5 bg-slate-200 rounded-full mb-3">
          <div
            className="h-full bg-slate-400 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Contenu du quiz */}
        <div className="space-y-3">
          {!showResults ? (
            <>
              <div className="question">
                <h3 className="text-sm sm:text-base font-medium text-slate-900 mb-3 leading-snug">
                  {questions[currentQuestion].question}
                </h3>
              </div>

              <ul className="space-y-1.5">
                {questions[currentQuestion].options.map((option, index) => (
                  <li key={index}>
                    <label
                      className={cn(
                        "block cursor-pointer px-3 py-2 rounded-lg border-2 transition-all duration-200 text-xs sm:text-sm leading-tight",
                        selectedAnswer === index
                          ? "bg-slate-200 border-slate-400 text-slate-900"
                          : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400"
                      )}
                    >
                      <input
                        type="radio"
                        name="answer"
                        value={index}
                        checked={selectedAnswer === index}
                        onChange={() => handleAnswerSelect(index)}
                        className="sr-only"
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNext}
                  disabled={selectedAnswer === null}
                  className={cn(
                    "px-4 sm:px-5 py-2 rounded-lg font-medium transition-all duration-200 text-xs sm:text-sm text-white",
                    selectedAnswer === null
                      ? "bg-slate-300 cursor-not-allowed"
                      : "bg-slate-700 hover:bg-slate-800 hover:shadow-md"
                  )}
                >
                  {currentQuestion < questions.length - 1 ? "Suivant" : "Voir les résultats"}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center space-y-3 py-4">
              <h3 className="text-xl sm:text-2xl font-serif text-slate-900">
                Résultat : {score} / {questions.length}
              </h3>
              <p className="text-sm sm:text-base text-slate-700">
                {score === questions.length
                  ? "Bravo, vous êtes un expert du terroir de Gaillac !"
                  : "Merci pour votre participation !"}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 px-2 leading-relaxed">
                Partagez votre score avec le hashtag <strong>#GaillacQuiz</strong> sur vos réseaux sociaux pour participer au tirage au sort mensuel !
              </p>
              <button
                onClick={() => {
                  handleReset();
                  setIsOpen(false);
                }}
                className="px-5 sm:px-6 py-2 sm:py-3 bg-slate-100 hover:bg-slate-200 border border-slate-300 hover:border-slate-400 text-slate-900 font-medium text-sm sm:text-base tracking-wide transition-all duration-300 rounded-full"
              >
                Rejouer le quiz
              </button>
            </div>
          )}
        </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-slate-200">
            <p className="text-[10px] sm:text-xs text-slate-600 text-center leading-tight px-2">
              {footerText}
            </p>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

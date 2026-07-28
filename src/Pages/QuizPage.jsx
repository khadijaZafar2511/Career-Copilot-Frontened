import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useGetQuiz } from "../Features/Quiz/quiz.query"
import { useSubmitQuiz } from "../Features/Quiz/quiz.mutation"
import { useParams, useLocation } from "react-router-dom";
import QuizResultModal from "../components/custom-components/QuizPopup"
export default function QuizPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const location = useLocation();
  const quizdata = location.state;
 
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  // Dummy data (replace with API response)
  // console.log(answers)
  const { id } = useParams();
  const {  data: quiz, isLoading } = useGetQuiz(id);
  const {mutate,data:submittedQuiz, isLoading:isSubmitting}= useSubmitQuiz()

  if (isLoading)
    return (
      <div className="  flex  flex-col mt-25 items-center justify-center ">
        <img className="h-10 w-10" src="/loading1.gif" />
        <h1 className="font-semibold text-2xl mt-15">
          Loading Quiz ......
        </h1>
      </div>
    );
    if (isSubmitting)
      return (
        <div className="  flex  flex-col mt-25 items-center justify-center ">
          <img className="h-10 w-10" src="/loading1.gif" />
          <h1 className="font-semibold text-2xl mt-15">
            Loading Dashboard ......
          </h1>
        </div>
      );
// console.log("quiz",quiz)

  const totalQuestions = quiz?.questions?.length;

  const progress = useMemo(() => {
    return ((currentQuestion + 1) / totalQuestions) * 100;
  }, [currentQuestion, totalQuestions]);

  const question = quiz.questions[currentQuestion];

  function selectAnswer(option,questionid) {
    setAnswers(
      (prev) => {
        const safePrev = prev || [];
        const exist = safePrev.find(opt => opt.questionId === questionid)
        if (exist) {
         return  prev.map((opt) =>
          (opt.questionId !== questionid)
            ?opt 
            : {
                questionId: questionid,
                option: option.text,
              },
        )
        }
        else {
           return [
             ...safePrev,
             { questionId: questionid, option: option.text },
           ];
        }
      }
    );
  }

  function nextQuestion() {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  }

  function previousQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }

  function submitQuiz() {
    mutate({id,answers} ,{
      onSuccess: (data) => { 
        setIsModalOpen(true)
        setQuizResult(data.message)
     }
   })
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:max-w-6xl md:max-w-5xl rounded-md  max-w-3xl mx-auto px-2">
      {/* Header */}

      {/* Question */}

      <Card className="lg:col-span-2">
        <CardContent className="space-y-6 p-8">
          <h2 className="text-lg font-semibold leading-relaxed text-foreground">
            {question.question}
          </h2>

          <div className="space-y-4">
            {question.options.map((option, index) => {
              const selected = answers[currentQuestion] === index;

              return (
                <button
                  key={index}
                  onClick={() => selectAnswer(option, question._id)}
                  className={`w-full rounded-xl border p-2 text-left transition-all

                  ${
                    selected
                      ? "border-primary bg-primary/10"
                      : "hover:border-primary/50"
                  }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full border font-medium

                      ${selected ? "border-primary bg-primary text-white" : ""}
                      `}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>

                    <span className="text-sm">{option.text}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex justify-between">
            <Button
              className="py-5 px-6"
              variant="outline"
              disabled={currentQuestion === 0}
              onClick={previousQuestion}
            >
              Previous
            </Button>

            {currentQuestion === totalQuestions - 1 ? (
              <Button className="p-5" onClick={submitQuiz}>
                Submit Quiz
              </Button>
            ) : (
              <Button className="p-5" onClick={nextQuestion}>
                Next Question
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-1 h-fit">
        <CardContent className="space-y-6 p-6">
          <div className=" gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {quiz.title}
              </h1>

              <p className="text-muted-foreground mt-1">{quiz.description}</p>
            </div>

            <div className="space-y-2 text-right">
              <p className="text-sm">
                Passing Score:
                <span className="ml-2 font-semibold">{quiz.passingScore}%</span>
              </p>

              <p className="text-sm">
                Estimated Time:
                <span className="ml-2 font-semibold">
                  {quiz.estimatedTime.value} {quiz.estimatedTime.unit}
                </span>
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>
                Question {currentQuestion + 1} of {totalQuestions}
              </span>

              <span>{Math.round(progress)}%</span>
            </div>

            <Progress value={progress} />
          </div>
        </CardContent>
      </Card>
      {/* Footer */}

      {/* Render the popup component */}
      <QuizResultModal
        isOpen={isModalOpen}
        data={quizResult}
        onClose={() => setIsModalOpen(false)}
        onRetry={() => {
          setIsModalOpen(false);
          // Add your logic to reset/restart the quiz state here
          // console.log("Resetting quiz...");
        }}
      />
    </div>
  );


}

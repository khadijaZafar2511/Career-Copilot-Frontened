import { useNavigate } from "react-router-dom";
export default function QuizResultModal({ isOpen, data, onClose, onRetry }) {
    const navigate=useNavigate()
  // Return nothing if the modal is hidden or data hasn't loaded yet
  if (!isOpen || !data) return null;
// console.log(data)
  // 1. Core Data Calculations & Fallbacks
  const total = data.totalQuestions || 0;
  const correct = data.correctAnswers || 0;
  const wrong = total - correct;
  const score = data.score || 0;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  // 2. Format raw duration seconds into a human-readable string
  const formatTime = (totalSeconds) => {
    if (!totalSeconds) return "0s";
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
  };

    const nextMilestone = () => {
        onRetry()
         navigate(-1);
    }
  // 3. Dynamic layout themes based on passing tiers
  const getThemeSettings = (pct) => {
    if (pct === 100)
      return {
        icon: "🏆",
        title: "Perfect Score!",
        msg: "Outstanding work! You answered everything flawlessly.",
      };
    if (pct >= 50)
      return {
        icon: "🎉",
        title: "Quiz Passed!",
        msg: "Nice job! You earned a passing mark on this quiz.",
      };
    return {
      icon: "💪",
      title: "Keep Improving!",
      msg: "Don't give up! Look over your weak spots and try again.",
    };
  };

  const theme = getThemeSettings(percentage);

 return (
   <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in">
     {/* Main Container Card */}
     <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white p-6 shadow-xl border border-slate-100 transition-all transform scale-100">
       {/* Top Close Button */}
       <button
         onClick={onClose}
         className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
       >
         <svg
           className="h-5 w-5"
           fill="none"
           viewBox="0 0 24 24"
           stroke="currentColor"
         >
           <path
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth={2}
             d="M6 18L18 6M6 6l12 12"
           />
         </svg>
       </button>

       {/* Header Context / Dynamic Badge & Text */}
       <div className="flex flex-col items-center mt-2 text-center">
         <h2 className="text-xl font-bold tracking-tight text-foreground">
           {theme.title}
         </h2>
         <p className="mt-1.5 text-xs text-slate-500 max-w-70 leading-relaxed">
           {theme.msg}
         </p>
       </div>

       {/* Main Score Layout Banner */}
       <div className="my-6 rounded-xl border border-slate-100 bg-slate-50/50 p-4 text-center">
         <span className="text-xxs font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
           Final Score
         </span>
         <div className="flex items-baseline justify-center gap-1">
           <span className="text-4xl font-extrabold text-slate-900">
             {correct}
           </span>
           <span className="text-slate-400 text-sm font-medium">
             / {total} correct
           </span>
         </div>
         <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-600">
           {percentage}% Performance Score
         </div>
       </div>

       {/* Performance 3x Grid Details (Wrong, Points, Time) */}
       <div className="grid grid-cols-3 gap-2.5 mb-6">
         <div className="rounded-xl border border-slate-100 p-2.5 text-center">
           <span className="block text-sm font-bold text-rose-500">
             {wrong}
           </span>
           <span className="text-[10px] font-medium tracking-wide text-slate-400 uppercase">
             Incorrect
           </span>
         </div>

         <div className="rounded-xl border border-slate-100 p-2.5 text-center">
           <span className="block text-sm font-bold text-amber-500">
             +{score}
           </span>
           <span className="text-[10px] font-medium tracking-wide text-slate-400 uppercase">
             XP Points
           </span>
         </div>

         <div className="rounded-xl border border-slate-100 p-2.5 text-center">
           <span className="block text-sm font-bold text-blue-500 truncate">
             {formatTime(data.timeTaken)}
           </span>
           <span className="text-[10px] font-medium tracking-wide text-slate-400 uppercase">
             Duration
           </span>
         </div>
       </div>

       {/* Action Button Controls */}
       <div className="flex flex-col gap-2">
         {percentage >=70 ? (
           <button
             onClick={nextMilestone}
             className="w-full rounded-xl bg-foreground py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 active:scale-[0.99] transition-all"
           >
              Next Milestone Unlocked
           </button>
         ) : (
           <button
             onClick={onRetry}
             className="w-full rounded-xl bg-foreground py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 active:scale-[0.99] transition-all"
           >
              Try Again
           </button>
         )}

         <button
           onClick={onClose}
           className="w-full rounded-xl bg-transparent py-2.5 text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors"
         >
           Review Detailed Answers
         </button>
       </div>
     </div>
   </div>
 );

}

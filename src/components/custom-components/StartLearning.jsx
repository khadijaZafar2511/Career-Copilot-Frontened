// import { createPortal } from "react-dom"

// export default function () {
//     return createPortal(
//         <>

//         </>,
//         document.body
//     )
// }

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StartLearning = ({ goalData, setFilledtab ,selected}) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleStartLearning = () => {
    setShowModal(false);
setFilledtab((prev)=>prev.find((tab)=>tab==4)?[...prev]:[...prev, 4])
    navigate(`/roadmaps/${goalData.roadmapId?goalData.roadmapId:selected.slug}`, {
      state: {
        career: goalData.career ? goalData.career : selected.title  ,
             skillLevel: goalData.skillLevel,
        weeklyHours: goalData.weeklyHours,
        timeline: goalData.timeline,
        TargetPace: goalData.TargetPace,
        dailyReminder: goalData.dailyReminder,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur overflow-hidden  overscroll-contain  flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
            <div className="text-center">
              <div className="text-5xl mb-4">🎉</div>

              <h2 className="text-2xl font-bold mb-2">
                Goal Created Successfully
              </h2>

              <p className="text-gray-500 mb-6">
                Your personalized learning roadmap is ready.
              </p>

              <div className="bg-gray-100 rounded-xl p-4 mb-6 text-left">
                <div className="flex justify-between mb-3">
                  <span className="font-medium">Career</span>
                  <span>
                    {goalData.career ? goalData.career : selected.title}
                  </span>
                </div>

                <div className="flex justify-between mb-3">
                  <span className="font-medium">Skill Level</span>
                  <span>
                    {goalData.skillLevel ? goalData.skillLevel : "Beginner"}
                  </span>
                </div>

                <div className="flex justify-between mb-3">
                  <span className="font-medium">Study Hours</span>
                  <span>
                    {goalData.weeklyHours ? goalData.weeklyHours : "14 "}
                    hrs/week
                  </span>
                </div>

                <div className="flex justify-between mb-3">
                  <span className="font-medium">Timeline</span>
                  <span>
                    {goalData.timeline
                      ? goalData.timeline
                      : "Morning 7 AM - 9 AM (default)"}
                  </span>
                </div>

                <div className="flex justify-between mb-3">
                  <span className="font-medium">TargetPace</span>
                  <span>
                    {goalData.TargetPace
                      ? goalData.TargetPace
                      : "Relaxed (default)"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">DailyReminder</span>
                  <span>
                    {goalData.dailyReminder
                      ? goalData.dailyReminder
                      : " 08 : 00 AM (default)"}
                  </span>
                </div>
              </div>

              <button
                onClick={handleStartLearning}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Start Learning
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-center">
        <h1 className="text-3xl font-bold mb-3">Ready to Start?</h1>

        <p className="text-gray-600 mb-6">
          Your roadmap has been personalized according to your goals.
        </p>

        <div className="bg-white shadow rounded-xl p-6 max-w-md">
          <h3 className="text-xl font-semibold mb-4">
            {goalData.career
              ? goalData.career
              : "You have not choose career yet"}
          </h3>

          <div className="space-y-3 text-left">
            <p>
              <strong>Skill Level:</strong>{" "}
              {goalData.skillLevel ? goalData.skillLevel : "Beginner"}
            </p>

            <p>
              <strong>Study Hours:</strong>{" "}
              {goalData.weeklyHours ? goalData.weeklyHours : "14 "} hrs/week
            </p>

            <p>
              <strong>Timeline:</strong>{" "}
              {goalData.timeline
                ? goalData.timeline
                : "Morning 7 AM - 9 AM (default)"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartLearning;
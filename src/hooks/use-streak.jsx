import { useState, useEffect } from "react";

export function useStreak() {
  const [streak, setStreak] = useState(0);
  const [activeDays, setActiveDays] = useState([]); // Holds completed days

  useEffect(() => {
    // 1. Initial Load from LocalStorage
    setStreak(parseInt(localStorage.getItem("currentStreak") || "0"));
    setActiveDays(
      JSON.parse(localStorage.getItem("activeDaysThisWeek") || "[]"),
    );

    // 2. Clear calendar bubbles automatically if a new week starts
    const lastResetWeek = localStorage.getItem("lastResetWeekNum");
    const currentWeekNum = getWeekNumber(new Date());

    if (lastResetWeek && parseInt(lastResetWeek) !== currentWeekNum) {
      localStorage.setItem("activeDaysThisWeek", "[]");
      localStorage.setItem("lastResetWeekNum", currentWeekNum.toString());
      setActiveDays([]);
    } else if (!lastResetWeek) {
      localStorage.setItem("lastResetWeekNum", currentWeekNum.toString());
    }

    // 3. Keep dashboard and accordion sync'd instantly
    const handleSync = () => {
      setStreak(parseInt(localStorage.getItem("currentStreak") || "0"));
      setActiveDays(
        JSON.parse(localStorage.getItem("activeDaysThisWeek") || "[]"),
      );
    };

    window.addEventListener("streakUpdated", handleSync);
    return () => window.removeEventListener("streakUpdated", handleSync);
  }, [streak]);

  const updateStreak = () => {
    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const currentDayName = weekdays[now.getDay()]; // Returns "Mon", "Tue", etc.

    const lastActiveStr = localStorage.getItem("lastActiveDate");
    let updatedStreak = streak;

    // Check consecutive counter logic
    if (!lastActiveStr) {
      updatedStreak = 1;
    } else if (todayStr !== lastActiveStr) {
      const todayDate = new Date(todayStr);
      const lastActiveDate = new Date(lastActiveStr);
      const diffDays = Math.ceil(
        Math.abs(todayDate.getTime() - lastActiveDate.getTime()) /
          (1000 * 60 * 60 * 24),
      );

      if (diffDays === 1) {
        updatedStreak = streak + 1;
      } else {
        updatedStreak = 1;
      }
    }

    // Save Weekday Marker if not already recorded today
    const storedDays = JSON.parse(
      localStorage.getItem("activeDaysThisWeek") || "[]",
    );
    if (!storedDays.includes(currentDayName)) {
      storedDays.push(currentDayName);
      localStorage.setItem("activeDaysThisWeek", JSON.stringify(storedDays));
      setActiveDays(storedDays);
    }

    setStreak(updatedStreak);
    localStorage.setItem("currentStreak", updatedStreak.toString());
    localStorage.setItem("lastActiveDate", todayStr);

    window.dispatchEvent(new Event("streakUpdated"));
  };

  return { streak, activeDays, updateStreak };
}

// Helper to determine calendar week number
function getWeekNumber(d) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

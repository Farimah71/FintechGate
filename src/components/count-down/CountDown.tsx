import { useEffect, useReducer, useState } from "react";
import { CountDownProps } from "./CountDown.types";

export const CountDown: React.FC<CountDownProps> = ({
  totalSeconds,
  label,
  onFinishTimer,
}) => {
  // ========== states ==========
  const [isEnded, setIsEnded] = useState<boolean>(false);

    const theme = localStorage.getItem("fintech__theme");


  // ========== hooks ===========
  const [state, dispatch] = useReducer(reducer, {
    minute: Math.floor((totalSeconds % 3600) / 60),
    second: totalSeconds % 60,
  });

  const { minute, second } = state;

  // ========== lifecycles ===========
  useEffect(() => {
    const timerInterval = setInterval(dispatch, 1000);
    return () => {
      clearInterval(timerInterval);
    };
  }, []);
  useEffect(() => {
    !state.minute && !state.second && setIsEnded(true);
  }, [state]);
  useEffect(() => {
    if (isEnded) {
      onFinishTimer && onFinishTimer();
    }
  }, [isEnded]);

  // =========== render JSX ============
  return (
    !isEnded && (
      <div>
        <span className={`${theme == "dark" ? "text-gray-400" : "text-dark"}`}>{label}</span>
        <span className="px-2 text-bg-secondary rounded-4 mx-2">
          {minute.toString().length === 1 ? "0" + minute : minute} :{" "}
          {second.toString().length === 1 ? "0" + second : second}
        </span>
      </div>
    )
  );
};

function reducer(state: { minute: number; second: number }) {
  const { minute, second } = state;

  if (second) {
    return { ...state, second: second - 1 };
  } else if (minute) {
    return { ...state, minute: minute - 1, second: 59 };
  } else {
    return state;
  }
}

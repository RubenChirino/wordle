/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";

// Styles
import styles from "./styles.module.css";

// Utils
import classNames from "classnames";

// Custom Components
import Notification, { NotificationProps } from "../Notification";

// Constants
import { ALLOWED_KEYS } from "@/app/constants";

type GridProps = {
  matrix: Array<Array<string | null>>;
  word: string;
};

const getClassForLetterStatus = (
  actualLetter: string | null,
  expectedLetter: string
) => {
  if (actualLetter === expectedLetter) {
    return styles.correct;
  } else if (actualLetter) {
    return styles.incorrect;
  } else {
    return styles.pending;
  }
};

export default function Grid({ matrix, word }: GridProps) {
  // States
  const [board, setBoard] = useState<Array<Array<string | null>>>(matrix);
  const [userWord, setUserWord] = useState<Array<string>>([]);
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [notification, setNotification] = useState<NotificationProps | null>(
    null
  );

  const handleKeyboard = (event: KeyboardEvent) => {
    // Ignore the key press if it's not in the allowed keys
    if (!ALLOWED_KEYS.has(event.key.toUpperCase())) {
      return;
    }

    // Enter the new word
    if (event.key === "Enter") {
      if (userWord.length !== word.length) {
        
        setNotification({
            title: "Not enough letters",
            description: "Please type the correct amount of letter to continue",
            status: "info"
        });

        setTimeout(() => {
            setNotification(null);
        });
        return;
      }

      // Set new states
      setBoard((prevState) => {
        const newBoard = [...prevState];
        newBoard[currentRow] = [...userWord];
        return newBoard;
      });
      setCurrentRow((prev) => prev + 1);
      setUserWord([]);
      return;
    }

    // Remove the last letter
    if (event.key === "Backspace" || event.key === "Delete") {
      setUserWord((prevState) => prevState.slice(0, -1));
      setBoard((prevState) => {
        const newBoard = [...prevState];
        const newRow = [...prevState[currentRow]];
        newRow[userWord.length - 1] = null;
        newBoard[currentRow] = newRow;
        return newBoard;
      });
      return;
    }

    // Add a new letter
    if (userWord.length < word.length) {
      const newLetter = event.key.toUpperCase();
      setUserWord((prevState) => [...prevState, newLetter]);
      setBoard((prevState) => {
        // Update board
        const newBoard = [...prevState];
        const newRow = [...prevState[currentRow]];
        newRow[userWord.length] = newLetter;
        newBoard[currentRow] = newRow;
        return newBoard;
      });
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div
      className={styles.grid}
      style={{ gridTemplateRows: `repeat(${board.length}, 1fr)` }}
    >
      {board.map((row, RowIndex) => {
        const rowStatusClass =
          currentRow > RowIndex
            ? styles.gridRowComplete
            : "";
        return (
          <div
            className={classNames(styles.gridRow, rowStatusClass)}
            key={RowIndex}
            style={{ gridTemplateColumns: `repeat(${board[0].length}, 1fr)` }}
          >
            {row.map((column, columnIndex) => {
              const statusColumnsClass =
                currentRow > RowIndex
                  ? getClassForLetterStatus(column, word.charAt(columnIndex))
                  : "";
              return (
                <div
                  className={classNames(styles.gridColumn, statusColumnsClass)}
                  key={columnIndex}
                >
                  {column ?? ""}
                </div>
              );
            })}
          </div>
        );
      })}

      {notification && (
        <Notification
          title={notification.title}
          description={notification.description}
          status={notification.status}
        />
      )}
    </div>
  );
}

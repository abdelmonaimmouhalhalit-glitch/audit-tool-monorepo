// apps/client-dashboard/src/components/audit/ScoreGauge.tsx
import React from 'react';
import styles from './ScoreGauge.module.css'; // Utilise le CSS Module

interface ScoreGaugeProps {
  score: number;
  label: string;
}

export function ScoreGauge({ score, label }: ScoreGaugeProps) {
  let colorClass;
  if (score > 80) {
    colorClass = styles.scoreHigh;
  } else if (score > 50) {
    colorClass = styles.scoreMedium;
  } else {
    colorClass = styles.scoreLow;
  }
  
  return (
    <div className={styles.scoreGaugeContainer}>
      <div className={styles.scoreGauge}>
        <div className={styles.scoreContent}>
          <span className={`${styles.scoreValue} ${colorClass}`}>{score}</span>
          <span className={styles.scoreMax}>/ 100</span>
        </div>
      </div>
      <p className={styles.scoreLabel}>{label}</p>
    </div>
  );
}
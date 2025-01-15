"use client";

import React, { useEffect, useRef, useState } from "react";
import { Wave } from "@foobar404/wave";

// Ensure the script runs after the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Select audio and canvas elements
  let audioElement = document.querySelector(
    "#audioElmId"
  ) as HTMLAudioElement | null;
  let canvasElement = document.querySelector(
    "#canvasElmId"
  ) as HTMLCanvasElement | null;

  // Check if audioElement and canvasElement are not null before initializing Wave
  if (audioElement && canvasElement) {
    // Initialize the Wave instance
    let wave = new Wave(audioElement, canvasElement);

    // Simple animation example
    wave.addAnimation(new wave.animations.Wave());

    // Intermediate example with options
    wave.addAnimation(
      new wave.animations.Wave({
        lineWidth: 10,
        lineColor: "red",
        count: 20,
      })
    );

    // Expert example: Adding multiple animations
    wave.addAnimation(
      new wave.animations.Square({
        count: 50,
        diameter: 300, // Fixed typo: Changed 'diamater' to 'diameter'
      })
    );

    wave.addAnimation(
      new wave.animations.Glob({
        fillColor: { gradient: ["red", "blue", "green"], rotate: 45 },
        lineWidth: 10,
        lineColor: "#fff",
      })
    );

    // Play the audio when the user interacts with the audio element
    audioElement.addEventListener("play", () => {
      console.log("Audio is playing...");
    });

    // Pause handling (optional)
    audioElement.addEventListener("pause", () => {
      console.log("Audio is paused.");
    });
  } else {
    console.error("Audio element or canvas element not found");
  }
});

export const AudioWaveform = () => {
  // Component logic here
};

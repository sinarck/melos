import { emotionSchema } from "@/schema/emotion";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { confidence, primary_emotion, top3_predictions } =
      emotionSchema.parse(body);

    const response = await fetch(
      "https://song-name-gen-py-dsgfx.replit.app/generate-songs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          genre: "pop",
          mood: `${(confidence * 100).toPrecision(2)}% ${primary_emotion}, ${
            top3_predictions[0][0]
          } ${(top3_predictions[0][1] * 100).toPrecision(2)}%`,
          inspiration:
            "A title that accurately depicts the moods I've provided",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate title" },
      { status: 500 }
    );
  }
}


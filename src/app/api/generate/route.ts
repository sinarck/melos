import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const endpoint = "https://public-api.beatoven.ai/api/v1";

const generateSchema = z.object({
  text: z.string(),
});

interface TrackApiResponse {
  status: string;
  tracks: string[];
}

export const maxDuration = 65; // max duration in seconds

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { text } = generateSchema.parse(body);

    // Step 1: Generate the track
    const trackResponse = await axios.post<TrackApiResponse>(
      endpoint + "/tracks",
      {
        prompt: {
          text,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.BEATOVEN_API_KEY}`,
        },
      }
    );

    const trackID = trackResponse.data.tracks[0];

    // Step 2: Compose the track
    const composeResponse = await axios.post(
      `${endpoint}/tracks/compose/${trackID}`,
      {
        format: "wav",
        looping: false,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.BEATOVEN_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const taskID = composeResponse.data.task_id;

    // Step 3: Poll the task status until the composition is finished
    let statusResponse;
    do {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before polling again
      statusResponse = await axios.get(`${endpoint}/tasks/${taskID}`, {
        headers: {
          Authorization: `Bearer ${process.env.BEATOVEN_API_KEY}`,
        },
      });
    } while (statusResponse.data.status !== "composed");

    return NextResponse.json(
      {
        message: "Track generated successfully",
        data: statusResponse.data,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      {
        message: "An error occurred",
      },
      {
        status: 500,
      }
    );
  }
};


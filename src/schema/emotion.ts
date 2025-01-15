import { z } from "zod";

export const emotionSchema = z.object({
  confidence: z.number(),
  primary_emotion: z.string(),
  top3_predictions: z.array(z.tuple([z.string(), z.number()])),
});


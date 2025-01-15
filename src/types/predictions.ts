export interface PredictionsApiResponse {
  data: Data;
  status: string;
}

export interface Data {
  confidence: number;
  primary_emotion: string;
  top3_predictions: [string, number][];
}


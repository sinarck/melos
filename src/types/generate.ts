export interface GenerateApiResponse {
  message: string;
  data: Data;
}

export interface Data {
  status: string;
  meta: Meta;
}

export interface Meta {
  project_id: string;
  track_id: string;
  prompt: Prompt;
  version: number;
  track_url: string;
  stems_url: StemsUrl;
}

export interface Prompt {
  text: string;
}

export interface StemsUrl {
  melody: string;
  bass: string;
  percussion: string;
  chords: string;
}


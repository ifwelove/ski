export type Region = 'japan' | 'taiwan';
export type Gender = 'male' | 'female';
export type RidingStyle = 'all-mountain' | 'freestyle' | 'carving';

export interface UserInputs {
  region: Region;
  gender: Gender;
  ridingStyle: RidingStyle;
  height: number;
  weight: number;
}

export interface BoardRecommendation {
  lengthRange: {
    min: number;
    max: number;
    avg: number;
  };
  profile: string;
  flex: {
    min: number;
    max: number;
    avg: number;
  };
} 
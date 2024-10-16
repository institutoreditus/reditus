export type GetRankingData = {
  amount: number;
  numberOfDonors: number;
  ranking: {
    position: number;
    degree: string;
    initialYear: number;
    finalYear: number;
    amount: number;
    numberOfDonors: number;
  }[];
};

export type GetClassData = {
  amount: number;
  numberOfDonors: number;
  donors: {
    name: string;
    url?: string;
    year: number;
  }[];
};

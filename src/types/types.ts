export interface Bus {
  stopPlace: {
    name: string;
    id: string;
    estimatedCalls: {
      expectedDepartureTime: string;
      aimedDepartureTime: string;
      destinationDisplay: {
        frontText: string;
      };
      serviceJourney: {
        line: {
          publicCode: string;
          transportMode: string;
        };
      };
    }[];
  };
}

export interface BusTimes {
  expectedDepartureTime: string;
  aimedDepartureTime: string;
}

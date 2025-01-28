export interface EstimatedCall {
	aimedArrivalTime: Date;
	expectedArrivalTime: Date;
	destinationDisplay: {
		frontText: string;
	};
	serviceJourney: {
		line: {
			publicCode: string;
			transportMode: string;
		};
	};
	quay: {
		id: string;
	};
}

export interface StopPlace {
	id: string;
	name: string;
	estimatedCalls: EstimatedCall[];
}

export interface Bus {
	stopPlace: StopPlace;
	quays: { [key: string]: EstimatedCall[] };
}

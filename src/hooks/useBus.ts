import { useQuery } from "@tanstack/react-query";
import { Bus, EstimatedCall } from "../types/types";

export const useBus = (url: string) => {
	return useQuery<Bus>({
		queryKey: ["bus", url],
		queryFn: async () => {
			const query = `{
        stopPlace(id: "NSR:StopPlace:44029") {
          id
          name
          estimatedCalls(numberOfDepartures: 20) {
            aimedArrivalTime
            expectedArrivalTime
            destinationDisplay {
              frontText
            }
            serviceJourney {
              line {
                publicCode
                transportMode
              }
            }
            quay {
              id
            }
          }
        }
      }`;

			const response = await fetch(url, {
				method: "POST",
				headers: {
					"ET-Client-Name": "enderz-bussapi",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ query }),
			});
			const result = await response.json();
			const data = result.data;

			const quays = data.stopPlace.estimatedCalls.reduce(
				(acc: { [key: string]: EstimatedCall[] }, call: EstimatedCall) => {
					const quayId = call.quay.id;
					if (!acc[quayId]) {
						acc[quayId] = [];
					}
					acc[quayId].push({
						...call,
						expectedArrivalTime: new Date(call.expectedArrivalTime),
						aimedArrivalTime: new Date(call.aimedArrivalTime),
					});
					return acc;
				},
				{}
			);

			return { stopPlace: data.stopPlace, quays };
		},
		staleTime: 1000 * 60 * 1,
		refetchInterval: 1000 * 60 * 1,
	});
};

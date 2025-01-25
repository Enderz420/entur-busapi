import { useQuery } from "@tanstack/react-query";
import { BusTimes } from "../types/types";

export const useBus = (url: string) => {
  return useQuery({
    queryKey: ["bus", url],
    queryFn: async () => {
      const query = `{
              stopPlace(id: "NSR:StopPlace:43252") {
                name
                id
                estimatedCalls(numberOfDepartures: 5, whiteListedModes: [bus]) {
                  expectedDepartureTime
                  aimedDepartureTime
                  destinationDisplay {
                    frontText
                  }
                  serviceJourney {
                    line {
                      publicCode
                      transportMode
                    }
                  }
                }
              }
            }`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "ET-Client-Name": "awesomecompany-awesomeapp",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const result = await response.json();
      const data = result.data;

      data.stopPlace.estimatedCalls = data.stopPlace.estimatedCalls.map(
        (call: BusTimes) => ({
          ...call,
          expectedDepartureTime: new Date(call.expectedDepartureTime),
          aimedDepartureTime: new Date(call.aimedDepartureTime),
        })
      );
      return data;
    },
    staleTime: 1000 * 60 * 60 * 24,
  });
};

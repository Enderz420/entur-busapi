import { useBus } from "../hooks/useBus";
import { Bus } from "../types/types";

function BusOverview() {
  const { data, error, isLoading } = useBus(
    "https://api.entur.io/journey-planner/v3/graphql"
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const busData: Bus = data.data;
  console.log(data);
  return (
    <div>
      <h1>Bus Overview</h1>
      <h2>Stop Place: {busData.stopPlace.name}</h2>
      <ul>
        {busData.stopPlace.estimatedCalls.map((bus) => (
          <li key={bus.expectedDepartureTime}>
            <p>
              <strong>Line:</strong> {bus.serviceJourney.line.publicCode}
            </p>
            <p>
              <strong>Destination:</strong> {bus.destinationDisplay.frontText}
            </p>
            <p>
              <strong>Expected Departure:</strong> {bus.expectedDepartureTime}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BusOverview;

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
  const busData: Bus = data;
  console.log(data);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    date.setHours(date.getUTCHours() + 1); // Adjust to GMT+1
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="grid grid-cols-5 mx-5 pt-10 gap-4">
      <h1>Bus Overview</h1>
      <h2>Stop Place: {busData.stopPlace.name}</h2>
      <ul>
        {busData.stopPlace.estimatedCalls.map((bus) => (
          <li key={bus.expectedDepartureTime.toString()}>
            <p>
              <strong>Line:</strong> {bus.serviceJourney.line.publicCode}
            </p>
            <p>
              <strong>Destination:</strong> {bus.destinationDisplay.frontText}
            </p>
            <p>
              <strong>Expected Departure:</strong>{" "}
              {formatTime(bus.expectedDepartureTime)}
            </p>
            <p>
              <strong>Aimed Departure:</strong>{" "}
              {formatTime(bus.aimedDepartureTime)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BusOverview;

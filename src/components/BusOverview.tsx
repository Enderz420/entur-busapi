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
  const busData: Bus | undefined = data;
  if (!busData) {
    return <div>No data available</div>;
  }
  console.log(data);

  const formatTime = (date: Date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) return "Invalid date";
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="bg-stone-600 bg-cover h-screen">
      <div className="flex items-center justify-center flex-col space-y-4 mx-5 pt-10 bg-stone-400 ">
        <h1 className="rounded-xl shadow-xl bg-stone-300 backdrop-blur p-5">
          Buss
        </h1>
        <h2 className="bg-stone-300 rounded-2xl p-2 border-b-fuchsia-800 shadow-2xl">
          Holdeplass: {busData.stopPlace.name}
        </h2>
        <div className="overflow-x-auto">
          {Object.keys(busData.quays).map((quayId) => (
            <div key={quayId} className="mb-4">
              <h3 className="bg-stone-300 rounded-2xl p-2 border-b-fuchsia-800 shadow-2xl">
                Quay: {quayId}
              </h3>
              <table className="min-w-full border-black border-2 bg-stone-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Linje</th>
                    <th className="py-2 px-4 border-b">Til</th>
                    <th className="py-2 px-4 border-b">Planlagt</th>
                    <th className="py-2 px-4 border-b">Faktisk</th>
                  </tr>
                </thead>
                <tbody>
                  {busData.quays[quayId].map((bus, index) => (
                    <tr key={index} className="hover:bg-rose-300">
                      <td className="py-2 px-4 border-b">
                        {bus.serviceJourney.line.publicCode}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {bus.destinationDisplay.frontText}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {formatTime(bus.aimedArrivalTime)}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {formatTime(bus.expectedArrivalTime)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BusOverview;

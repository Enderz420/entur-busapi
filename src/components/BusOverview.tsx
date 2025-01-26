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
    date.setHours(date.getUTCHours() + 1);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="bg-stone-600 bg-cover h-screen">
      <div className="flex items-center justify-center flex-col space-y-4 mx-5 pt-10 bg-stone-400 ">
        <h1 className="rounded-xl shadow-xl bg-stone-300 backdrop-blur p-5">
          Buss tabell
        </h1>
        <h2 className="bg-stone-300 rounded-2xl p-2 border-b-fuchsia-800 shadow-2xl">
          Holdeplass: {busData.stopPlace.name}
        </h2>
        <div className="overflow-x-auto">
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
              {busData.stopPlace.estimatedCalls.map((bus, index) => (
                <tr key={index} className="hover:bg-rose-300">
                  <td className="py-2 px-4 border-b">
                    {bus.serviceJourney.line.publicCode}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {bus.destinationDisplay.frontText}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {formatTime(bus.expectedDepartureTime)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {formatTime(bus.aimedDepartureTime)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BusOverview;

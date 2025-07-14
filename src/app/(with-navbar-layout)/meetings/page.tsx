import { listGoogleEvents } from "@/services/meeting/lib";

export default async function EventsPage() {
  const events = await listGoogleEvents();

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Upcoming Events</h2>

      {events.length === 0 && <p>No upcoming events</p>}

      {events.map((event) => (
        <div key={event.id} className="border p-4 rounded shadow-sm">
          <p className="font-semibold text-lg">{event.summary}</p>
          <p className="text-sm text-gray-600">
            {event.start?.dateTime || event.start?.date}
          </p>

          {event.conferenceData?.entryPoints?.[0]?.uri && (
            <p>
              🔗{" "}
              <a
                href={event.conferenceData.entryPoints[0].uri}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Join Meet
              </a>
            </p>
          )}
          {event.attendees && event.attendees.length ? (
            <p>👥 {event.attendees.map((a) => a.email).join(", ")}</p>
          ) : null}

          <p className="text-sm">📝 {event.description || "No description"}</p>
        </div>
      ))}
    </div>
  );
}

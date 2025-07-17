"use server";
import { authOptions } from "@/lib/auth/authOptions";
import { google } from "googleapis";
import { getServerSession } from "next-auth";

const appTag = "[peer-app]";

/**
 * attendees - loggedin user - who is creating the meeting is automatically added , as he organizer
 */
export async function createMeetEvent({
  summary = "1:1 Google Meet",
  description = "Meeting between two users",
  startTime = "2025-07-12T12:00:00.000Z",
  endTime = "2025-07-12T12:30:00.000Z",
  attendees = [],
}: {
  summary?: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  attendees: string[]; // array of emails
}) {
  const calendar = google.calendar({
    version: "v3",
    auth: await getGoogleOAuth2Client(),
  });

  description = `${appTag} ${description}`;

  const event = await calendar.events.insert({
    calendarId: "primary",
    conferenceDataVersion: 1,
    requestBody: {
      summary,
      description,
      start: {
        dateTime: startTime,
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: endTime,
        timeZone: "Asia/Kolkata",
      },
      attendees: attendees.map((email) => ({ email })),
      conferenceData: {
        createRequest: {
          requestId: Math.random().toString(36).substring(7),
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    },
    sendUpdates: "all", // sends email invites to attendees
  });

  return event.data;
}

export async function getGoogleEvents() {
  const calendar = google.calendar({
    version: "v3",
    auth: await getGoogleOAuth2Client(),
  });

  const res = await calendar.events.list({
    calendarId: "primary",
    // timeMin: new Date().toISOString(), // only future events
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
    q: appTag, // search only text fields : searches in summary, description, location
  });

  return res.data.items || [];
}

export async function hasMeetingWithUser(
  targetEmail: string
): Promise<boolean> {
  const events = await getGoogleEvents();
  return events.some((event) =>
    event.attendees?.some((a) => a.email === targetEmail)
  );
}

async function getGoogleOAuth2Client() {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken;
  if (!accessToken) throw new Error("Access token missing in session");
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });
  return auth;
}

// async function getGoogleOAuth2Client(refreshToken: string) {
//   const client = new google.auth.OAuth2(
//     process.env.GOOGLE_CLIENT_ID!,
//     process.env.GOOGLE_CLIENT_SECRET!,
//     process.env.GOOGLE_REDIRECT_URI! // must match your Google config
//   );

//   const { credentials } = await client.refreshToken(refreshToken);
//   client.setCredentials(credentials);

//   return client;
// }
import { processPayfastNotification } from "../../lib/payfastService";

// Adapted for Vite without Next.js dependencies
export async function handler(request: Request) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const payload = await request.json();
    const result = await processPayfastNotification(payload);

    if (result.success) {
      return new Response(
        JSON.stringify({ message: "Notification processed successfully" }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          message: "Failed to process notification",
          error: result.error,
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    console.error("Error handling PayFast notification:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error", error }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export default handler;

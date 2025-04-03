import { processPayfastNotification } from "../lib/payfastService";

// This is a simplified API handler for Vite
// In a real application, you would use a proper server framework
export async function handlePayfastNotification(request: Request) {
  // Only allow POST requests
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    // Parse the request body
    const payload = await request.json();

    // Process the PayFast notification
    const result = await processPayfastNotification(payload);

    if (!result.success) {
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

    // Return success response
    return new Response(
      JSON.stringify({ message: "Notification processed successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error in PayFast notification handler:", error);
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

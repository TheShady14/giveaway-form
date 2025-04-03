import type { NextApiRequest, NextApiResponse } from "next";
import { processPayfastNotification } from "../../lib/payfastService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Process the PayFast notification
    const result = await processPayfastNotification(req.body);

    if (!result.success) {
      return res
        .status(400)
        .json({
          message: "Failed to process notification",
          error: result.error,
        });
    }

    // Return success response
    return res
      .status(200)
      .json({ message: "Notification processed successfully" });
  } catch (error) {
    console.error("Error in PayFast notification handler:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
}

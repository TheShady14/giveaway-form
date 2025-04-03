import { supabase } from "./supabase";
import { updateEntryPaymentStatus, createPayment } from "./entryService";

// Process a PayFast notification (ITN - Instant Transaction Notification)
export async function processPayfastNotification(
  payload: any
): Promise<{ success: boolean; error?: any }> {
  try {
    // Store the notification in the database
    const { data: notification, error: notificationError } = await supabase
      .from("payfast_notifications")
      .insert([
        {
          payment_id: null, // Will be updated after payment verification
          payload,
          verified: false,
          processed: false,
        },
      ])
      .select()
      .single();

    if (notificationError) {
      throw notificationError;
    }

    // Verify the notification with PayFast (simplified - in production, implement proper verification)
    const isVerified = await verifyPayfastNotification(payload);

    if (!isVerified) {
      // Update notification as not verified
      await supabase
        .from("payfast_notifications")
        .update({ verified: false, processed: true })
        .eq("id", notification.id);

      return {
        success: false,
        error: "PayFast notification verification failed",
      };
    }

    // Find the entry using the payment reference (m_payment_id)
    const entryId = payload.m_payment_id;

    // Create a payment record
    const { data: payment, error: paymentError } = await createPayment({
      entry_id: entryId,
      amount: Number.parseFloat(payload.amount_gross),
      payment_method: "payfast",
      transaction_id: payload.pf_payment_id,
      status: payload.payment_status === "COMPLETE" ? "completed" : "pending",
      payment_date: new Date().toISOString(),
    });

    if (paymentError) {
      throw paymentError;
    }

    // Update the notification with the payment ID
    await supabase
      .from("payfast_notifications")
      .update({
        payment_id: payment.id,
        verified: true,
        processed: true,
      })
      .eq("id", notification.id);

    // Update the entry payment status
    await updateEntryPaymentStatus(
      entryId,
      payload.payment_status === "COMPLETE" ? "completed" : "pending",
      payload.pf_payment_id
    );

    return { success: true };
  } catch (error) {
    console.error("Error processing PayFast notification:", error);
    return { success: false, error };
  }
}

// Verify a PayFast notification (simplified)
// In production, implement proper verification as per PayFast documentation
async function verifyPayfastNotification(payload: any): Promise<boolean> {
  // This is a simplified verification
  // In production, you should:
  // 1. Check that the notification came from PayFast's IP
  // 2. Validate the data by sending it back to PayFast
  // 3. Check for tampering by validating the signature

  // For now, we'll just check if the payment_status exists
  return !!payload.payment_status;
}

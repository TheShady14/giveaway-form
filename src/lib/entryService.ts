import { supabase, type Entry, type Payment } from "./supabase";

// Create a new entry in the database
export async function createEntry(
  entry: Omit<Entry, "id" | "created_at" | "updated_at">
): Promise<{ data: Entry | null; error: any }> {
  const { data, error } = await supabase
    .from("entries")
    .insert([entry])
    .select()
    .single();

  return { data, error };
}

// Get an entry by ID
export async function getEntryById(
  id: string
): Promise<{ data: Entry | null; error: any }> {
  const { data, error } = await supabase
    .from("entries")
    .select("*")
    .eq("id", id)
    .single();

  return { data, error };
}

// Update an entry's payment status
export async function updateEntryPaymentStatus(
  entryId: string,
  status: "pending" | "completed" | "failed",
  paymentReference?: string
): Promise<{ data: Entry | null; error: any }> {
  const updates = {
    payment_status: status,
    ...(paymentReference && { payment_reference: paymentReference }),
  };

  const { data, error } = await supabase
    .from("entries")
    .update(updates)
    .eq("id", entryId)
    .select()
    .single();

  return { data, error };
}

// Create a new payment record
export async function createPayment(
  payment: Omit<Payment, "id" | "created_at" | "updated_at">
): Promise<{ data: Payment | null; error: any }> {
  const { data, error } = await supabase
    .from("payments")
    .insert([payment])
    .select()
    .single();

  return { data, error };
}

// Calculate entry count based on donation amount
export function calculateEntries(amount: number): number {
  if (amount < 50) return 0;

  // Every R50 is 1 entry, and every 2nd entry gets a free 3rd
  const baseEntries = Math.floor(amount / 50);
  const bonusEntries = Math.floor(baseEntries / 2);

  return baseEntries + bonusEntries;
}

// Get all entries (for admin)
export async function getAllEntries(): Promise<{
  data: Entry[] | null;
  error: any;
}> {
  const { data, error } = await supabase
    .from("entries")
    .select(
      `
      *,
      payments(*)
    `
    )
    .order("created_at", { ascending: false });

  return { data, error };
}

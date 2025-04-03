import { createClient } from "@supabase/supabase-js";

// For Vite, we need to use import.meta.env
// These environment variables should be defined in your .env file
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  "";

// Create a single supabase client for the browser
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export type Entry = {
  id?: string;
  name: string;
  surname: string;
  phone: string;
  social_handle: string;
  social_platform: string;
  followed_teddy: boolean;
  liked_post: boolean;
  donation_amount: number;
  reposted_story: boolean;
  tagged_friends: boolean;
  followed_mdluli: boolean;
  followed_frozen: boolean;
  accepted_terms: boolean;
  entry_count: number;
  payment_status: "pending" | "completed" | "failed";
  payment_reference?: string;
  created_at?: string;
  updated_at?: string;
};

export type Payment = {
  id?: string;
  entry_id: string;
  amount: number;
  payment_method: string;
  transaction_id?: string;
  status: "pending" | "completed" | "failed";
  payment_date?: string;
  created_at?: string;
  updated_at?: string;
};

export type PayfastNotification = {
  id?: string;
  payment_id: string;
  payload: any;
  verified: boolean;
  processed: boolean;
  created_at?: string;
};

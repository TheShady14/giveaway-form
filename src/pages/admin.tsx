"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Entry } from "../lib/supabase";

const AdminPage: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    async function fetchEntries() {
      try {
        setLoading(true);

        // Fetch entries with payment information
        const { data, error } = await supabase
          .from("entries")
          .select(
            `
            *,
            payments(*)
          `
          )
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        setEntries(data || []);

        // Calculate totals
        if (data) {
          const completedEntries = data.filter(
            (entry) => entry.payment_status === "completed"
          );
          setTotalEntries(
            completedEntries.reduce((sum, entry) => sum + entry.entry_count, 0)
          );
          setTotalAmount(
            completedEntries.reduce(
              (sum, entry) => sum + Number(entry.donation_amount),
              0
            )
          );
        }
      } catch (error) {
        console.error("Error fetching entries:", error);
        setError("Failed to load entries. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchEntries();
  }, []);

  return (
    <div className="admin-page-wrapper">
      <div className="admin-container">
        <div className="admin-header">
          <h1>Teddy Bear Foundation Giveaway</h1>
          <h2>Admin Dashboard</h2>
        </div>

        {loading ? (
          <div className="admin-loading">
            <p>Loading entries...</p>
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <div className="admin-stats">
              <div className="stat-card">
                <h3>Total Entries</h3>
                <p className="stat-value">{entries.length}</p>
              </div>
              <div className="stat-card">
                <h3>Completed Payments</h3>
                <p className="stat-value">
                  {
                    entries.filter(
                      (entry) => entry.payment_status === "completed"
                    ).length
                  }
                </p>
              </div>
              <div className="stat-card">
                <h3>Total Entry Count</h3>
                <p className="stat-value">{totalEntries}</p>
              </div>
              <div className="stat-card">
                <h3>Total Amount</h3>
                <p className="stat-value">R{totalAmount.toFixed(2)}</p>
              </div>
            </div>

            <div className="admin-content">
              <h2>All Entries</h2>
              <div className="entries-table-container">
                <table className="entries-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Contact</th>
                      <th>Social</th>
                      <th>Amount</th>
                      <th>Entries</th>
                      <th>Payment Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry) => (
                      <tr
                        key={entry.id}
                        className={
                          entry.payment_status === "completed"
                            ? "row-completed"
                            : ""
                        }
                      >
                        <td>
                          {entry.name} {entry.surname}
                        </td>
                        <td>{entry.phone}</td>
                        <td>
                          {entry.social_platform}: {entry.social_handle}
                        </td>
                        <td>R{Number(entry.donation_amount).toFixed(2)}</td>
                        <td>{entry.entry_count}</td>
                        <td className={`status-${entry.payment_status}`}>
                          {entry.payment_status}
                        </td>
                        <td>
                          {new Date(
                            entry.created_at || ""
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPage;

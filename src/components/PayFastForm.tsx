import type React from "react";

interface PayFastFormProps {
  amount: number;
  entryId?: string | null;
  disabled?: boolean;
}

const PayFastForm: React.FC<PayFastFormProps> = ({
  amount,
  entryId,
  disabled = false,
}) => {
  return (
    <form
      name="PayFastPayNowForm"
      action="https://payment.payfast.io/eng/process"
      method="post"
    >
      <input required type="hidden" name="cmd" value="_paynow" />
      <input
        required
        type="hidden"
        name="receiver"
        pattern="[0-9]"
        value="12587534"
      />

      {/* COMMENT: Update these URLs with your actual website URLs */}
      <input
        type="hidden"
        name="return_url"
        value="https://giveaway-form-nine.vercel.app/thank-you"
      />
      <input
        type="hidden"
        name="cancel_url"
        value="https://giveaway-form-nine.vercel.app/"
      />
      <input
        type="hidden"
        name="notify_url"
        value="https://giveaway-form-nine.vercel.app/api/payfast-notify"
      />

      <input
        required
        type="hidden"
        id="PayFastAmount"
        name="amount"
        value={amount.toFixed(2)}
      />
      <input
        required
        type="hidden"
        name="item_name"
        maxLength={255}
        value="Teddy Bear Foundation Giveaway Entry"
      />
      <input
        type="hidden"
        name="item_description"
        maxLength={255}
        value="Donation for Teddy Bear Foundation Giveaway"
      />

      {/* Use the entry ID as the payment reference */}
      {entryId && <input type="hidden" name="m_payment_id" value={entryId} />}

      <button
        type="submit"
        className="pay-now-btn"
        disabled={disabled}
        style={{
          background:
            "linear-gradient(135deg, var(--color-accent), var(--color-secondary))",
          padding: "var(--spacing-md) var(--spacing-xl)",
          fontWeight: 600,
          transition: "all 0.3s ease",
          border: "none",
          borderRadius: "var(--radius-md)",
          color: "white",
          cursor: disabled ? "not-allowed" : "pointer",
          width: "100%",
          maxWidth: "300px",
          opacity: disabled ? 0.7 : 1,
        }}
      >
        Pay Now with PayFast
      </button>
    </form>
  );
};

export default PayFastForm;

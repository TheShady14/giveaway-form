"use client";

import type React from "react";
import { useState } from "react";
import Button from "./components/ui/button";
import Input from "./components/ui/input";
import Checkbox from "./components/ui/checkbox";
import {
  Facebook,
  Instagram,
  LinkedinIcon,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import PayFastForm from "./components/PayFastForm";
import {
  createEntry,
  calculateEntries as calculateEntryCount,
} from "./lib/entryService";

const GiveawayLandingPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    socialHandle: "",
    socialPlatform: "",
    followedTeddy: false,
    likedPost: false,
    donationAmount: 50,
    repostedStory: false,
    taggedFriends: false,
    followedMdluli: false,
    followedFrozen: false,
    acceptedTerms: false,
  });

  const [entryId, setEntryId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formStep, setFormStep] = useState(1); // 1: Form, 2: Payment, 3: Complete

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const calculateEntries = (amount: number) => {
    return calculateEntryCount(amount);
  };

  const handleDonationChange = (change: number) => {
    setFormData((prev) => {
      const newAmount = Math.max(50, prev.donationAmount + change);
      return {
        ...prev,
        donationAmount: newAmount,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Create the entry in the database
      const { data, error } = await createEntry({
        name: formData.name,
        surname: formData.surname,
        phone: formData.phone,
        social_handle: formData.socialHandle,
        social_platform: formData.socialPlatform,
        followed_teddy: formData.followedTeddy,
        liked_post: formData.likedPost,
        donation_amount: formData.donationAmount,
        reposted_story: formData.repostedStory,
        tagged_friends: formData.taggedFriends,
        followed_mdluli: formData.followedMdluli,
        followed_frozen: formData.followedFrozen,
        accepted_terms: formData.acceptedTerms,
        entry_count: calculateEntries(formData.donationAmount),
        payment_status: "pending",
      });

      if (error) {
        throw error;
      }

      // Store the entry ID for the payment form
      setEntryId(data?.id || null);
      setFormStep(2); // Move to payment step

      // Scroll to the payment section
      const paymentSection = document.querySelector(".donation-section");
      if (paymentSection) {
        paymentSection.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error submitting entry:", error);
      setSubmitError("Failed to submit your entry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openSocialLink = (platform: "facebook" | "instagram" | "linkedin") => {
    // COMMENT: Replace these URLs with the actual Teddy Bear Foundation social media profiles
    const links = {
      facebook: "https://www.facebook.com/theteddybearclinic",
      instagram: "https://www.instagram.com/teddybearfoundation/",
      linkedin: "https://www.linkedin.com/company/teddybearclinic",
    };
    window.open(links[platform], "_blank");
  };

  // Get the current platform post link
  const getCurrentPlatformPostLink = () => {
    // COMMENT: Replace these URLs with the actual post links for each platform
    const postLinks = {
      facebook: "https://www.facebook.com/theteddybearclinic/posts/12345",
      instagram: "https://www.instagram.com/p/abcdef/",
      linkedin:
        "https://www.linkedin.com/feed/update/urn:li:activity:1234567890",
      "": "#", // Default if no platform selected
    };

    return postLinks[formData.socialPlatform as keyof typeof postLinks] || "#";
  };

  const socialMediaIcons = {
    facebook: <Facebook color="#000000" />,
    instagram: <Instagram color="#000000" />,
    linkedin: <LinkedinIcon color="#000000" />,
  };

  // Partner website links
  // COMMENT: Verify these URLs are correct for each partner
  const partnerLinks = {
    frozen: "https://frozenforyou.co.za/",
    tbf: "https://teddybearfoundation.org.za/",
    mdluli: "https://www.mdlulisafarilodge.co.za/",
  };

  // Get platform-specific bonus entry options
  const getBonusEntryOptions = () => {
    // Base options that are always available
    const baseOptions = [
      {
        name: "followedMdluli",
        label: "Follow Mdluli Safari Lodge",
        points: 1,
        action: "Follow",
        link: partnerLinks.mdluli,
      },
      {
        name: "followedFrozen",
        label: "Follow Frozen For You",
        points: 1,
        action: "Follow",
        link: partnerLinks.frozen,
      },
    ];

    // Platform-specific options
    if (formData.socialPlatform) {
      // COMMENT: Update these links with the actual URLs for each platform
      const platformSpecificOptions = {
        facebook: [
          {
            name: "repostedStory",
            label: "Share Giveaway Post",
            points: 2,
            action: "Share",
            link: "https://www.facebook.com/theteddybearclinic/posts/facebook-share-link", // Replace with actual Facebook share link
          },
          {
            name: "taggedFriends",
            label: "Tag 3 Friends in Comments",
            points: 2,
            action: "Comment",
            link: "https://www.facebook.com/theteddybearclinic/posts/facebook-comment-link", // Replace with actual Facebook post link
          },
        ],
        instagram: [
          {
            name: "repostedStory",
            label: "Repost in Your Story",
            points: 2,
            action: "Repost",
            link: "https://www.instagram.com/p/instagram-story-link", // Replace with actual Instagram post link
          },
          {
            name: "taggedFriends",
            label: "Tag 3 Friends in Comments",
            points: 2,
            action: "Comment",
            link: "https://www.instagram.com/p/instagram-comment-link", // Replace with actual Instagram post link
          },
        ],
        linkedin: [
          {
            name: "repostedStory",
            label: "Share Giveaway Post",
            points: 2,
            action: "Share",
            link: "https://www.linkedin.com/feed/update/linkedin-share-link", // Replace with actual LinkedIn share link
          },
          {
            name: "taggedFriends",
            label: "Tag 3 Connections in Comments",
            points: 2,
            action: "Comment",
            link: "https://www.linkedin.com/feed/update/linkedin-comment-link", // Replace with actual LinkedIn post link
          },
        ],
      };

      return [
        ...baseOptions,
        ...(platformSpecificOptions[
          formData.socialPlatform as keyof typeof platformSpecificOptions
        ] || []),
      ];
    }

    return baseOptions;
  };

  return (
    <div className="giveaway-wrapper">
      <div className="giveaway-container">
        {/* New Header */}
        <div className="page-header">
          <p></p>
        </div>

        {/* Updated Header with new copy */}
        <div className="giveaway-header">
          <h1>Teddy Bear Foundation Giveaway</h1>
          <div className="header-message">
            <p>
              Where giving back meets extraordinary rewards, your R50 entry
              helps fund essential services that provide safety, healing, and
              hope for children in need. Together, we can work towards a South
              Africa free from child abuse.
            </p>
          </div>
        </div>

        {/* Logo Container with updated structure */}
        <div className="logo-container">
          <a
            href={partnerLinks.mdluli}
            target="_blank"
            rel="noopener noreferrer"
            className="logo-link"
          >
            <img
              src="/images/partners/mdluli.svg"
              alt="Mdluli Safari Lodge Logo"
              className="logo"
            />
          </a>
          <a
            href={partnerLinks.tbf}
            target="_blank"
            rel="noopener noreferrer"
            className="logo-link"
          >
            <img
              src="/images/partners/tbf-logo.svg"
              alt="Teddy Bear Foundation Logo"
              className="logo"
            />
          </a>
          <a
            href={partnerLinks.frozen}
            target="_blank"
            rel="noopener noreferrer"
            className="logo-link"
          >
            <img
              src="/images/partners/frozenforyou-logo.svg"
              alt="Frozen For You Logo"
              className="logo"
            />
          </a>
        </div>

        {formStep === 3 ? (
          <div className="form-completion-message">
            <div className="completion-icon">✓</div>
            <h2>Thank You for Your Support!</h2>
            <p>
              Your entry has been successfully completed and payment received.
            </p>
            <p className="entries-confirmation">
              You have secured{" "}
              <span>{calculateEntries(formData.donationAmount)} entries</span>{" "}
              into the giveaway.
            </p>
            <p>We'll contact you if you're the lucky winner!</p>
            <div className="completion-actions">
              <Button
                onClick={() => (window.location.href = "/")}
                variant="primary"
                className="transition hover-scale"
              >
                Return Home
              </Button>
            </div>
          </div>
        ) : (
          <form className="giveaway-form" onSubmit={handleSubmit}>
            {formStep === 2 ? (
              <div className="payment-step">
                <div className="form-success-message">
                  <h2>One More Step</h2>
                  <p>
                    Complete your entry and secure your spot in the giveaway,
                    please make your payment below.
                  </p>
                  <p className="entries-confirmation">
                    You will receive{" "}
                    <span>
                      {calculateEntries(formData.donationAmount)} entries
                    </span>{" "}
                    after payment.
                  </p>
                </div>

                {/* Support & Entries section - Payment Step */}
                <div className="form-section donation-section payment-focused">
                  <h2 className="form-section-title">Complete Your Payment</h2>

                  <div className="donation-instructions">
                    <p>
                      Your donation of{" "}
                      <strong>R{formData.donationAmount.toFixed(2)}</strong>{" "}
                      gives you{" "}
                      <strong>
                        {calculateEntries(formData.donationAmount)} entries
                      </strong>{" "}
                      into the giveaway.
                    </p>
                  </div>

                  <div className="pay-now-container">
                    <PayFastForm
                      amount={formData.donationAmount}
                      entryId={entryId}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Personal Details Section */}
                <div className="form-section">
                  <h2 className="form-section-title">Personal Details</h2>

                  <div className="form-grid">
                    <Input
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your name"
                    />
                    <Input
                      label="Surname"
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                      required
                      placeholder="Enter your surname"
                    />
                    <Input
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+27 XX XXX XXXX"
                    />

                    <div className="social-platform-select">
                      <label>Select Social Media Platform</label>
                      <div className="social-platform-icons">
                        {Object.keys(socialMediaIcons).map((platform) => (
                          <div
                            key={platform}
                            className={`social-platform-icon ${
                              formData.socialPlatform === platform
                                ? "selected"
                                : ""
                            }`}
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                socialPlatform: platform,
                              }))
                            }
                          >
                            {
                              socialMediaIcons[
                                platform as keyof typeof socialMediaIcons
                              ]
                            }
                          </div>
                        ))}
                      </div>
                    </div>

                    <Input
                      label="Social Media Handle"
                      name="socialHandle"
                      value={formData.socialHandle}
                      onChange={handleChange}
                      required
                      placeholder="@yourhandle"
                    />
                  </div>
                </div>

                {/* Social Media Requirements */}
                <div className="form-section">
                  <h2 className="form-section-title">
                    Social Media Requirements
                  </h2>

                  {formData.socialPlatform ? (
                    <div className="social-requirements">
                      {/* Requirement 1: Follow Teddy Bear Foundation - Simplified */}
                      <div
                        className={`social-action-container ${
                          formData.followedTeddy ? "active" : ""
                        }`}
                      >
                        <div className="social-action-label">
                          <span className="platform-icon">
                            {
                              socialMediaIcons[
                                formData.socialPlatform as keyof typeof socialMediaIcons
                              ]
                            }
                          </span>
                          <span>Follow Teddy Bear Foundation</span>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            openSocialLink(
                              formData.socialPlatform as keyof typeof socialMediaIcons
                            )
                          }
                          className={`social-action-button ${
                            formData.followedTeddy ? "completed" : ""
                          }`}
                        >
                          {formData.followedTeddy ? (
                            <>
                              <CheckCircle size={18} />
                              <span>Followed</span>
                            </>
                          ) : (
                            <>
                              {
                                socialMediaIcons[
                                  formData.socialPlatform as keyof typeof socialMediaIcons
                                ]
                              }
                              <span>Follow on {formData.socialPlatform}</span>
                            </>
                          )}
                        </button>

                        <div className="checkbox-group mt-2">
                          <Checkbox
                            label="I confirm I followed Teddy Bear Foundation"
                            name="followedTeddy"
                            checked={formData.followedTeddy}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Requirement 2: Like our post - Simplified */}
                      <div
                        className={`social-action-container ${
                          formData.likedPost ? "active" : ""
                        }`}
                      >
                        <div className="social-action-label">
                          <span className="platform-icon">
                            {
                              socialMediaIcons[
                                formData.socialPlatform as keyof typeof socialMediaIcons
                              ]
                            }
                          </span>
                          <span>Like our post</span>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            window.open(getCurrentPlatformPostLink(), "_blank")
                          }
                          className={`social-action-button ${
                            formData.likedPost ? "completed" : ""
                          }`}
                        >
                          {formData.likedPost ? (
                            <>
                              <CheckCircle size={18} />
                              <span>Liked</span>
                            </>
                          ) : (
                            <>
                              {
                                socialMediaIcons[
                                  formData.socialPlatform as keyof typeof socialMediaIcons
                                ]
                              }
                              <span>View Post</span>
                            </>
                          )}
                        </button>

                        <div className="checkbox-group mt-2">
                          <Checkbox
                            label="I confirm I liked the post"
                            name="likedPost"
                            checked={formData.likedPost}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="social-platform-prompt">
                      <p>
                        Please select a social media platform in the Personal
                        Details section first.
                      </p>
                    </div>
                  )}
                </div>

                {/* Support & Entries section */}
                <div className="form-section donation-section">
                  <h2 className="form-section-title">Support & Entries</h2>

                  <div className="donation-instructions">
                    <p>
                      Every R50 donation gives you 1 entry, plus a bonus entry
                      for every 2 entries purchased.
                    </p>
                  </div>

                  <div className="donation-control">
                    <div className="donation-controls-wrapper">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDonationChange(-50)}
                        className="donation-btn"
                        type="button" // Add this line to prevent form submission
                      >
                        -
                      </Button>
                      <div className="donation-input-wrapper">
                        <span className="currency-prefix">R</span>
                        <Input
                          name="donationAmount"
                          type="number"
                          min={50}
                          value={formData.donationAmount}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDonationChange(50)}
                        className="donation-btn"
                        type="button" // Add this line to prevent form submission
                      >
                        +
                      </Button>
                    </div>
                    <div className="entries-display">
                      {calculateEntries(formData.donationAmount)} Entries
                    </div>
                  </div>
                </div>

                {/* UPDATED: Bonus Entries Section with platform-specific options */}
                <div className="form-section bonus-entries">
                  <h2 className="form-section-title">Bonus Entries</h2>

                  {formData.socialPlatform ? (
                    <div className="bonus-entries-grid">
                      {getBonusEntryOptions().map((option) => (
                        <div
                          key={option.name}
                          className={`bonus-entry-box ${
                            formData[option.name as keyof typeof formData]
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              [option.name]:
                                !prev[option.name as keyof typeof formData],
                            }))
                          }
                        >
                          <div className="bonus-entry-content">
                            <span className="bonus-entry-label">
                              {option.label}
                            </span>
                            <span className="bonus-points">
                              +{option.points}{" "}
                              {option.points === 1 ? "entry" : "entries"}
                            </span>
                          </div>

                          <button
                            type="button"
                            className="bonus-action-button"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent triggering the parent div's onClick
                              window.open(option.link, "_blank");
                            }}
                          >
                            <ExternalLink size={16} />
                            <span>{option.action}</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="social-platform-prompt">
                      <p>
                        Please select a social media platform in the Personal
                        Details section first to see all available bonus entry
                        options.
                      </p>
                    </div>
                  )}
                </div>

                {/* Terms Section */}
                <div className="form-section terms-section">
                  <div className="checkbox-group">
                    <Checkbox
                      label="I accept the Competition Terms & Conditions"
                      name="acceptedTerms"
                      checked={formData.acceptedTerms}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="submit-section">
                  {submitError && (
                    <div className="error-message">{submitError}</div>
                  )}
                  <Button
                    type="submit"
                    variant="secondary"
                    size="lg"
                    className="transition hover-scale"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Entry"}
                  </Button>
                </div>
              </>
            )}
          </form>
        )}

        {/* New Footer */}
        <div className="page-footer">
          <p>© 2025 Teddy Bear Foundation. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default GiveawayLandingPage;

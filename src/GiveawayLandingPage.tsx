"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Button from "./components/ui/button";
import Input from "./components/ui/input";
import Checkbox from "./components/ui/checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCheckCircle,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import PayFastForm from "./components/PayFastForm";
import {
  createEntry,
  calculateEntries as calculateEntryCount,
} from "./lib/entryService";

const GiveawayLandingPage: React.FC<{ initialStep?: number }> = ({
  initialStep = 1,
}) => {
  // State and other code remains the same...
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
  const [formStep, setFormStep] = useState(initialStep); // 1: Form, 2: Payment, 3: Complete
  const [totalEntries, setTotalEntries] = useState(0);

  // Calculate total entries including bonus entries
  useEffect(() => {
    // Base entries from donation
    let entries = calculateEntryCount(formData.donationAmount);

    // Add bonus entries
    if (formData.followedMdluli) entries += 1;
    if (formData.followedFrozen) entries += 1;
    if (formData.repostedStory) entries += 2;
    if (formData.taggedFriends) entries += 2;

    setTotalEntries(entries);
  }, [formData]);

  // Rest of your functions remain the same...
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
        entry_count: totalEntries, // Use total entries including bonus entries
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

  // Social media platform links and other functions remain the same...
  const openSocialLink = (platform: "facebook" | "instagram" | "linkedin") => {
    const links = {
      facebook: "https://www.facebook.com/theteddybearclinic",
      instagram: "https://www.instagram.com/teddybearfoundation/",
      linkedin: "https://www.linkedin.com/company/theteddybearclinic/",
    };
    window.open(links[platform], "_blank");
  };

  const getCurrentPlatformPostLink = () => {
    const postLinks = {
      facebook: "https://www.facebook.com/share/p/1AVbjFM133/",
      instagram:
        "https://www.instagram.com/p/DIL6BoGp8GH/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      linkedin:
        "https://www.linkedin.com/posts/theteddybearclinic_mdluli-safari-lodge-and-the-teddy-bear-foundation-activity-7315353837756694528-M6Fg?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE_PHBABfm9FconNbVv6IrCXpYuIvwoLJ38",
      "": "#",
    };

    return postLinks[formData.socialPlatform as keyof typeof postLinks] || "#";
  };

  const socialMediaIcons = {
    facebook: <FontAwesomeIcon icon={faFacebook} color="#000000" />,
    instagram: <FontAwesomeIcon icon={faInstagram} color="#000000" />,
    linkedin: <FontAwesomeIcon icon={faLinkedin} color="#000000" />,
  };

  const partnerLinks = {
    frozen: "https://frozenforyou.co.za/",
    tbf: "https://teddybearfoundation.org.za/",
    mdluli: "https://www.mdlulisafarilodge.co.za/",
  };

  const getPartnerSocialLinks = (platform: string) => {
    const socialLinks = {
      facebook: {
        teddy: "https://www.facebook.com/theteddybearclinic",
        mdluli: "https://www.facebook.com/MdluliLodge",
        frozen: "https://www.facebook.com/frozenforyousa",
      },
      instagram: {
        teddy: "https://www.instagram.com/teddybearfoundation/",
        mdluli: "https://www.instagram.com/mdlulilodge/",
        frozen: "https://www.instagram.com/frozenforyousa/",
      },
      linkedin: {
        teddy: "https://www.linkedin.com/company/theteddybearclinic/",
        mdluli: "https://www.linkedin.com/company/mdluli-safari-lodge/",
        frozen: "https://www.linkedin.com/company/frozen-for-you/",
      },
      "": {
        teddy: "#",
        mdluli: "#",
        frozen: "#",
      },
    };

    return socialLinks[platform as keyof typeof socialLinks] || socialLinks[""];
  };

  const getBonusEntryOptions = () => {
    const currentPlatform = formData.socialPlatform;
    const partnerSocialLinks = getPartnerSocialLinks(currentPlatform);
    const postLink = getCurrentPlatformPostLink();

    const baseOptions = [
      {
        name: "followedMdluli",
        label: "Follow Mdluli Safari Lodge",
        points: 1,
        action: "Follow",
        link: partnerSocialLinks.mdluli,
      },
      {
        name: "followedFrozen",
        label: "Follow Frozen For You",
        points: 1,
        action: "Follow",
        link: partnerSocialLinks.frozen,
      },
    ];

    if (currentPlatform) {
      const platformSpecificOptions = {
        facebook: [
          {
            name: "repostedStory",
            label: "Share Giveaway Post",
            points: 2,
            action: "Share",
            link: postLink,
          },
          {
            name: "taggedFriends",
            label: "Tag 3 Friends in Comments",
            points: 2,
            action: "Comment",
            link: postLink,
          },
        ],
        instagram: [
          {
            name: "repostedStory",
            label: "Repost in Your Story",
            points: 2,
            action: "Repost",
            link: postLink,
          },
          {
            name: "taggedFriends",
            label: "Tag 3 Friends in Comments",
            points: 2,
            action: "Comment",
            link: postLink,
          },
        ],
        linkedin: [
          {
            name: "repostedStory",
            label: "Share Giveaway Post",
            points: 2,
            action: "Share",
            link: postLink,
          },
          {
            name: "taggedFriends",
            label: "Tag 3 Connections in Comments",
            points: 2,
            action: "Comment",
            link: postLink,
          },
        ],
      };

      return [
        ...baseOptions,
        ...(platformSpecificOptions[
          currentPlatform as keyof typeof platformSpecificOptions
        ] || []),
      ];
    }

    return baseOptions;
  };

  const calculateBonusEntries = () => {
    let bonusEntries = 0;
    if (formData.followedMdluli) bonusEntries += 1;
    if (formData.followedFrozen) bonusEntries += 1;
    if (formData.repostedStory) bonusEntries += 2;
    if (formData.taggedFriends) bonusEntries += 2;
    return bonusEntries;
  };

  return (
    <div className="giveaway-wrapper">
      <div className="giveaway-container">
        {/* Header */}
        <div className="page-header">
          <p></p>
        </div>

        {/* Header Image - Positioned to touch the header */}
        <div className="giveaway-header-image-container">
          <img
            src="/images/assets/header.svg"
            alt="Teddy Bear Foundation Giveaway Header"
            className="giveaway-header-image"
            style={{ width: "100%", display: "block" }}
          />
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
              loading="eager"
              width="140"
              height="140"
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
              loading="eager"
              width="140"
              height="140"
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
              loading="eager"
              width="140"
              height="140"
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
              You have secured <span>{totalEntries} entries</span> into the
              giveaway.
            </p>
            <div className="entries-display-container">
              <div className="total-entries-tab">
                {totalEntries} Total Entries
              </div>
              <div className="entries-breakdown">
                <div>
                  Base entries:{" "}
                  <span>{calculateEntries(formData.donationAmount)}</span>
                </div>
                <div>
                  Bonus entries: <span>{calculateBonusEntries()}</span>
                </div>
              </div>
            </div>
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
                    You will receive <span>{totalEntries} entries</span> after
                    payment.
                  </p>
                  <div className="entries-display-container">
                    <div className="total-entries-tab">
                      {totalEntries} Total Entries
                    </div>
                    <div className="entries-breakdown">
                      <div>
                        Base entries:{" "}
                        <span>{calculateEntries(formData.donationAmount)}</span>
                      </div>
                      <div>
                        Bonus entries: <span>{calculateBonusEntries()}</span>
                      </div>
                    </div>
                  </div>
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
                        {calculateEntries(formData.donationAmount)} base entries
                      </strong>{" "}
                      plus{" "}
                      <strong>{calculateBonusEntries()} bonus entries</strong>{" "}
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
                              <FontAwesomeIcon icon={faCheckCircle} size="sm" />
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
                              <FontAwesomeIcon icon={faCheckCircle} size="sm" />
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
                        type="button"
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
                        type="button"
                      >
                        +
                      </Button>
                    </div>
                    <div className="entries-display-container">
                      <div className="total-entries-tab">
                        {totalEntries} Total Entries
                      </div>
                      <div className="entries-breakdown">
                        <div>
                          Base entries:{" "}
                          <span>
                            {calculateEntries(formData.donationAmount)}
                          </span>
                        </div>
                        <div>
                          Bonus entries: <span>{calculateBonusEntries()}</span>
                        </div>
                      </div>
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
                              e.stopPropagation();
                              window.open(option.link, "_blank");
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faExternalLinkAlt}
                              size="sm"
                            />
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

                {/* Terms Section - Improved spacing and added fine print */}
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
                  <div className="terms-fine-print">
                    Winners announced May 20th.
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

                {/* Footer Image - Positioned to touch the footer */}
                <div
                  className="footer-image-wrapper"
                  style={{
                    width: "100%",
                    backgroundColor: "#eee7e1",
                    padding: 0,
                    margin: 0,
                    overflow: "hidden",
                    lineHeight: 0,
                    position: "relative",
                  }}
                >
                  {/* Create a div with the same background color to fill any gaps */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "#eee7e1",
                      zIndex: 0,
                    }}
                  />

                  {/* Position the image on top */}
                  <img
                    src="/images/assets/footer.svg"
                    alt="Teddy Bear Foundation Giveaway Footer"
                    style={{
                      width: "100%",
                      display: "block",
                      position: "relative",
                      zIndex: 1,
                    }}
                  />
                </div>
              </>
            )}
          </form>
        )}

        {/* Footer */}
        <div className="page-footer">
          <p>© 2025 Teddy Bear Foundation. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default GiveawayLandingPage;

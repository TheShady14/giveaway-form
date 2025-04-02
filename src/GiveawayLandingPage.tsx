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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const calculateEntries = (amount: number) => {
    if (amount < 50) return 0;

    // Every R50 is 1 entry, and every 2nd entry gets a free 3rd
    const baseEntries = Math.floor(amount / 50);
    const bonusEntries = Math.floor(baseEntries / 2);

    return baseEntries + bonusEntries;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  const openSocialLink = (platform: "facebook" | "instagram" | "linkedin") => {
    const links = {
      facebook: "https://www.facebook.com/theteddybearclinic",
      instagram: "https://www.instagram.com/teddybearfoundation/",
      linkedin: "https://www.linkedin.com/company/teddybearclinic",
    };
    window.open(links[platform], "_blank");
  };

  // New function to get the current platform post link
  const getCurrentPlatformPostLink = () => {
    // Placeholder links - replace with actual post links
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
  const partnerLinks = {
    frozen: "https://frozenforyou.co.za/",
    tbf: "https://teddybearfoundation.org.za/",
    mdluli: "https://www.mdlulisafarilodge.co.za/",
  };

  // UPDATED: Bonus entry options with action links
  const bonusEntryOptions = [
    {
      name: "repostedStory",
      label: "Repost Giveaway Story",
      points: 2,
      action: "Repost",
      // REPLACE THIS LINK: This should be the link to the story that needs to be reposted
      link: "https://www.instagram.com/p/giveaway-story-placeholder/",
    },
    {
      name: "taggedFriends",
      label: "Tag 3 Friends in Comments",
      points: 2,
      action: "Comment",
      // REPLACE THIS LINK: This should be the link to the post where users should tag friends
      link: "https://www.instagram.com/p/tag-friends-post-placeholder/",
    },
    {
      name: "followedMdluli",
      label: "Follow Mdluli Safari Lodge",
      points: 1,
      action: "Follow",
      // This link is already set correctly from partnerLinks
      link: partnerLinks.mdluli,
    },
    {
      name: "followedFrozen",
      label: "Follow Frozen For You",
      points: 1,
      action: "Follow",
      // This link is already set correctly from partnerLinks
      link: partnerLinks.frozen,
    },
  ];

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

        <form className="giveaway-form" onSubmit={handleSubmit}>
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
                        formData.socialPlatform === platform ? "selected" : ""
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
            <h2 className="form-section-title">Social Media Requirements</h2>

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
                  Please select a social media platform in the Personal Details
                  section first.
                </p>
              </div>
            )}
          </div>

          {/* Support & Entries section */}
          <div className="form-section donation-section">
            <h2 className="form-section-title">Support & Entries</h2>

            <div className="donation-instructions">
              <p>
                Every R50 donation gives you 1 entry, plus a bonus entry for
                every 2 entries purchased.
              </p>
            </div>

            <div className="donation-control">
              <div className="donation-controls-wrapper">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDonationChange(-50)}
                  className="donation-btn"
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
                >
                  +
                </Button>
              </div>
              <div className="entries-display">
                {calculateEntries(formData.donationAmount)} Entries
              </div>
            </div>

            <div className="pay-now-container">
              <Button
                variant="primary"
                size="lg"
                onClick={() =>
                  window.open("https://example.com/payment", "_blank")
                }
                className="pay-now-btn"
              >
                Pay Now
              </Button>
            </div>
          </div>

          {/* UPDATED: Bonus Entries Section with row format and action buttons */}
          <div className="form-section bonus-entries">
            <h2 className="form-section-title">Bonus Entries</h2>
            <div className="bonus-entries-grid">
              {bonusEntryOptions.map((option) => (
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
                    <span className="bonus-entry-label">{option.label}</span>
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
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              className="transition hover-scale"
            >
              Submit Entry
            </Button>
          </div>
        </form>

        {/* New Footer */}
        <div className="page-footer">
          <p>© 2025 Teddy Bear Foundation. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default GiveawayLandingPage;

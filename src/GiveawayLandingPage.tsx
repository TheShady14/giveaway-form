"use client";

import type React from "react";
import { useState } from "react";
import Button from "./components/ui/button";
import Input from "./components/ui/input";
import Checkbox from "./components/ui/checkbox";
import { Facebook, Instagram, LinkedinIcon } from "lucide-react";

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
      linkedin: "https://www.linkedin.com/company/teddybearfoundation",
    };
    window.open(links[platform], "_blank");
  };

  const socialMediaIcons = {
    facebook: <Facebook color="#000000" />,
    instagram: <Instagram color="#000000" />,
    linkedin: <LinkedinIcon color="#000000" />,
  };

  const bonusEntryOptions = [
    {
      name: "repostedStory",
      label: "Reposted Giveaway Story",
      points: 1,
    },
    {
      name: "taggedFriends",
      label: "Tagged 3 Friends",
      points: 2,
    },
    {
      name: "followedMdluli",
      label: "Followed Mdluli Lodge",
      points: 1,
    },
    {
      name: "followedFrozen",
      label: "Followed Frozen for You",
      points: 1,
    },
  ];

  return (
    <div className="giveaway-wrapper">
      <div className="giveaway-container">
        {/* New Header */}
        <div className="page-header">
          <p></p>
        </div>

        {/* Header remains the same */}
        <div className="giveaway-header">
          <h1>Teddy Bear Foundation Giveaway</h1>
          <p>Enter for a chance to win and support a great cause</p>
        </div>

        <form className="giveaway-form" onSubmit={handleSubmit}>
          {/* Logo Container */}
          <div className="logo-container">
            <img
              src="/images/partners/tbf-logo.svg"
              alt="Teddy Bear Foundation Logo"
              className="logo"
            />
            <img
              src="/images/partners/frozenforyou-logo.svg"
              alt="Frozen For You Logo"
              className="logo"
            />
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
            <div className="social-requirements">
              <div className="requirement-item">
                <Checkbox
                  label="1. Follow the Teddy Bear Foundation"
                  name="followedTeddy"
                  checked={formData.followedTeddy}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="requirement-item">
                <Checkbox
                  label="2. Like our Post"
                  name="likedPost"
                  checked={formData.likedPost}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="social-buttons">
              {Object.keys(socialMediaIcons).map((platform) => (
                <Button
                  key={platform}
                  variant="primary"
                  size="sm"
                  onClick={() =>
                    openSocialLink(platform as keyof typeof socialMediaIcons)
                  }
                  className="social-btn"
                >
                  {socialMediaIcons[platform as keyof typeof socialMediaIcons]}
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Donation Section */}
          <div className="form-section donation-section">
            <h2 className="form-section-title">Support & Entries</h2>
            <p className="donation-section-description">
              A minimum donation of R50,00 is required to complete your entry
            </p>
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
            <p className="donation-tiers">
              <span>R50: 1 entry</span>
              <span>R100: 3 entries (1 free!)</span>
              <span>R150: 4 entries</span>
              <span>R200: 6 entries (2 free!)</span>
              <span>R250: 7 entries</span>
            </p>
            <div className="donation-explanation">
              <p>For every 2 entries you purchase, you get a 3rd entry free!</p>
              <p>
                Example: R100 = 2 paid entries + 1 free entry = 3 total entries
              </p>
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

          {/* Bonus Entries Section */}
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
                  {option.label}
                  <span className="bonus-points">+{option.points} entry</span>
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

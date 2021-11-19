/** @jsx jsx */ /** @jsxRuntime classic */

import { jsx, Container, Box, Flex } from "theme-ui";
import { keyframes } from "@emotion/core";
import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import PriceCard from "../components/price-card";
import ButtonGroup from "../components/button-group";
import SectionHeader from "../components/section-header";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";

const packages = {
  monthly: [
    {
      id: 1,
      name: "Chiller Shiller",
      description: "For small-time NFT enthusiasts",
      buttonText: "Join now",
      priceWithUnit: "FREE",
      type: "",
      points: [
        {
          id: -1,
          icon: <IoIosCheckmarkCircle />,
          text: "Computer generated link",
          isAvailable: true
        },
        {
          id: 0,
          icon: <IoIosCheckmarkCircle />,
          text: "OpenSea integration",
          isAvailable: true
        },
        {
          id: 1,
          icon: <IoIosCheckmarkCircle />,
          text: "Limited customization palette",
          isAvailable: true
        },
        {
          id: 2,
          icon: <IoIosCheckmarkCircle />,
          text: "Only 1 room for each account",
          isAvailable: true
        },
        {
          id: 3,
          icon: <IoIosCheckmarkCircle />,
          text: "No video item (.mp4, .wav, etc.) support",
          isAvailable: true
        },
        {
          id: 4,
          icon: <IoIosCheckmarkCircle />,
          text: "No credit card required",
          isAvailable: true
        }
      ]
    },
    {
      id: 2,
      header: "FREE 7-day trial",
      name: "Killer Shiller",
      description: "For those who are in it to win it",
      priceWithUnit: "$9",
      buttonText: "Join now",
      type: "monthly",
      points: [
        {
          id: -1,
          icon: <IoIosCheckmarkCircle />,
          text: "Personalized link",
          isAvailable: true
        },
        {
          id: -1,
          icon: <IoIosCheckmarkCircle />,
          text: "'License to Shill' NFT card on sign-up",
          isAvailable: true
        },
        {
          id: -1,
          icon: <IoIosCheckmarkCircle />,
          text: "Instant item verification",
          isAvailable: true
        },
        {
          id: 0,
          icon: <IoIosCheckmarkCircle />,
          text: "OpenSea integration",
          isAvailable: true
        },
        {
          id: 1,
          icon: <IoIosCheckmarkCircle />,
          text: "Full customization palette",
          isAvailable: true
        },
        {
          id: 2,
          icon: <IoIosCheckmarkCircle />,
          text: "Up to 69 rooms for each account",
          isAvailable: true
        },
        {
          id: 3,
          icon: <IoIosCheckmarkCircle />,
          text: "Video item support",
          isAvailable: true
        }
      ]
    },
    {
      id: 3,
      headerIcon: <IoIosCheckmarkCircle />,
      name: "Iller Shiller",
      description: "For the Shillers who have either a Cryptopunk or an Ape",
      priceWithUnit: "FREE",
      buttonText: "Contact for verification",
      type: "",
      points: [
        {
          id: 1,
          icon: <IoIosCheckmarkCircle />,
          text: "Drag & Drop Builder",
          isAvailable: true
        },
        {
          id: 2,
          icon: <IoIosCheckmarkCircle />,
          text: "1,000's of Templates",
          isAvailable: true
        },
        {
          id: 3,
          icon: <IoIosCheckmarkCircle />,
          text: "Blog Support Tools",
          isAvailable: true
        },
        {
          id: 4,
          icon: <IoIosCheckmarkCircle />,
          text: "eCommerce Store ",
          isAvailable: true
        }
      ]
    }
  ],
  annual: [
    {
      id: 1,
      name: "Chiller Shiller",
      description: "For small-time NFT enthusiasts",
      buttonText: "Join now",
      priceWithUnit: "FREE",
      type: "",
      points: [
        {
          id: -1,
          icon: <IoIosCheckmarkCircle />,
          text: "Computer generated link",
          isAvailable: true
        },
        {
          id: 0,
          icon: <IoIosCheckmarkCircle />,
          text: "OpenSea integration",
          isAvailable: true
        },
        {
          id: 1,
          icon: <IoIosCheckmarkCircle />,
          text: "Limited customization palette",
          isAvailable: true
        },
        {
          id: 2,
          icon: <IoIosCheckmarkCircle />,
          text: "Only 1 room for each account",
          isAvailable: true
        },
        {
          id: 3,
          icon: <IoIosCheckmarkCircle />,
          text: "No video item (.mp4, .wav, etc.) support",
          isAvailable: true
        },
        {
          id: 4,
          icon: <IoIosCheckmarkCircle />,
          text: "No credit card required",
          isAvailable: true
        }
      ]
    },
    {
      id: 2,
      header: "FREE 7-day trial",
      name: "Killer Shiller",
      description: "For those who are in it to win it",
      priceWithUnit: "$90",
      type: "annual",
      buttonText: "Join now",
      points: [
        {
          id: -1,
          icon: <IoIosCheckmarkCircle />,
          text: "Personalized link",
          isAvailable: true
        },
        {
          id: -1,
          icon: <IoIosCheckmarkCircle />,
          text: "'License to Shill' NFT card on sign-up",
          isAvailable: true
        },
        {
          id: -1,
          icon: <IoIosCheckmarkCircle />,
          text: "Instant item verification",
          isAvailable: true
        },
        {
          id: 0,
          icon: <IoIosCheckmarkCircle />,
          text: "OpenSea integration",
          isAvailable: true
        },
        {
          id: 1,
          icon: <IoIosCheckmarkCircle />,
          text: "Full customization palette",
          isAvailable: true
        },
        {
          id: 2,
          icon: <IoIosCheckmarkCircle />,
          text: "Up to 69 rooms for each account",
          isAvailable: true
        },
        {
          id: 3,
          icon: <IoIosCheckmarkCircle />,
          text: "Video item support",
          isAvailable: true
        }
      ]
    },
    {
      id: 3,
      headerIcon: <IoIosCheckmarkCircle />,
      name: "Iller Shiller",
      description: "For the Shillers who have either a Cryptopunk or an Ape",
      priceWithUnit: "FREE",
      type: "",
      buttonText: "Contact for verification",
      points: [
        {
          id: 1,
          icon: <IoIosCheckmarkCircle />,
          text: "Drag & Drop Builder",
          isAvailable: true
        },
        {
          id: 2,
          icon: <IoIosCheckmarkCircle />,
          text: "1,000's of Templates",
          isAvailable: true
        },
        {
          id: 3,
          icon: <IoIosCheckmarkCircle />,
          text: "Blog Support Tools",
          isAvailable: true
        },
        {
          id: 4,
          icon: <IoIosCheckmarkCircle />,
          text: "eCommerce Store ",
          isAvailable: true
        }
      ]
    }
  ]
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    draggable: false
  },
  tablet: {
    breakpoint: { max: 1023, min: 640 },
    items: 2,
    draggable: true
  },
  mobile: {
    breakpoint: { max: 639, min: 0 },
    items: 1,
    draggable: true
  }
};

export default function Package() {
  const { monthly, annual } = packages;
  const [state, setState] = useState({
    active: "monthly",
    pricingPlan: monthly
  });

  const handlePricingPlan = (plan) => {
    if (plan === "annual") {
      setState({
        ...state,
        active: "annual",
        pricingPlan: annual
      });
    } else {
      setState({
        ...state,
        active: "monthly",
        pricingPlan: monthly
      });
    }
  };

  const sliderParams = {
    additionalTransfrom: 0,
    arrows: false,
    autoPlaySpeed: 3000,
    centerMode: false,
    className: "",
    slidesToSlide: 1,
    items: 3,
    containerClass: "carousel-container",
    customButtonGroup: <ButtonGroup />,
    dotListClass: "",
    focusOnSelect: false,
    infinite: false,
    keyBoardControl: false,
    itemClass: "",
    minimumTouchDrag: 80,
    renderButtonGroupOutside: true,
    renderDotsOutside: false,
    responsive: responsive,
    showDots: false,
    sliderClass: ""
  };

  return (
    <section id="pricing" sx={{ variant: "section.pricing" }}>
      <Container>
        <SectionHeader
          slogan="Pricing Plan"
          title="Choose your pricing policy"
        />
        <Flex sx={styles.buttonGroup}>
          <Box sx={styles.buttonGroupInner}>
            <button
              className={state.active === "monthly" ? "active" : ""}
              type="button"
              aria-label="Monthly"
              onClick={() => handlePricingPlan("monthly")}
            >
              Monthly Plan
            </button>
            <button
              className={state.active === "annual" ? "active" : ""}
              type="button"
              aria-label="Annual"
              onClick={() => handlePricingPlan("annual")}
            >
              Annual Plan
            </button>
          </Box>
        </Flex>
        <Box sx={styles.pricingWrapper} className="pricing__wrapper">
          <Carousel {...sliderParams}>
            {state.pricingPlan.map((packageData) => (
              <Box
                sx={styles.pricingItem}
                key={`${state.active}-card--key${packageData.id}`}
              >
                <PriceCard data={packageData} />
              </Box>
            ))}
          </Carousel>
        </Box>
      </Container>
    </section>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const fadeIn2 = keyframes`
  from {
    transform: translateY(50%);
    opacity: 0;
  }
  to {
		transform: translateY(0);
    opacity: 1;
  }
`;
const styles = {
  pricingWrapper: {
    mb: "-40px",
    mt: "-40px",
    mx: -3,
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    "&.pricing__wrapper .package__card": {
      ".package__header": {
        animation: `${fadeIn} 0.8s ease-in`
      },
      "ul > li": {
        animation: `${fadeIn2} 0.7s ease-in`
      },
      ".package__price": {
        animation: `${fadeIn2} 0.9s ease-in`
      },
      button: {
        animation: `${fadeIn2} 1s ease-in`
      }
    },
    ".carousel-container": {
      width: "100%",
      "> ul > li ": {
        display: "flex"
      }
    },
    ".button__group": {
      display: ["flex", null, null, null, "none"],
      mb: [4, null, null, null, 0]
    }
  },
  pricingItem: {
    mx: 3,
    display: "flex",
    flexShrink: 0,
    flex: "1 1 auto"
  },
  buttonGroup: {
    justifyContent: "center",
    mb: "7",
    mt: ["-15px", "-35px"],
    position: "relative",
    zIndex: 2
  },
  buttonGroupInner: {
    backgroundColor: "rgba(41, 41, 42, 0.07)",
    display: "flex",
    padding: "7px",
    margin: "0 auto",
    borderRadius: "5px",
    button: {
      border: 0,
      padding: ["15px 20px", "15px 27px"],
      borderRadius: "5px",
      color: "text",
      fontSize: [1, 2],
      lineHeight: 1.2,
      fontWeight: 500,
      backgroundColor: "transparent",
      cursor: "pointer",
      fontFamily: "body",
      letterSpacing: "-0.24px",
      transition: "all 0.3s",
      "&.active": {
        color: "#0f2137",
        backgroundColor: "#ffffff",
        boxShadow: "0 3px 4px rgba(38, 78, 118, 0.1)"
      },
      "&:focus": {
        outline: 0
      }
    }
  }
};

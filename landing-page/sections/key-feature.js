/** @jsx jsx */
import { jsx } from "theme-ui";
import { Container, Grid } from "theme-ui";
import SectionHeader from "../components/section-header";
import FeatureCardColumn from "components/feature-card-column.js";
import Performance from "assets/key-feature/performance.svg";
import Partnership from "assets/key-feature/partnership.svg";
import Subscription from "assets/key-feature/subscription.svg";
import Support from "assets/key-feature/support.svg";

const data = [
  {
    id: 1,
    imgSrc: Performance,
    altText: "Wallet integration",
    title: "Wallet integration",
    text:
      "You just let us know what your wallet is, and we'll take care of the rest."
  },
  {
    id: 2,
    imgSrc: Partnership,
    altText: "Custom link",
    title: "Custom link",
    text: "Pick a link that reflects your own style our way."
  },
  {
    id: 3,
    imgSrc: Subscription,
    altText: "Fully customizable",
    title: "Fully customizable",
    text:
      "Our way is to let you have yours. Fully-customizable, now and always."
  },
  {
    id: 4,
    imgSrc: Subscription,
    altText: "Twitter integration",
    title: "Twitter integration",
    text:
      "Update your bio and shill your way into a hit Tweet, all without leaving your studio."
  }
];

export default function KeyFeature() {
  return (
    <section sx={{ variant: "section.keyFeature" }} id="feature">
      <Container>
        <SectionHeader
          slogan="Welcome to the Verse"
          title="Future of art display"
        />

        <Grid sx={styles.grid}>
          {data.map((item) => (
            <FeatureCardColumn
              key={item.id}
              src={item.imgSrc}
              alt={item.altText}
              title={item.title}
              text={item.text}
            />
          ))}
        </Grid>
      </Container>
    </section>
  );
}

const styles = {
  grid: {
    width: ["100%", "80%", "100%"],
    mx: "auto",
    gridGap: [
      "35px 0",
      null,
      "40px 40px",
      "50px 60px",
      "30px",
      "50px 40px",
      "55px 90px"
    ],
    gridTemplateColumns: [
      "repeat(1,1fr)",
      null,
      "repeat(2,1fr)",
      null,
      "repeat(4,1fr)"
    ]
  }
};

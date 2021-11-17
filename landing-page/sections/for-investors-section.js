/** @jsx jsx */ /** @jsxRuntime classic */

import { jsx } from "theme-ui";
import { Container, Box, Text, Button } from "theme-ui";
import SectionHeader from "../components/section-header";
import PostCard from "../components/post-card.js";
import ButtonGroup from "../components/button-group";
import Carousel from "react-multi-carousel";
import PostThumb1 from "../assets/blog/1.jpg";
import PostThumb2 from "../assets/blog/2.jpg";
import PostThumb3 from "../assets/blog/3.jpg";

const data = [
  {
    id: 1,
    imgSrc: PostThumb1,
    altText: "Marketing",
    postLink: "#",
    title: "Product Marketing: Monopoly Market",
    authorName: "Cali Cartel",
    date: "Oct 20, 2020"
  },
  {
    id: 2,
    imgSrc: PostThumb2,
    altText: "Creative",
    postLink: "#",
    title: "Product Marketing: Creative Market",
    authorName: "James Carter",
    date: "Oct 20, 2020"
  },
  {
    id: 3,
    imgSrc: PostThumb3,
    altText: "Startup",
    postLink: "#",
    title: "Product Marketing: Startup Product Sales",
    authorName: "Aston Aagar",
    date: "Oct 20, 2020"
  },
  {
    id: 4,
    imgSrc: PostThumb2,
    altText: "Creative",
    postLink: "#",
    title: "Product Marketing: Creative Market",
    authorName: "James Carter",
    date: "Oct 20, 2020"
  }
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1310 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  laptop: {
    breakpoint: { max: 1310, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 639, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

export default function ForInvestorsSection() {
  return (
    <section id="investors" sx={{ variant: "section.news" }}>
      <Container>
        <SectionHeader
          slogan="for investors"
          title="Thinking about giving us some funding? Shoot us an email and set up
          a meeting."
        />

        <Box sx={styles.carouselWrapper}>
          <div
            style={{ display: "block", width: "fit-content", margin: "auto" }}
          >
            <Button
              onClick={() => {
                window.open(
                  "mailto:gegri@g.harvard.edu?subject=Interested in Shil.me"
                );
              }}
              style={{
                width: "fit-content !important",
                margin: "auto !important"
              }}
            >
              Email us
            </Button>
          </div>
        </Box>
      </Container>
    </section>
  );
}

const styles = {
  carouselWrapper: {
    ".carousel-container": {
      mx: -3,
      minHeight: "inherit",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }
};

import theme from "../landing-page/theme";
import SEO from "../landing-page/components/seo";
import Layout from "../landing-page/components/layout";
import Banner from "../landing-page/sections/banner";
import KeyFeature from "../landing-page/sections/key-feature";
import ServiceSection from "../landing-page/sections/service-section";
import Feature from "../landing-page/sections/feature";
import CoreFeature from "../landing-page/sections/core-feature";
import WorkFlow from "../landing-page/sections/workflow";
import Package from "../landing-page/sections/package";
import TeamSection from "../landing-page/sections/team-section";
import TestimonialCard from "../landing-page/sections/testimonial";
import BlogSection from "../landing-page/sections/blog-section";
import Subscribe from "../landing-page/sections/subscribe";
import ForInvestorsSection from "../landing-page/sections/for-investors-section";
import React from "react";
import { ThemeProvider } from "theme-ui";
import { StickyProvider } from "../landing-page/contexts/app/app.provider";

export default function IndexPage() {
  return (
    <ThemeProvider theme={theme}>
      <StickyProvider>
        <Layout>
          <SEO title="Shil.me" />
          <Banner />
          <KeyFeature />
          <ServiceSection />
          <Feature />
          <CoreFeature />
          <WorkFlow />
          <Package />
          <TeamSection />
          <TestimonialCard />
          <BlogSection />
          <ForInvestorsSection />
          {false && <Subscribe />}
        </Layout>
      </StickyProvider>
    </ThemeProvider>
  );
}

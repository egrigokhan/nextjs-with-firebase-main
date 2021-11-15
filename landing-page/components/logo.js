/** @jsx jsx */
import { jsx, Image, Heading } from "theme-ui";
import { Link } from "components/link";

export default function Logo({ src, ...rest }) {
  return (
    <Link
      path="/"
      sx={{
        variant: "links.logo",
        display: "flex",
        cursor: "pointer",
        textDecoration: "none",
        mr: 15
      }}
      {...rest}
    >
      <p
        style={{
          fontFamily: "DM Serif Display",
          textDecoration: "none !important",
          color: "black",
          fontSize: "20px"
        }}
      >
        Shil.me
      </p>
    </Link>
  );
}

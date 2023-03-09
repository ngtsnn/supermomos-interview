import React, { FC } from "react";
import Link from "next/link";
import { HoverDropdown } from "@components/dropdown/HoverDropdown";

const navLinks = [
  {
    name: "Socials",
    link: "/socials",
    children: null,
  },
  {
    name: "Socials",
    link: "/socials",
    children: null,
  },
  {
    name: "Past Socials",
    link: "/past-socials",
    children: null,
  },
  {
    name: "Clubs",
    link: "/clubs",
    children: [
      {
        name: "Club A",
        link: "/clubs/a",
      },
      {
        name: "Club B",
        link: "/clubs/b",
      },
    ],
  },
  {
    name: "Contact",
    link: "/contact",
    children: null,
  },
];

export const NavBar: FC = () => {
  return (
    <div className="flex justify-between items-center w-112">
      {navLinks.map((link) => (
        <div key={link.link}>
          {link.children && link.children.length > 0 ? (
            <HoverDropdown
              options={link.children.map((nav) => ({
                data: nav,
                value: nav.name,
              }))}
              value={{
                data: link,
                value: link.name,
              }}
            />
          ) : (
            <Link href={link.link} key={link.link}>
              {link.name}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

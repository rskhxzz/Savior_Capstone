"use client";

import { Footer } from "flowbite-react";

export function Footers() {
  return (
    <Footer container className="absolute mt-auto">
      <Footer.Copyright by="Savior" year={2024} />
      <Footer.LinkGroup>
        <Footer.Link>Tentang</Footer.Link>
        <Footer.Link >Media Sosial</Footer.Link>
        <Footer.Link >Hubungi Kami</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}
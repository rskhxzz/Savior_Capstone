"use client";

import { Footer } from "flowbite-react";

export function Footers() {
  return (
    <Footer container className="absolute mt-auto">
      <Footer.Copyright href="#" by="Savior" year={2024} />
      <Footer.LinkGroup>
        <Footer.Link href="#">Tentang</Footer.Link>
        <Footer.Link href="#">Media Sosial</Footer.Link>
        <Footer.Link href="#">Hubungi Kami</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}
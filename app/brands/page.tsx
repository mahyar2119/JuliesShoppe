"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import BrandsSection from "@/components/BrandsSection";
import Footer from "@/components/Footer";

export default function BrandsPage() {
  const [search, setSearch] = useState("");
  return (
    <main style={{ minHeight: "100vh" }}>
      <Navbar searchValue={search} onSearch={setSearch} activePage="brands" />
      <div className="pt-16"><BrandsSection search={search} /></div>
      <Footer />
    </main>
  );
}

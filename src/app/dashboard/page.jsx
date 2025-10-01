"use client";
import EventDetails from "@/components/dashboard/EventDetails";
import Home from "@/components/dashboard/Home";
import InnerCircleTable from "@/components/dashboard/JoinCircle";
import MarketingAssets from "@/components/dashboard/MarketingAssets";
import { Sidebar } from "@/components/dashboard/Sidebar";
import SponsorshipDecks from "@/components/dashboard/SponsorshipDecks";
import VipConcerige from "@/components/dashboard/VipConcerige";
import React, { useState } from "react";

const Page = () => {
  const [activeItem, setActiveItem] = useState("Home");

  const renderContent = () => {
    switch (activeItem) {
      case "Home":
        return <Home />;
      case "Event details":
        return <EventDetails />;
      case "Sponsorship decks":
        return <SponsorshipDecks />;
      case "Marketing assets":
        return <MarketingAssets />;
      case "VIP concierge":
        return <VipConcerige />;
      case "Join Inner Circle":
        return <InnerCircleTable />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex h-screen bg-white-100">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="mt-12 lg:mt-6 lg:mx-6 rounded-2xl flex-1 md:bg-[#F4F4F4] overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Page;

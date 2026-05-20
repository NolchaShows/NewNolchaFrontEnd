"use client";

import { useCallback, useEffect, useState } from "react";
import LetsChatModal from "@/components/Modals/LetsChatModal";
import { subscribeToLetsChatOpenEvent } from "@/lib/letsChatModal";

export default function LetsChatModalHost() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    return subscribeToLetsChatOpenEvent(() => {
      setIsOpen(true);
    });
  }, []);

  return <LetsChatModal isOpen={isOpen} onClose={handleClose} />;
}

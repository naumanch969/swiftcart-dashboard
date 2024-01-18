"use client"

import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

// This is only be used to trigger the store modal
export default function SetupPage() {
  const isOpen = useStoreModal(state => state.isOpen)
  const onOpen = useStoreModal(state => state.onOpen)

  useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])
  // to decide to trigger store-modal which is being passed in RootLayout
  return null
}
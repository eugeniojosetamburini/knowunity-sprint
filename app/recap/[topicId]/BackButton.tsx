"use client";

import { useRouter } from "next/navigation";

import { ButtonIcon } from "@/stories/components/ButtonIcon/ButtonIcon";
import { ArrowLeftIcon } from "./icons";

export function BackButton() {
  const router = useRouter();

  return (
    <ButtonIcon
      variant="tertiary"
      size="s"
      icon={<ArrowLeftIcon />}
      aria-label="Back to due list"
      onClick={() => router.push("/due-list")}
    />
  );
}

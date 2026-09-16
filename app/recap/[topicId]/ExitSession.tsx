"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { BottomSheet } from "@/stories/components/BottomSheet/BottomSheet";
import { ButtonGroup } from "@/stories/components/ButtonGroup/ButtonGroup";
import { TextBlock } from "@/stories/components/TextBlock/TextBlock";
import type { AppBarMenuItem } from "@/stories/components/AppBar/AppBar";

// Exit-session confirm (SPEC.md #15) and the ⋯ menu that reaches it (#16).
//
// "Back steps, ⋯ ends" — the back arrow walks back one screen with no
// confirmation; ⋯ carries the exit, which asks before throwing the session
// away. Confirming goes all the way to **Home**, and the abandoned topic
// returns to the due list untouched, as though never started (which costs
// nothing to honour here: no progress is stored anywhere).
//
// **No Figma frame covers either the menu or the sheet.** The composition
// is design-system.md's slot 5 as `BottomSheet` documents it, filled with
// what Figma's own `buttonGroup` description says fills a sheet's action
// slot. Everything decided rather than read is listed in SPEC.md #15.
//
// Screen-local and shared by the four mid-session screens (prompt,
// processing, result, hint), like `MicTrigger` and `TypeTrigger` before it:
// the behaviour is identical on each, and four copies would drift. The
// entry and Summary screens deliberately don't use it — nothing has started
// on one, and the session is already over on the other.
//
// `useExitSession` returns the bar's menu items and the sheet's props so a
// screen wires it in two lines and can't get the wiring subtly different
// from its neighbours.

export function useExitSession(termsLeft: number) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const menuItems: AppBarMenuItem[] = [
    { label: "End session", tone: "destructive", onSelect: () => setOpen(true) },
  ];

  return {
    menuItems,
    sheetProps: {
      open,
      termsLeft,
      onDismiss: () => setOpen(false),
      // Home, not the due list: the student is leaving the flow, not
      // stepping back through it (SPEC.md, "Back steps, ⋯ ends").
      onConfirm: () => router.push("/"),
    },
  };
}

export function ExitSessionSheet({
  open,
  termsLeft,
  onDismiss,
  onConfirm,
}: {
  open: boolean;
  termsLeft: number;
  onDismiss: () => void;
  onConfirm: () => void;
}) {
  // "X terms left" counts the terms not yet finished, **including the one
  // being answered** — leaving mid-term abandons that one too, so counting
  // it out would understate what the student is walking away from
  // (decided 2026-09-15).
  const countText = termsLeft === 1 ? "1 term left" : `${termsLeft} terms left`;

  return (
    <BottomSheet open={open} onDismiss={onDismiss} aria-label="End session now?">
      <TextBlock
        variant="M"
        title="End session now?"
        caption={`${countText}. They stay due, so you can pick this up again later.`}
      />
      <ButtonGroup
        variant="vertical"
        size="l"
        // Abandoning the session is an abandon action, so the leading
        // button is Destructive rather than Primary (design-system.md).
        // The sheet therefore carries no Primary at all, which that rule
        // explicitly allows — Destructive is never paired with one.
        tone="destructive"
        primaryLabel="End session"
        onPrimary={onConfirm}
        secondaryLabel="Keep going"
        onSecondary={onDismiss}
      />
    </BottomSheet>
  );
}

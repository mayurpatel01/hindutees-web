"use client";

import { useState } from "react";

type Props = {
  title: string;
  /** Full product page URL — pass from the server component */
  url: string;
  /** Optional product image URL for Pinterest */
  imageUrl?: string | null;
};

type Channel = "copy" | "whatsapp" | "facebook" | "pinterest" | "x";

const CHANNELS: { id: Channel; label: string; icon: string }[] = [
  { id: "copy",      label: "Copy link",  icon: "🔗" },
  { id: "whatsapp",  label: "WhatsApp",   icon: "💬" },
  { id: "facebook",  label: "Facebook",   icon: "f"  },
  { id: "pinterest", label: "Pinterest",  icon: "P"  },
  { id: "x",         label: "X",          icon: "𝕏"  },
];

function buildShareUrl(channel: Channel, url: string, title: string, imageUrl?: string | null): string {
  const enc = encodeURIComponent;
  switch (channel) {
    case "whatsapp":
      return `https://wa.me/?text=${enc(title + " " + url)}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`;
    case "pinterest":
      return `https://pinterest.com/pin/create/button/?url=${enc(url)}&description=${enc(title)}${imageUrl ? `&media=${enc(imageUrl)}` : ""}`;
    case "x":
      return `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`;
    default:
      return "";
  }
}

export default function ShareButton({ title, url, imageUrl }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleChannel(channel: Channel) {
    if (channel === "copy") {
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        // Fallback: select a hidden input
        const el = document.createElement("input");
        el.value = url;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      setCopied(true);
      setTimeout(() => { setCopied(false); setOpen(false); }, 1500);
      return;
    }
    const shareUrl = buildShareUrl(channel, url, title, imageUrl);
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=500");
    setOpen(false);
  }

  // Use native Web Share API on mobile if available
  async function handleNativeShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // User dismissed — fall through to panel
      }
    }
    setOpen(!open);
  }

  return (
    <div className="relative">
      <button
        onClick={handleNativeShare}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition"
        style={{
          borderColor: "var(--color-border-strong)",
          color: "var(--color-text-muted)",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text-dark)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-primary)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.color = "var(--color-text-muted)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-border-strong)";
        }}
        aria-label="Share this product"
      >
        <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="15" cy="4" r="2.5" />
          <circle cx="5"  cy="10" r="2.5" />
          <circle cx="15" cy="16" r="2.5" />
          <line x1="7.4"  y1="8.9"  x2="12.6" y2="5.1" />
          <line x1="7.4"  y1="11.1" x2="12.6" y2="14.9" />
        </svg>
        Share
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          {/* Popover */}
          <div
            className="absolute left-0 top-full mt-2 z-50 rounded-xl border shadow-xl overflow-hidden"
            style={{
              minWidth: "180px",
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border-strong)",
            }}
          >
            {CHANNELS.map(ch => (
              <button
                key={ch.id}
                onClick={() => handleChannel(ch.id)}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-left transition"
                style={{ color: "var(--color-text-dark)" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--color-surface-2)")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <span className="w-5 text-center text-base leading-none select-none">{ch.icon}</span>
                {ch.id === "copy" && copied ? "✓ Copied!" : ch.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

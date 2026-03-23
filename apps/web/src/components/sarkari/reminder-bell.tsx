"use client";

import { cn } from "@/lib/utils";

interface ReminderBellProps {
  count?: number;
  reminders?: Array<{
    id: string;
    title: string;
    type: string;
    dueDate: string;
    isRead: boolean;
  }>;
  className?: string;
}

const typeIcons: Record<string, string> = {
  deadline: "⏰",
  document: "📄",
  new_scheme: "🆕",
  installment: "💰",
  approval: "✅",
};

export default function ReminderBell({
  count = 0,
  reminders = [],
  className,
}: ReminderBellProps) {
  return (
    <div className={cn("relative group", className)}>
      <button className="relative p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Reminders">
        <svg
          className="w-5 h-5 text-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {count > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-[var(--sarkari-saffron)] rounded-full">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-1 w-72 rounded-xl border border-border bg-card shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-3 border-b border-border">
          <h4 className="text-sm font-semibold text-hindi">
            🔔 अनुस्मारक
          </h4>
        </div>
        <div className="max-h-64 overflow-y-auto">
          {reminders.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground text-hindi">
              कोई नया अनुस्मारक नहीं
            </div>
          ) : (
            reminders.slice(0, 5).map((r) => (
              <div
                key={r.id}
                className={cn(
                  "flex items-start gap-2 px-3 py-2.5 hover:bg-muted transition-colors border-b border-border last:border-0",
                  !r.isRead && "bg-[var(--sarkari-saffron)]/5"
                )}
              >
                <span className="text-base mt-0.5">
                  {typeIcons[r.type] || "🔔"}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium line-clamp-2">{r.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {r.dueDate}
                  </p>
                </div>
                {!r.isRead && (
                  <span className="w-2 h-2 rounded-full bg-[var(--sarkari-saffron)] flex-shrink-0 mt-1.5" />
                )}
              </div>
            ))
          )}
        </div>
        <div className="p-2 border-t border-border">
          <button className="w-full text-center text-xs font-medium text-[var(--sarkari-navy)] hover:text-[var(--sarkari-saffron)] transition-colors py-1">
            सभी देखें →
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";

interface DocumentItem {
  name: string;
  nameEnglish?: string;
  hasDocument: boolean;
  whereToGet?: string;
  timeTaken?: string;
  cost?: string;
}

interface DocumentChecklistProps {
  documents: DocumentItem[];
  className?: string;
}

export default function DocumentChecklist({
  documents,
  className,
}: DocumentChecklistProps) {
  const ready = documents.filter((d) => d.hasDocument).length;
  const total = documents.length;

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-hindi">
          📄 ज़रूरी दस्तावेज़
        </h4>
        <span className="text-xs font-medium text-[var(--sarkari-green)]">
          {ready}/{total} तैयार
        </span>
      </div>

      <div className="space-y-2">
        {documents.map((doc, index) => (
          <div
            key={index}
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg border transition-colors",
              doc.hasDocument
                ? "border-green-200 bg-green-50/50"
                : "border-orange-200 bg-orange-50/50"
            )}
          >
            <span className="text-base mt-0.5 flex-shrink-0">
              {doc.hasDocument ? "✅" : "❌"}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-hindi">{doc.name}</p>
              {doc.nameEnglish && (
                <p className="text-[11px] text-muted-foreground">
                  {doc.nameEnglish}
                </p>
              )}
              {!doc.hasDocument && doc.whereToGet && (
                <div className="mt-1.5 space-y-0.5">
                  <p className="text-[11px] text-muted-foreground">
                    <span className="text-hindi font-medium">कहां से:</span>{" "}
                    {doc.whereToGet}
                  </p>
                  {doc.timeTaken && (
                    <p className="text-[11px] text-muted-foreground">
                      <span className="text-hindi font-medium">समय:</span>{" "}
                      {doc.timeTaken}
                    </p>
                  )}
                  {doc.cost && (
                    <p className="text-[11px] text-muted-foreground">
                      <span className="text-hindi font-medium">शुल्क:</span>{" "}
                      {doc.cost}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

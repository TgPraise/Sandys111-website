import { FileText } from "lucide-react";

export default function AdminCareerRow({ application, onToggleReviewed }) {
  const submitted = new Date(application.created_at).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="border-b hairline-dark py-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-cream">{application.name} · Age {application.age}</p>
          <p className="text-xs text-paper-dim">
            DOB {application.dob} · Right to work: {application.right_to_work}
            {application.right_to_work_details && ` (${application.right_to_work_details})`}
          </p>
          <p className="mt-1 text-xs text-paper-dim/70">
            {application.phone} · {application.email}
          </p>
          {application.summary && (
            <p className="mt-1 max-w-md text-xs italic text-paper-dim/70">"{application.summary}"</p>
          )}
          {application.cv_url && (
            <a
              href={application.cv_url}
              target="_blank"
              rel="noreferrer"
              download={application.cv_file_name}
              className="mt-2 inline-flex items-center gap-1.5 text-xs text-gold-light hover:text-gold"
            >
              <FileText size={13} />
              {application.cv_file_name || "View CV"}
            </a>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-xs text-paper-dim/60">Submitted {submitted}</span>
          <label className="flex items-center gap-2 text-xs text-paper-dim">
            <input
              type="checkbox"
              checked={!!application.reviewed}
              onChange={(e) => onToggleReviewed(application.id, e.target.checked)}
              className="h-4 w-4 accent-gold"
            />
            Reviewed
          </label>
        </div>
      </div>
    </div>
  );
}

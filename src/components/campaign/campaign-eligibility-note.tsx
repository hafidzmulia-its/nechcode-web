type CampaignEligibilityNoteProps = {
  audience: string;
  termsShort?: string;
};

export function CampaignEligibilityNote({ audience, termsShort }: CampaignEligibilityNoteProps) {
  return (
    <div className="rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-5">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-secondary">Kelayakan Campaign</p>
      <p className="text-sm text-on-surface-variant">Audience utama: {audience}</p>
      {termsShort ? <p className="mt-2 text-xs text-on-surface-variant/80">{termsShort}</p> : null}
    </div>
  );
}

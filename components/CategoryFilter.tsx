"use client";
import { Gender, AgeGroup, GENDER_LABELS, AGE_LABELS } from "@/lib/store";
import { useLang } from "@/lib/lang";

interface Props {
  gender: Gender | "all";
  ageGroup: AgeGroup;
  onGender: (g: Gender | "all") => void;
  onAge: (a: AgeGroup) => void;
}

const GENDERS: (Gender | "all")[] = ["all","female","male","children"];

export default function CategoryFilter({ gender, ageGroup, onGender, onAge }: Props) {
  const { lang } = useLang();
  const ff = { fontFamily: lang==="fa"?"Vazirmatn,sans-serif":"Sora,sans-serif" };

  const genderLabel = (g: Gender | "all") => {
    if (g==="all") return lang==="fa" ? "همه" : "All";
    return lang==="fa" ? GENDER_LABELS[g].fa : GENDER_LABELS[g].en;
  };

  const ageLabel = (a: AgeGroup) => {
    const l = AGE_LABELS[a];
    const name = lang==="fa" ? l.fa : l.en;
    return l.range ? `${name} (${l.range})` : name;
  };

  // Only show age filters when children is selected
  const showAge = gender === "children";
  const childAges: AgeGroup[] = ["all","baby","kids","teen"];

  return (
    <div className="space-y-4">
      {/* Gender tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {GENDERS.map(g => (
          <button key={g} onClick={() => { onGender(g); onAge("all"); }}
            className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
            style={gender===g
              ? { background:"linear-gradient(135deg,var(--blue),var(--purple))", color:"#fff", ...ff }
              : { background:"var(--glass)", border:"1px solid var(--glass-border)", color:"var(--text2)", ...ff }}>
            {g !== "all" && <span className="mr-1">{GENDER_LABELS[g as Gender].icon}</span>}
            {genderLabel(g)}
          </button>
        ))}
      </div>

      {/* Age sub-tabs — only for children */}
      {showAge && (
        <div className="flex flex-wrap justify-center gap-2 fade-up">
          {childAges.map(a => (
            <button key={a} onClick={() => onAge(a)}
              className="px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
              style={ageGroup===a
                ? { background:"var(--purple)", color:"#fff", ...ff }
                : { background:"var(--shine2)", border:"1px solid var(--border2)", color:"var(--text3)", ...ff }}>
              {ageLabel(a)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

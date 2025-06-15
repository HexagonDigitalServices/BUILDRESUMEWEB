import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { infoStyles as styles } from '../assets/dummystyle';

export const Progress = ({ progress, color }) => (
  <div className={styles.progressWrapper}>
    <div className={styles.progressBar(color)} style={{ width: `${progress * 20}%`, backgroundColor: color }} />
  </div>
);

export const ActionLink = ({ icon, link, bgColor }) => (
  <div className={styles.actionWrapper}>
    <div className={styles.actionIconWrapper} style={{ backgroundColor: bgColor }}>
      {icon}
    </div>
    <p className={styles.actionLink}>{link}</p>
  </div>
);

export const CertificationInfo = ({ title, issuer, year, bgColor }) => (
  <div className={styles.certContainer}>
    <h3 className={styles.certTitle}>{title}</h3>
    <div className={styles.certRow}>
      {year && <div className={styles.certYear(bgColor)} style={{ backgroundColor: bgColor }}>{year}</div>}
      <p className={styles.certIssuer}>{issuer}</p>
    </div>
  </div>
);

export const ContactInfo = ({ icon, iconBG, value }) => (
  <div className={styles.contactRow}>
    <div className={styles.contactIconWrapper} style={{ backgroundColor: iconBG }}>{icon}</div>
    <p className={styles.contactText}>{value}</p>
  </div>
);

export const EducationInfo = ({ degree, institution, duration }) => (
  <div className={styles.eduContainer}>
    <h3 className={styles.eduDegree}>{degree}</h3>
    <p className={styles.eduInstitution}>{institution}</p>
    <p className={styles.eduDuration}>{duration}</p>
  </div>
);

const InfoBlock = ({ label, progress, accentColor }) => (
  <div className={styles.infoRow}>
    <p className={styles.infoLabel}>{label}</p>
    {progress > 0 && <Progress progress={(progress / 100) * 5} color={accentColor} />}
  </div>
);

export const LanguageSection = ({ languages, accentColor }) => (
  <div>
    {languages.map((lang, idx) => (
      <InfoBlock key={idx} label={lang.name} progress={lang.progress} accentColor={accentColor} />
    ))}
  </div>
);

export const SkillSection = ({ skills, accentColor }) => (
  <div className={styles.skillGrid}>
    {skills.map((skill, idx) => (
      <InfoBlock key={idx} label={skill.name} progress={skill.progress} accentColor={accentColor} />
    ))}
  </div>
);

export const ProjectInfo = ({ title, description, githubLink, liveDemoUrl, isPreview }) => (
  <div className={styles.projectContainer}>
    <h3 className={styles.projectTitle(isPreview)}>{title}</h3>
    <p className={styles.projectDesc}>{description}</p>
    <div className={styles.projectLinks}>
      {githubLink && (
        <a href={githubLink} target="_blank" rel="noopener noreferrer" className={styles.linkRow}>
          <Github size={16} /><span>GitHub</span>
        </a>
      )}
      {liveDemoUrl && (
        <a href={liveDemoUrl} target="_blank" rel="noopener noreferrer" className={styles.linkRow}>
          <ExternalLink size={16} /><span>Live Demo</span>
        </a>
      )}
    </div>
  </div>
);

export const RatingInput = ({ value = 0, total = 5, onChange = () => {}, color = '#10b981', bgColor = '#e5e7eb' }) => {
  const displayValue = Math.round((value / 100) * total);
  return (
    <div className={styles.ratingWrapper}>
      {[...Array(total)].map((_, idx) => (
        <div
          key={idx}
          onClick={() => onChange(Math.round(((idx + 1) / total) * 100))}
          className={styles.ratingDot}
          style={{ backgroundColor: idx < displayValue ? color : bgColor }}
        />
      ))}
    </div>
  );
};

export const WorkExperience = ({ company, role, duration, durationColor, description }) => (
  <div className={styles.workContainer}>
    <div className={styles.workHeader}>
      <div>
        <h3 className={styles.workCompany}>{company}</h3>
        <p className={styles.workRole}>{role}</p>
      </div>
      <p className={styles.workDuration(durationColor)} style={{ color: durationColor }}>{duration}</p>
    </div>
    <p className={styles.workDesc}>{description}</p>
  </div>
);

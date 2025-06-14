// ResumeSummaryCard Component
export const ResumeSummaryCard = ({
  title = "Untitled Resume",
  createdAt = null,
  updatedAt = null,
  onSelect,
  onDelete,
  completion = 85,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const formattedCreatedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    : "—";

  const formattedUpdatedDate = updatedAt
    ? new Date(updatedAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    : "—";

  const getCompletionColor = () => {
    if (completion >= 90) return cardStyles.completionHigh;
    if (completion >= 70) return cardStyles.completionMedium;
    return cardStyles.completionLow;
  };

  const getCompletionIcon = () => {
    if (completion >= 90) return <Award size={12} />;
    if (completion >= 70) return <TrendingUp size={12} />;
    return <Zap size={12} />;
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete();
  };

  const generateDesign = () => {
    const colors = [
      "from-blue-50 to-blue-100",
      "from-purple-50 to-purple-100",
      "from-emerald-50 to-emerald-100",
      "from-amber-50 to-amber-100",
      "from-rose-50 to-rose-100"
    ];
    return colors[title.length % colors.length];
  };

  const designColor = generateDesign();

  return (
    <div
      className={cardStyles.resumeCard}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Completion indicator */}
      <div className={cardStyles.completionIndicator}>
        <div className={`${cardStyles.completionDot} bg-gradient-to-r ${getCompletionColor()}`}>
          <div className={cardStyles.completionDotInner} />
        </div>
        <span className={cardStyles.completionPercentageText}>{completion}%</span>
        {getCompletionIcon()}
      </div>

      {/* Preview area */}
      <div className={`${cardStyles.previewArea} bg-gradient-to-br ${designColor}`}>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={cardStyles.emptyPreviewIcon}>
            <Edit size={28} className="text-indigo-600" />
          </div>
          <span className={cardStyles.emptyPreviewText}>{title}</span>
          <span className={cardStyles.emptyPreviewSubtext}>
            {completion === 0 ? "Start building" : `${completion}% completed`}
          </span>

          {/* Mini resume sections indicator */}
          <div className="mt-4 flex gap-2">
            {['Profile', 'Work', 'Skills', 'Edu'].map((section, i) => (
              <div
                key={i}
                className={`px-2 py-1 text-xs rounded-md ${i < Math.floor(completion / 25)
                  ? 'bg-white/90 text-indigo-600 font-medium'
                  : 'bg-white/50 text-gray-500'
                  }`}
              >
                {section}
              </div>
            ))}
          </div>
        </div>

        {/* Hover overlay with action buttons */}
        {isHovered && (
          <div className={cardStyles.actionOverlay}>
            <div className={cardStyles.actionButtonsContainer}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSelect) onSelect();
                }}
                className={cardStyles.editButton}
                title="Edit"
              >
                <Edit size={18} className={cardStyles.buttonIcon} />
              </button>
              <button
                onClick={handleDeleteClick}
                className={cardStyles.deleteButton}
                title="Delete"
              >
                <Trash2 size={18} className={cardStyles.buttonIcon} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Info area */}
      <div className={cardStyles.infoArea}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h5 className={cardStyles.title}>{title}</h5>
            <div className={cardStyles.dateInfo}>
              <Clock size={12} />
              <span>Created At: {formattedCreatedDate}</span>
              <span className="ml-2">Updated At: {formattedUpdatedDate}</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getCompletionColor()} rounded-full transition-all duration-700 ease-out relative overflow-hidden`}
            style={{ width: `${completion}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>
          <div
            className={`absolute top-0 h-full w-4 bg-gradient-to-r from-transparent to-white/50 blur-sm transition-all duration-700`}
            style={{ left: `${Math.max(0, completion - 2)}%` }}
          ></div>
        </div>

        {/* Completion status */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs font-medium text-gray-500">
            {completion < 50 ? "Getting Started" : completion < 80 ? "Almost There" : "Ready to Go!"}
          </span>
          <span className="text-xs font-bold text-gray-700">{completion}% Complete</span>
        </div>
      </div>
    </div>
  );
};

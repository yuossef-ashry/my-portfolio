import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MdArrowOutward, MdClose } from "react-icons/md";
import ProjectPreview from "./ProjectPreview";
import "./styles/ProjectModal.css";

type ProjectCategory = "website" | "application";
type PreviewMode = "live" | "visual";
type PreviewDevice = "desktop" | "tablet" | "mobile";

export type PortfolioProject = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  highlights: string[];
  technologies: string[];
  category: ProjectCategory;
  links: { live?: string; repo?: string };
};

type ProjectModalCopy = {
  projectPreview: string;
  livePreview: string;
  visualPreview: string;
  overview: string;
  highlights: string;
  technologies: string;
  sourceCode: string;
  openLive: string;
  close: string;
  desktop: string;
  tablet: string;
  mobile: string;
  loading: string;
};

type ProjectModalProps = {
  project: PortfolioProject | null;
  copy: ProjectModalCopy;
  onClose: () => void;
};

const ProjectModal = ({ project, copy, onClose }: ProjectModalProps) => {
  const [mode, setMode] = useState<PreviewMode>("visual");
  const [device, setDevice] = useState<PreviewDevice>("desktop");
  const [liveLoaded, setLiveLoaded] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const previousOverflowY = document.body.style.overflowY;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    setMode("visual");
    setDevice("desktop");
    setLiveLoaded(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.overflowY = previousOverflowY;
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [project, onClose]);

  if (!project) return null;

  const showLivePreview = mode === "live" && Boolean(project.links.live);
  const deviceLabels: Record<PreviewDevice, string> = {
    desktop: copy.desktop,
    tablet: copy.tablet,
    mobile: copy.mobile,
  };

  return createPortal(
    <div
      className="project-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        dir="auto"
      >
        <header className="project-modal-header">
          <div className="project-modal-heading">
            <span>{copy.projectPreview}</span>
            <h2 id="project-modal-title">{project.title}</h2>
            <p>{project.subtitle}</p>
          </div>
          <button
            ref={closeButtonRef}
            className="project-modal-close"
            type="button"
            onClick={onClose}
            aria-label={copy.close}
          >
            <MdClose aria-hidden="true" />
          </button>
        </header>

        <div className="project-modal-layout">
          <div className="project-modal-preview-column">
            <div className="project-modal-toolbar">
              <div className="project-modal-tabs" role="tablist" aria-label={copy.projectPreview}>
                {project.links.live && (
                  <button
                    className="project-modal-tab"
                    type="button"
                    role="tab"
                    aria-selected={showLivePreview}
                    onClick={() => {
                      setLiveLoaded(false);
                      setMode("live");
                    }}
                  >
                    {copy.livePreview}
                  </button>
                )}
                <button
                  className="project-modal-tab"
                  type="button"
                  role="tab"
                  aria-selected={!showLivePreview}
                  onClick={() => setMode("visual")}
                >
                  {copy.visualPreview}
                </button>
              </div>

              <div className="project-modal-devices" role="group" aria-label={copy.projectPreview}>
                {(["desktop", "tablet", "mobile"] as PreviewDevice[]).map((value) => (
                  <button
                    className="project-modal-device"
                    type="button"
                    key={value}
                    aria-label={deviceLabels[value]}
                    aria-pressed={device === value}
                    onClick={() => setDevice(value)}
                  >
                    {deviceLabels[value]}
                  </button>
                ))}
              </div>
            </div>

            <div className={`project-modal-viewport is-${device}`}>
              {showLivePreview && project.links.live ? (
                <iframe
                  key={project.slug}
                  src={project.links.live}
                  title={`${project.title} — ${copy.livePreview}`}
                  loading="lazy"
                  allow="fullscreen"
                  onLoad={() => setLiveLoaded(true)}
                />
              ) : (
                <ProjectPreview slug={project.slug} image={project.image} />
              )}
              {showLivePreview && !liveLoaded && (
                <span className="project-modal-loading" role="status">
                  {copy.loading}
                </span>
              )}
            </div>

            <div className="project-modal-preview-footer">
              <span>{showLivePreview ? project.links.live : copy.visualPreview}</span>
              {project.links.live && (
                <a href={project.links.live} target="_blank" rel="noreferrer">
                  {copy.openLive} <MdArrowOutward aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          <aside className="project-modal-details">
            <section>
              <h3>{copy.overview}</h3>
              <p>{project.description}</p>
            </section>

            <section>
              <h3>{copy.highlights}</h3>
              <ul>
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </section>

            {project.technologies.length > 0 && (
              <section>
                <h3>{copy.technologies}</h3>
                <div className="project-modal-technologies">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>
              </section>
            )}

            {project.links.repo && (
              <a
                className="project-modal-repo"
                href={project.links.repo}
                target="_blank"
                rel="noreferrer"
              >
                {copy.sourceCode} <MdArrowOutward aria-hidden="true" />
              </a>
            )}
          </aside>
        </div>
      </section>
    </div>,
    document.body
  );
};

export default ProjectModal;

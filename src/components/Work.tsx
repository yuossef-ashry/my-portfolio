import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { useLanguage } from "../i18n/LanguageContext";
import ProjectPreview from "./ProjectPreview";
import ProjectModal, { type PortfolioProject } from "./ProjectModal";
import "./styles/WorkLayout.css";

type ProjectCategory = "website" | "application";
type ProjectFilter = "all" | ProjectCategory;

// Links and categories are language-independent, so they are keyed by project slug.
const projectLinks: Record<string, { live?: string; repo?: string }> = {
  "media-app": {
    live: "https://media-app-red.vercel.app/",
    repo: "https://github.com/yuossef-ashry/Media_App",
  },
  adasa: {
    live: "https://scop-vert-vercel-gcee.vercel.app/",
    repo: "https://github.com/yuossef-ashry/scop-vert.vercel",
  },
  "contact-hub": {
    live: "https://yuossef-ashry.github.io/Contact_Hub/",
    repo: "https://github.com/yuossef-ashry/Contact_Hub",
  },
  kanban: {
    live: "https://yuossef-ashry.github.io/Kanban/",
    repo: "https://github.com/yuossef-ashry/Kanban",
  },
  "space-dashboard": {
    live: "https://yuossef-ashry.github.io/Space-Dashboard/",
    repo: "https://github.com/yuossef-ashry/Space-Dashboard",
  },
  "modern-developer-portfolio": {
    live: "https://yuossef-ashry.github.io/Modern_Developer_Portfolio/",
    repo: "https://github.com/yuossef-ashry/Modern_Developer_Portfolio",
  },
  "personalized-nutrition": {
    live: "https://yuossef-ashry.github.io/Personalized-Nutrition-Meal-Planning-/",
    repo: "https://github.com/yuossef-ashry/Personalized-Nutrition-Meal-Planning-",
  },
  "whats-for-dinner": {
    repo: "https://github.com/yuossef-ashry/Whats-For-Dinner",
  },
  clarity: {
    repo: "https://github.com/yuossef-ashry/Clarity",
  },
};

const categories: Record<string, ProjectCategory> = {
  "media-app": "application",
  adasa: "application",
  "contact-hub": "application",
  kanban: "application",
  "space-dashboard": "application",
  "modern-developer-portfolio": "website",
  "personalized-nutrition": "application",
  "whats-for-dinner": "application",
  clarity: "website",
};

const filterValues: ProjectFilter[] = ["all", "website", "application"];

const Work = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const projects = t.work.projects.map((project) => ({
    ...project,
    category: categories[project.slug] ?? "website",
    links: projectLinks[project.slug] ?? {},
  }));

  const countFor = (value: ProjectFilter) =>
    value === "all"
      ? projects.length
      : projects.filter((project) => project.category === value).length;

  const visibleProjects = projects.filter(
    (project) => activeFilter === "all" || project.category === activeFilter
  );

  return (
    <section className="work-section" id="work">
      <div className="work-container section-container">
        <div className="work-head">
          <div>
            <p className="section-kicker">{t.work.kicker}</p>
            <h2 className="section-title">
              {t.work.titleFirst} <span>{t.work.titleAccent}</span>
            </h2>
          </div>
          <p>{t.work.intro}</p>
        </div>

        <div className="work-filters" role="group" aria-label={t.work.kicker}>
          {filterValues.map((value) => (
            <button
              className="work-filter"
              type="button"
              key={value}
              aria-pressed={activeFilter === value}
              onClick={() => setActiveFilter(value)}
            >
              {t.work.filters[value]}
              <span>{String(countFor(value)).padStart(2, "0")}</span>
            </button>
          ))}
        </div>

        <div className="work-grid">
          {visibleProjects.map((project) => (
            <article className="work-card" key={project.title}>
              <div className="work-card-heading">
                <span className="work-index">
                  {String(projects.indexOf(project) + 1).padStart(2, "0")}
                </span>
                <span className="work-category">{project.subtitle}</span>
              </div>

              <button
                className="work-preview"
                type="button"
                aria-label={`${t.work.openProject}: ${project.title}`}
                onClick={() => setSelectedProject(project)}
              >
                <ProjectPreview slug={project.slug} image={project.image} />
                <span className="work-preview-cta">{t.work.openProject}</span>
              </button>

              <div className="work-card-content">
                <h3>
                  <button
                    className="work-project-title"
                    type="button"
                    onClick={() => setSelectedProject(project)}
                  >
                    {project.title}
                  </button>
                </h3>
                <p className="work-desc">{project.description}</p>

                {(project.links.live || project.links.repo) && (
                  <div className="work-links">
                    <button
                      className="work-link work-link--primary"
                      type="button"
                      onClick={() => setSelectedProject(project)}
                    >
                      {t.work.openProject} <MdArrowOutward aria-hidden="true" />
                    </button>
                    {project.links.live && (
                      <a
                        className="work-link"
                        href={project.links.live}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {t.work.liveDemo} <MdArrowOutward aria-hidden="true" />
                      </a>
                    )}
                    {project.links.repo && (
                      <a
                        className="work-link"
                        href={project.links.repo}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {t.work.sourceCode} <MdArrowOutward aria-hidden="true" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
      <ProjectModal
        project={selectedProject}
        copy={{ ...t.work.modal, sourceCode: t.work.sourceCode }}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Work;


import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { useLanguage } from "../i18n/useLanguage";
import ProjectPreview from "./ProjectPreview";
import ProjectModal, { type PortfolioProject } from "./ProjectModal";
import { publicAsset } from "../utils/publicAsset";
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
  "ali-emad-portfolio": {
    live: "https://ali-emad-flutter-mobile-developer.vercel.app/",
    repo: "https://github.com/yuossef-ashry/ALI-EMAD-Flutter-Mobile-Developer",
  },
  "personalized-nutrition": {
    live: "https://yuossef-ashry.github.io/Personalized-Nutrition-Meal-Planning-/",
    repo: "https://github.com/yuossef-ashry/Personalized-Nutrition-Meal-Planning-",
  },
  "whats-for-dinner": {
    live: "https://yuossef-ashry.github.io/Whats-For-Dinner/",
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
  "ali-emad-portfolio": "website",
  "personalized-nutrition": "application",
  "whats-for-dinner": "application",
  clarity: "website",
};

const filterValues: ProjectFilter[] = ["all", "website", "application"];
const featuredSlugs = new Set([
  "media-app",
  "adasa",
  "modern-developer-portfolio",
]);

const Work = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);

  const projects = t.work.projects.map((project) => ({
    ...project,
    image: project.image ? publicAsset(project.image) : undefined,
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
  const featuredProjects = visibleProjects.filter((project) =>
    featuredSlugs.has(project.slug)
  );
  const otherProjects = visibleProjects.filter(
    (project) => !featuredSlugs.has(project.slug)
  );
  const gridClassFor = (count: number) =>
    `work-grid${count === 1 ? " work-grid--one" : count === 2 ? " work-grid--two" : ""}`;
  const renderProjectCard = (
    project: (typeof projects)[number],
    index: number,
    spotlight = false
  ) => (
    <article
      className={`work-card${spotlight ? " work-card--spotlight" : ""}`}
      key={project.slug}
    >
      <div className="work-card-heading">
        <span className="work-index">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="work-category">{project.subtitle}</span>
      </div>

      <div className="work-card-main">
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
          {spotlight && (
            <div
              className="work-card-technologies"
              role="group"
              aria-label={t.work.modal.technologies}
            >
              {project.technologies.slice(0, 5).map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          )}

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
                  rel="noopener noreferrer"
                >
                  {t.work.liveDemo} <MdArrowOutward aria-hidden="true" />
                </a>
              )}
              {project.links.repo && (
                <a
                  className="work-link"
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.work.sourceCode} <MdArrowOutward aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
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

        {featuredProjects.length > 0 && (
          <div className="work-featured">
            <p className="work-featured-label">
              {t.work.featured}
              <span className="work-section-count" aria-hidden="true">
                {String(featuredProjects.length).padStart(2, "0")}
              </span>
            </p>
            <div className="work-grid work-featured-grid">
              {featuredProjects.map((project, index) =>
                renderProjectCard(
                  project,
                  index,
                  featuredProjects.length === 1 ||
                    (featuredProjects.length >= 3 && index === 0)
                )
              )}
            </div>
          </div>
        )}

        {otherProjects.length > 0 && (
          <div className="work-more">
            <h3 className="work-more-title">
              {t.work.moreProjects}
              <span className="work-section-count" aria-hidden="true">
                {String(otherProjects.length).padStart(2, "0")}
              </span>
            </h3>
            <div className={gridClassFor(otherProjects.length)}>
              {otherProjects.map((project, index) =>
                renderProjectCard(project, featuredProjects.length + index)
              )}
            </div>
          </div>
        )}
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


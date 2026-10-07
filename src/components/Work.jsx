import { useId, useState } from 'react';
import { DEMOS, PROJECTS, SECTIONS, UI, WORK } from '../content';
import github from '../data/github.json';
import { useLang } from '../i18n/LangContext';
import SectionHead from './SectionHead';
import ElasticityDemo from './demos/ElasticityDemo';
import FlowDemo from './demos/FlowDemo';
import IsrDemo from './demos/IsrDemo';
import ToolsDemo from './demos/ToolsDemo';

const repoByName = Object.fromEntries(github.repos.map((repo) => [repo.name, repo]));

function Demo({ project }) {
  if (project.demo === 'elasticity') return <ElasticityDemo />;
  if (project.demo === 'isr') return <IsrDemo />;
  if (project.demo === 'tools') return <ToolsDemo />;
  return <FlowDemo steps={project.flow} />;
}

function Row({ project, index, open, onToggle }) {
  const { t } = useLang();
  const panelId = useId();
  const repo = repoByName[project.repo];

  const links = [
    ...(project.links ?? []),
    ...(repo?.homepage ? [{ label: t(UI.liveSite), href: repo.homepage }] : []),
    ...(repo ? [{ label: t(UI.repo), href: repo.url }] : []),
  ];

  return (
    <article className="row" data-open={open}>
      <h3 className="row__heading">
        <button
          type="button"
          className="row__head"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          data-cursor={t(open ? UI.close : UI.open)}
        >
          <span className="row__no">{String(index).padStart(2, '0')}</span>
          <span className="row__name">{project.name}</span>
          <span className="row__kind">{t(project.kind)}</span>
          <span className="row__meta">
            <span>{repo?.language ?? project.language}</span>
            <span>
              {repo ? `${repo.commits} ${t(UI.commits)}` : `${project.badge} · ${t(UI.private)}`}
            </span>
          </span>
          <span className="row__sign" aria-hidden="true" />
        </button>
      </h3>

      <div className="row__panel" id={panelId} inert={!open}>
        <div className="row__inner">
          <div className="row__text">
            <p className="row__summary">{t(project.summary)}</p>
            <dl className="facts">
              {project.facts.map((fact, i) => (
                <div key={i}>
                  <dt>{t(fact.k)}</dt>
                  <dd>{t(fact.v)}</dd>
                </div>
              ))}
            </dl>
            <p className="row__links">
              {links.map((link) => (
                <a
                  key={link.href}
                  className="link"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor={t(UI.visit)}
                >
                  {link.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </p>
          </div>

          <figure className="fig">
            <figcaption>
              Fig. {String(index + 2).padStart(2, '0')} — {t(DEMOS[project.demo].caption)}
            </figcaption>
            <Demo project={project} />
          </figure>
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const { t } = useLang();
  const [openId, setOpenId] = useState(PROJECTS[0].id);

  return (
    <section id="obra" className="section work">
      <SectionHead section={SECTIONS[2]} note={t(WORK.note)} />
      <div className="index">
        {PROJECTS.map((project, i) => (
          <Row
            key={project.id}
            project={project}
            index={i}
            open={openId === project.id}
            onToggle={() => setOpenId(openId === project.id ? null : project.id)}
          />
        ))}
      </div>
    </section>
  );
}

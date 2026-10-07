import { DEMOS, MCP_INSTALL, MCP_TOOLS } from '../../content';
import { useLang } from '../../i18n/LangContext';
import CopyButton from '../CopyButton';

export default function ToolsDemo() {
  const { t } = useLang();
  const copy = DEMOS.tools;

  return (
    <div className="demo">
      <ul className="tools">
        {MCP_TOOLS.map((tool) => (
          <li key={tool.name}>
            <code>{tool.name}</code>
            <span>{t(tool.what)}</span>
            <small>
              {tool.source}
              {tool.offline && <b> · {t(copy.offline)}</b>}
            </small>
          </li>
        ))}
      </ul>

      <div className="command">
        <p className="steps__title">{t(copy.install)}</p>
        <code>{MCP_INSTALL}</code>
        <CopyButton value={MCP_INSTALL} />
      </div>
    </div>
  );
}

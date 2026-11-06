import Section from "../common/Section";
import ListRow from "./ListRow";
import { Column } from "../layout/Layout";
import { getLatestUpdates } from "../../data/projects";

/* "2026-10-19" → "10.19" — 목록에선 연도를 뺀다 */
const formatDate = (date) => date.slice(5).replace("-", ".");

function LatestUpdates(){
    const items= getLatestUpdates(5);

    return(
         <Section 
            title="Latest Updates" 
            moreTo="/projects"
        >
            <Column  $gap={2}>
                {items.map((update, index) => (
                <ListRow
                    key={update.id}
                    to={update.to}
                    logo={update.projectLogo}
                    name={update.projectName}
                    desc={update.title}
                    badge={update.type}
                    badgeVariant={update.variant}
                    meta={formatDate(update.date)}
                    highlight={index === 0}
                />
                ))}
            </Column>
    </Section>
    );
}

export default LatestUpdates;


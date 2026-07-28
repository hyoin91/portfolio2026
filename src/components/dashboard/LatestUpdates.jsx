import Section from "../common/Section";
import ListRow from "./ListRow";
import { Column } from "../layout/Layout";
import { getLatestUpdates } from "../../data/projects";

function LatestUpdates(){
    const items= getLatestUpdates(4);

    return(
         <Section 
            title="Latest Updates" 
        >
            <Column  $gap={2}>
                {items.map((update) => (
                <ListRow
                    key={update.id}
                    to={`/projects/${update.projectId}`}
                    name={update.projectName}
                    desc={update.title}
                    badge="Feature"
                    meta={update.date}
                />
                ))}
            </Column>
    </Section>
    );
}

export default LatestUpdates;


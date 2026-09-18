import Section from "../common/Section";
import ListRow from "./ListRow";
import { Column } from "../layout/Layout";
import { getRecentProjects } from "../../data/projects";

function RecentlyProject(){
    const items=getRecentProjects(5);

    return(
        <Section 
            title="Recently Project" 
            moreTo="/projects"
        >
            <Column $gap={2}>
                {items.map((project) => (
                <ListRow
                    key={project.id}
                    to={`/projects/${project.id}`}
                    name={project.name}
                    desc={project.summary}
                    badge={project.roles[0]}
                    badgeVariant={project.roles[0]}
                    meta={project.year}
                />
                ))}
            </Column>
        </Section>  
    );
}

export default RecentlyProject;


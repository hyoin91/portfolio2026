import Section from "../common/Section";
import ListRow from "./ListRow";
import { Column } from "../layout/Layout";
import { getRecentProjects } from "../../data/projects";

function RecentlyProject(){
    const items=getRecentProjects(5);

    return(
        <Section 
            title="Recent Projects" 
            moreTo="/projects"
        >
            <Column $gap={2}>
                {items.map((project, index) => (
                <ListRow
                    key={project.id}
                    to={`/projects/${project.id}`}
                    logo={project.logo}
                    name={project.name}
                    desc={project.summary}
                    badge={project.roles[0]}
                    badgeVariant={project.roles[0]}
                    meta={project.year}
                    highlight={index === 0}
                />
                ))}
            </Column>
        </Section>  
    );
}

export default RecentlyProject;


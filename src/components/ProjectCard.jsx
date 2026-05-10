import { Link } from "react-router-dom";

const ProjectCard = ({ project, children }) =>
  project.internal ? (
    <Link to={project.link} className="group block">
      {children}
    </Link>
  ) : (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      {children}
    </a>
  );

export default ProjectCard;

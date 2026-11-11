import { publicAsset } from "../utils/publicAsset";

export type Technology = {
  name: string;
  icon: string;
};

export const technologies: Technology[] = [
  { name: "HTML5", icon: publicAsset("images/tech-html5.svg") },
  { name: "CSS3", icon: publicAsset("images/tech-css3.svg") },
  { name: "JavaScript", icon: publicAsset("images/tech-javascript.svg") },
  { name: "React", icon: publicAsset("images/tech-react.svg") },
  { name: "Bootstrap", icon: publicAsset("images/tech-bootstrap.svg") },
  { name: "Sass", icon: publicAsset("images/tech-sass.svg") },
  { name: "Git", icon: publicAsset("images/tech-git.svg") },
  { name: "GitHub", icon: publicAsset("images/tech-github.svg") },
];

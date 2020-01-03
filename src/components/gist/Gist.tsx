import { h } from "preact";

import { GistProps } from "./gist.props";

import "./gist.css";

const Gist = ({ code }: GistProps) => <pre className="gist__code">{code}</pre>;

export default Gist;

import { h } from 'preact';

import './gist.css';

const Gist = ({ code }) => <pre className="gist__code">{code}</pre>;

export default Gist;

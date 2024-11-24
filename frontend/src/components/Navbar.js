import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router";

export default function Navbar() {
  return (
    <div className="navbar bg-neutral-900">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Horizon
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li className="flex flex-row">
            <Link to="/upload">Upload</Link>
            <Link to="/verify">Verify</Link>
          </li>
          <li>
            <ConnectButton chainStatus="icon" showBalance={false} />
          </li>
        </ul>
      </div>
    </div>
  );
}

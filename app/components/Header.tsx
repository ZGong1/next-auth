import Link from "next/link";
import { SignInButton, SignOutButton } from "./Buttons";

const Header = () => {
  return (
    <span>
    <div className="header">
      <div className="left-buttons">
        <Link href="/"><button>Home</button></Link>
      </div>
      <div className="right-buttons">
        <SignInButton/>
        <SignOutButton/>
      </div>
    </div>
    </span>
  );
}
 
export default Header;
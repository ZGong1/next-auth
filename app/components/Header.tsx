import { Sign } from "crypto";
import { SignInButton, SignOutButton } from "./Buttons";

const Header = () => {
  return (
    <span>
    <div className="header">
      <div className="left-buttons">

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
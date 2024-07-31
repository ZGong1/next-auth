import Link from "next/link";
import { SignInButton, SignOutButton } from "./Buttons";
import { getServerSession } from "next-auth";

const Header = async () => {
  var authenticated = false
  const session = await getServerSession()

  if (session && session.user?.email) {
    authenticated = true
  }

  return (
    <span>
    <div className="header">
      <div className="left-buttons">
      <Link href="/"><button>Home</button></Link>
      {authenticated && <Link href="/newninja"><button>Create Ninja</button></Link>}
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
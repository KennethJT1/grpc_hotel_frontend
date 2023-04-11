import { useAuth } from "../context/auth";

export function Navbar() {
  //context
  const [auth, setAuth] = useAuth();

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    window.location.href = "/login";
  };

  return (
    <>
      <ul className="nav d-flex justify-content-between shadow-sm mb-2 sticky-top bg-light navbar">
        <li className="nav-item">
          <a className="nav-link" aria-current="page" href="/hotels">
            KjtHotel
          </a>
        </li>

        {!auth?.user ? (
          <>
            <li className="nav-item">
              <a className="nav-link" href="/login">
                LOGIN
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/register">
                REGISTER
              </a>
            </li>
          </>
        ) : (
          <div className="dropdown">
            <li>
              <a
                className="nav-link pointer dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                {auth?.user?.name}
              </a>

              {auth?.user && (
                <ul className="dropdown-menu">
                  <li className="nav-item">
                    <a className="dropdown-item" href="/profile">
                      Profile
                    </a>
                  </li>

                  <li className="nav-item">
                    {auth?.user.role == "ADMIN" && (
                      <a className="dropdown-item" href="/admin">
                        Admin
                      </a>
                    )}
                  </li>

                  <li className="nav-item">
                    <a className="dropdown-item" href="#" onClick={logout}>
                      logout
                    </a>
                  </li>
                </ul>
              )}
            </li>
          </div>
        )}
      </ul>
    </>
  );
}

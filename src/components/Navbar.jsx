import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, refreshAccessToken } from "../httpRequests";
import Logo from "../assets/logo.png";
import { IoIosSearch } from "react-icons/io";
import { FaRegUser, FaSearch } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const navigate = useNavigate();

  const [userAccess, setUserAccess] = useState({
    user: "x",
    accessToken: "",
  });

  useEffect(() => {
    console.log("Burdayım");
    if (localStorage.getItem("userAccess")) {
      setUserAccess(JSON.parse(localStorage.getItem("userAccess")));
    }
    console.log(userAccess);
    const accessToken = userAccess?.accessToken;
    console.log(accessToken);
    if (accessToken) {
      console.log(userAccess?.user?.id)
      const decodedToken = jwtDecode(accessToken);

      // Refreshh
      refreshAccessToken(userAccess.user.id)
        .then((res) => {
          console.log("Token Yenilendi");
          localStorage.setItem("userAccess", JSON.stringify({
            user: userAccess?.user,
            accessToken: res.data.accessToken
          }));
          setUserAccess(JSON.parse(localStorage.getItem("userAccess")));
        })
        .catch((err) => {
          console.log("Token Yenilenmedi!!!");
        });

      // Son Kullanma Tarihi Tükendi :q
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        // LogOut
        localStorage.removeItem("userAccess");
        LogOut(userAccess?.user?._id)
          .then(() => console.log("Çıkış İşlemi Başarılı"))
          .catch((error) => console.log(error.message));
        setUserAccess({
          user: "",
          accessToken: "",
        });
      }
    }
  }, [navigate]);

  return (
    <nav>
      <div className="logo-space">
        <NavLink to={"/"}>
          <img src={Logo} alt="asfafe" />
        </NavLink>
      </div>

      <div className="navigation">
        <NavLink to={"/"}>Ana Sayfa</NavLink>
        <button className="searchBtn" onClick={() => navigate("/search")}>
          <FaSearch size={22} />
        </button>
        {JSON.parse(localStorage.getItem("userAccess"))?.user === undefined ? (
          <button id="sign" onClick={() => navigate("/sign")}>
            <FaRegUser size={25} />
            Kullanıcı Girişi
          </button>
        ) : (
          <>
            <NavLink to={"/createRecipe"}>Tarif Oluştur</NavLink>
            <NavLink
              onClick={(e) => {
                e.preventDefault();
                LogOut(userAccess?.user?.id)
                  .then((res) => {
                    console.log(res);
                    localStorage.removeItem("userAccess");
                    setUserAccess({
                      user: "x",
                      accessToken: "",
                    });
                    console.log("Çıkış İşlemi Başarılı");
                    navigate("/")
                  })
                  .catch((err) => console.log(err));
              }}
            >
              Çıkış
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

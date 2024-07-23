import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser, signInUser } from "../httpRequests";
import { FaUserPlus } from "react-icons/fa";
import { RiMapPinUserFill } from "react-icons/ri";
import FileBase64 from "react-file-base64";

const Sign = () => {
  const navigate = useNavigate();

  const [signUpInfo, setSignUpInfo] = useState({
    firstName: "",
    lastName: "",
    age: 0,
    email: "",
    profileImage: "",
    password: "",
    confirmPassword: "",
  });

  const [signInInfo, setSignInInfo] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(signUpInfo);
  }, [signUpInfo]);

  const handleImage = (file) => {
    setSignUpInfo({
        ...signUpInfo,
        profileImage: file.base64
    });
  };

  return (
    <div className="sign">
      <div className="sign-contain">
        <div
          className="sign-in"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginLeft: "0",
              marginBottom: "30px",
            }}
          >
            Hesabınıza Giriş Yapın!
          </h2>
          <div className="sign-in-form">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setSignInInfo({
                  ...signInInfo,
                  email: e.target.value,
                })
              }
              value={signInInfo.email}
            />
            <input
              type="password"
              placeholder="Şifre"
              onChange={(e) =>
                setSignInInfo({
                  ...signInInfo,
                  password: e.target.value,
                })
              }
            />
            <button
              onClick={() => {
                signInUser(signInInfo)
                  .then((res) => {
                    localStorage.setItem(
                      "userAccess",
                      JSON.stringify(res.data)
                    );
                    alert("Hesabınıza Başarılı Bir Şekilde Giriş Yaptınız!");
                    navigate("/");
                  })
                  .catch((err) => console.log(err));
              }}
            >
              <RiMapPinUserFill size={25} />
              &nbsp;Giriş Yap
            </button>
          </div>
        </div>
        <div className="sign-up">
          <h2>Üye Olun!</h2>
          <div className="sign-up-form">
            <input
              type="text"
              placeholder="Ad"
              onChange={(e) => {
                setSignUpInfo({
                  ...signUpInfo,
                  firstName: e.target.value,
                });
              }}
              value={signUpInfo.firstName}
            />
            <input
              type="text"
              placeholder="Soyad"
              onChange={(e) =>
                setSignUpInfo({ ...signUpInfo, lastName: e.target.value })
              }
              value={signUpInfo.lastName}
            />
            <input
              type="number"
              placeholder="Yaş"
              onChange={(e) =>
                setSignUpInfo({ ...signUpInfo, age: parseInt(e.target.value) })
              }
              value={signUpInfo.age}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) =>
                setSignUpInfo({ ...signUpInfo, email: e.target.value })
              }
              value={signUpInfo.email}
            />
            <div>
              <label htmlFor="profile">Profil Fotoğrafı</label>
              <FileBase64 multiple={false} onDone={handleImage} />
            </div>
            <input
              type="password"
              placeholder="Şifre"
              onChange={(e) =>
                setSignUpInfo({ ...signUpInfo, password: e.target.value })
              }
              value={signUpInfo.password}
            />
            <input
              type="password"
              placeholder="Şifre Tekrar"
              onChange={(e) =>
                setSignUpInfo({
                  ...signUpInfo,
                  confirmPassword: e.target.value,
                })
              }
              value={signUpInfo.confirmPassword}
            />
            <button
              onClick={() => {
                signUpUser(signUpInfo)
                  .then((res) => {
                    localStorage.setItem(
                      "userAccess",
                      JSON.stringify(res.data)
                    );
                    alert("Hesabınız Başarılı Bir Şekilde Oluşturuldu!");
                    navigate("/");
                  })
                  .catch((err) => console.log(err));
              }}
            >
              <FaUserPlus size={25} />
              &nbsp;Kayıt Ol
            </button>
          </div>
        </div>
        <div
          className="sign-pathfinder"
          style={{
            right: "151px",
          }}
        >
          <div className="to-signIn">
            <h1>Zaten Hesabınız Var mı?</h1>
            <p>
              Hadi giriş yapın ve leziz tariflerinizi diğer insanlarla paylaşın!
            </p>
            <button
              onClick={() => {
                const signPathfinder =
                  document.getElementsByClassName("sign-pathfinder")[0];
                signPathfinder.style.left = "151px";
                signPathfinder.style.right = "";

                const toSignIn =
                  document.getElementsByClassName("to-signIn")[0];
                toSignIn.style.display = "none";
                const toSignUp =
                  document.getElementsByClassName("to-signUp")[0];
                toSignUp.style.display = "inline-block";
              }}
            >
              Üye Ol
            </button>
          </div>
          <div className="to-signUp" style={{ display: "none" }}>
            <h1>Hesabınız Yok mu?</h1>
            <p>
              Hadi bir hesap açın ve belki de kimsenin bilmediği tariflerinizi
              insanlarla paylaşın!
            </p>
            <button
              onClick={() => {
                const signPathfinder =
                  document.getElementsByClassName("sign-pathfinder")[0];
                signPathfinder.style.right = "151px";
                signPathfinder.style.left = "";

                const toSignIn =
                  document.getElementsByClassName("to-signIn")[0];
                toSignIn.style.display = "inline-block";
                const toSignUp =
                  document.getElementsByClassName("to-signUp")[0];
                toSignUp.style.display = "none";
              }}
            >
              Giriş Yap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign;

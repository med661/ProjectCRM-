import React ,{useState,useEffect} from 'react'
import axios from "../config/axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  setIsAuth,
  setRefreshToken,
  setUserInfo
} from "../features/authentication/authenticationSlice";

const Login = () => {
  const [email, setemail] = useState("email");
  const [password, setpassword] = useState("password");
  const [err, seterr] = useState(null);

  //const userInfo = useSelector(state => state.authentication.userInfo)

  const isauth = useSelector((state) => state.authentication.isauth);
  const token = useSelector((state) => state.authentication.token);
  const Rtoken = useSelector((state) => state.authentication.refreshToken);


  const dispatch = useDispatch();
  const history = useHistory();


useEffect(() => {
console.log("eee");
}, [])



  const login = async (e) => {
    e.preventDefault();
    
    let data = {
      email,
      password,
    };
    console.log({token,Rtoken});

    try {
      await axios
      .post("/user/login", data)
      .then((res) => {
          console.log("****"+JSON.stringify(res));
          dispatch(setIsAuth({ value: true }));
          dispatch(setRefreshToken({ refreshToken: res.data.refresh_token }));
          //fetchuser(token)
        //console.log({isauth},{token});
        history.push("/profile");

      })
      .catch((err) => {
        console.log({err});
        seterr(err.response.data.msg)

      });
      console.log({token,Rtoken});


    }catch(e) {
      console.log({errlogin:e});

    }


}
  return (
    <div className="container">

      {err}
    <form  onSubmit={login} >
  <div className="row mb-3">
    <label for="inputEmail3" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      <input
       type="email"
        className="form-control"
         id="inputEmail3"
         value={email}

         onChange={(e) => setemail(e.target.value)}

         />
    </div>
  </div>
  <div className="row mb-3">
    <label for="inputPassword3" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      <input
       type="password"
        className="form-control" 
       id="inputPassword3"
       value={password}

       onChange={(e) => setpassword(e.target.value)}

       />
    </div>
  </div>
 
  <button type="submit" className="btn btn-primary">Sign in</button>
</form>
<Link to="/register">dzzefz</Link>
</div>
  )
}

export default Login
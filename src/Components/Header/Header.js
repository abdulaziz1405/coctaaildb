import React,{useState} from 'react'
import styles from "./Header.module.css"
import Logo from "../../Assets/Logo.png"
import { Link } from 'react-router-dom'
import { UseSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${input}`);
    setInput('');

  }

  return (
    <nav className={styles.navbar}>
      <div className="container">
        <div className={styles.navbar_content}>
          <Link to="/">
            <img width={296} height={41} src={Logo} alt="" />
          </Link>
          <form className={styles.form_control} onSubmit={handleSubmit}>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)}  name=""id=""/>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header

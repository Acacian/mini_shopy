import React, { useState } from "react";
import { TbBuildingStore } from "react-icons/tb";
import { Link } from "react-router-dom";
import User from "./User";
import { useUser } from "../context/UserContext";
import Button from "./Button";
import CartStatus from "./CartStatus";  // 수정된 부분

export default function Header() {
  const { user, login, logout } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <header className="flex justify-between items-center border-b border-grey p-3 w-full">
      <Link to="/" className="flex items-center text-main gap-2 text-2xl">
        <TbBuildingStore />
        <span>Shoppy</span>
      </Link>
      <div className="flex items-center gap-3">
        <Link to="products">Products</Link>
        <Link to="/cart">
          <CartStatus />
        </Link>
        {user && <User user={user} />}
        {!user && (
          <div>
            <input 
              type="text" 
              placeholder="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <Button onClick={() => login(username, password)} text="Login" />
          </div>
        )}
        {user && <Button onClick={logout} text="Logout" />}
      </div>
    </header>
  );
}

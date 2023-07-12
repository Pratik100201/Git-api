import React, { useState } from "react";
import "./user.css";

function UserFinder() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error(error);
      setUserData(null);
    }
  };

  return (
    <div>
      <input
        className="input"
        type="text"
        placeholder="Enter a GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className="bot" onClick={handleSearch}>
        Search
      </button>
      {userData && (
        <div>
          <h2 className="heading">{userData.name}</h2>
          <img className="pic" src={userData.avatar_url} alt={userData.name} />
          <div className="Container">
            <div>
            <p className="p">Username: {userData.login}</p>
            <p className="p">Followers: {userData.followers}</p>
            </div>
            <div>
            <p className="p">Public Repositories: {userData.public_repos}</p>
            <p className="p">
              Portfolio : <a href="{userData.html_url}">Portfolio</a>
            </p>
            </div>
            <div>
            <p className="p"> Location : {userData.location}</p>
            <p className="p"> Bio : {userData.bio} </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserFinder;

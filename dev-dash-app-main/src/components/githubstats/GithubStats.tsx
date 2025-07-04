



// 2nd
import { useState } from 'react';
import axios from 'axios';
import './style.css'


interface GitHubUserProps {
    username: string;
    avatar_url: string;
    followers: string;
    public_repos: number;
}

const GithubStats: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [userData, setUserData] = useState<GitHubUserProps | null>(null);
  const [contributions, setContributions] = useState<any[]>([]);
  const [showError, setShowError] = useState<boolean>(false);

  const fetchGithubStats = async (username: string) => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUserData({
        username: response.data.login,
        followers: response.data.followers,
        avatar_url: response.data.avatar_url,
        public_repos: response.data.public_repos,
      });

      // Fetch contributions (or events)
      const userContributions = await fetchUserContributions(username);
      setContributions(userContributions);
    } catch (err) {
      console.error(`failed to fetch user data, check username: ${err}`);
    }
  };

  const fetchUserContributions = async (username: string) => {
    const response = await axios.get(`https://api.github.com/users/${username}/events/public`);
    return response.data;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username) {
      fetchGithubStats(username);
    }
    else{
        setShowError(true);
        setTimeout(()=>setShowError(false), 3000);
        return;
    }
  };

  return (
    <div>
        
        <div className='title'>
            <h3>GitHub Stats Tracker</h3>
        </div>
        <div className='form'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
        <button type="submit">Search</button>
      </form>
</div>



      <div className='github-stats'>
         {userData && (
        <div>
          <img src={userData.avatar_url} alt="User Avatar" width={200} height={200} style={{borderRadius: '50%',border:'4px solid white'}}/>
          <h3>{userData.username}</h3>
          <p>Followers: {userData.followers}</p>
          <p>Public Repos: {userData.public_repos}</p>
        </div>
      )}
   

{/* popup error */}
{showError && (
  <div className="overlay">
    <div className="popup">Please enter your username!</div>
  </div>
)}


      {/* Render contributions (simplified for now) */}
      <div className='contribution-div'>
        <h4>Recent Contributions</h4>
        <ul>
          {contributions.slice(0, 5).map((contribution: any) => (
            <li key={contribution.id}>
              {/* Render different event types with additional details */}
              {contribution.type === 'PushEvent' && (
                <p>
                  Push to repository <strong>{contribution.repo.name}</strong>:
                  {contribution.payload.commits.map((commit: any, index: number) => (
                    <div key={index}>
                      <strong>Commit Message:</strong> {commit.message}
                    </div>
                  ))}
                </p>
              )}
              {contribution.type === 'PullRequestEvent' && (
                <p>
                  <strong>Pull Request:</strong>{' '}
                  <a href={contribution.payload.pull_request.html_url} target="_blank" rel="noopener noreferrer">
                    {contribution.payload.pull_request.title}
                  </a>
                </p>
              )}
              {contribution.type === 'ReleaseEvent' && (
                <p>
                  Released version: <strong>{contribution.payload.release.tag_name}</strong> for{' '}
                  <strong>{contribution.repo.name}</strong>
                </p>
              )}
              {contribution.type === 'CreateEvent' && (
                <p>
                  Created a new <strong>{contribution.payload.ref_type}</strong> on{' '}
                  <strong>{contribution.repo.name}</strong>
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
         </div>


    </div>
  );
};

export default GithubStats;

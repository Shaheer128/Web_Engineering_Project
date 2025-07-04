import GithubStats from "../../components/githubstats/GithubStats"
import CodeEditor from "../../components/codeEditor/CodeEditor"
import { TaskManager } from "../../components/taskmanager/TaskManager"
import { WeatherWidget } from "../../components/weatherWidget/WeatherWidget"
import './style.css'

export const Home = () => {
    return(
        <>
        <div>
            <GithubStats />
            <div className="widget-row1">
            <WeatherWidget />
       <CodeEditor />
            </div>
              <div className="widget-row1">
            <TaskManager />
            
            </div>
        </div>
        </>
    )
}
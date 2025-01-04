import { Link } from "react-router-dom";

const Page404 : React.FC = () => {
    return ( 
        <div>
            <span>Not Found 404</span>
            <Link to="/"><button>go back</button></Link>
        </div>
     );
}
 
export default Page404;
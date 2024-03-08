import { Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="App">
        <Link to="/help">
            <Button  color="primary">
            Hues
            </Button>
        </Link>
    </div>
  );
}

export default Home;

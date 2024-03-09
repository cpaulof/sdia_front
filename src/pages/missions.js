import { Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';

function Missions() {
  return (
    <div className="App">
        <Link to="/help">
            <Button  color="primary">
            Missions
            </Button>
        </Link>
    </div>
  );
}

export default Missions;

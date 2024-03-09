import { Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';

function PID() {
  return (
    <div className="App">
        <Link to="/help">
            <Button  color="primary">
            PID
            </Button>
        </Link>
    </div>
  );
}

export default PID;

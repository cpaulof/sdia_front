import { Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';

function Managment() {
  return (
    <div className="App">
        <Link to="/help">
            <Button  color="primary">
            Managment
            </Button>
        </Link>
    </div>
  );
}

export default Managment;

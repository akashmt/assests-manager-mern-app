import { Alert } from "react-bootstrap";

const NotFound = ({ match }) => {
  return (
    <Alert variant="primary">
      No route available for url <strong>app.com{match.url}</strong>
    </Alert>
  );
};

export default NotFound;

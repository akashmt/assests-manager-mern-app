import { Alert, Table } from "react-bootstrap";
import Loading from "./Loading";

const Assets = ({ dispatch, loading, error, refreshAfterError, assets }) => {
  const onClickHandler = () => {
    refreshAfterError(dispatch);
  };

  return (
    <div className="crud-table">
      {loading ? (
        <Loading />
      ) : error ? (
        <Alert variant="danger" className="refresh" onClick={onClickHandler}>
          {error.message ? error.message : "An error has occurred."} - Click to
          refresh
        </Alert>
      ) : (
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {assets?.length === 0 ? (
              <tr>
                <td colSpan="5">No assets found</td>
              </tr>
            ) : (
              assets.map((asset, index) => {
                return (
                  <tr key={asset._id}>
                    <td>{index + 1}</td>
                    <td>{asset.name}</td>
                    <td>{asset.description}</td>
                    <td>{asset.category?.name}</td>
                    <td>{asset.location?.name}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Assets;

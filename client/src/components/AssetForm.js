import { useState, useEffect } from "react";
import { Alert, Form, Button } from "react-bootstrap";

const AssetForm = ({
  create,
  categories,
  locations,
  dispatch,
  addAsset,
  history,
  assetToUpdate,
  updateAsset,
}) => {
  const [asset, setAsset] = useState(
    assetToUpdate
      ? {
          name: assetToUpdate.name,
          description: assetToUpdate.description,
          category: assetToUpdate.category._id ?? "5ffa2d16131fdeaf70287bf6", // Hardcoded
          location: assetToUpdate.location._id ?? "5ffa2de9647b6daf93c94ed2", // Hardcoded
        }
      : {
          name: "",
          description: "",
          category: "5ffa2d16131fdeaf70287bf6", // Hardcoded
          location: "5ffa2de9647b6daf93c94ed2", // Hardcoded
        }
  );

  const onChange = (e) => {
    document.getElementById("editing").classList.remove("hidden");
    document.getElementById("submitted").classList.add("hidden");
    setAsset({ ...asset, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (create) {
      addAsset(dispatch, asset);
    } else {
      updateAsset(dispatch, assetToUpdate._id, asset);
    }

    document.getElementById("editing").classList.add("hidden");
    document.getElementById("submitted").classList.remove("hidden");
    setTimeout(() => {
      history.push("/assets");
      window.location.reload();
    }, 1500);
  };

  useEffect(() => {
    if (!assetToUpdate) {
      history.push("/asset");
    }
  }, [assetToUpdate, history]);

  return (
    <>
      {create && (
        <div id="editing">
          <Alert variant="primary">Create Asset</Alert>
        </div>
      )}
      {!create && (
        <div id="editing">
          <Alert variant="primary">Update Asset</Alert>
        </div>
      )}
      <div id="submitted" className="hidden">
        <Alert variant="success">Data submitted</Alert>
      </div>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={asset.name}
            placeholder="Asset name"
            onChange={onChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={asset.description}
            placeholder="Asset description"
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={asset.category}
            onChange={onChange}
          >
            {categories?.map((x) => (
              <option key={x._id} value={x._id}>
                {x.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control
            as="select"
            name="location"
            value={asset.location}
            onChange={onChange}
          >
            {locations?.map((x) => (
              <option key={x._id} value={x._id}>
                {x.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Button as="input" type="submit" value="submit"></Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default AssetForm;

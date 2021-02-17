import { useReducer, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container, Tabs, Tab, Jumbotron, Pagination } from "react-bootstrap";

import reducer from "./reducer/reducer";
import {
  fetchAssets,
  fetchCategories,
  fetchLocations,
  refreshAfterError,
  fetchFilteredAssets,
  changeSearchTerm,
  setPage,
  addAsset,
  updateAsset,
  deleteAsset,
  fetchFilteredCategories,
  changeCategorySearchTerm,
  addCategory,
  updateCategory,
  deleteCategory,
  fetchFilteredLocations,
  changeLocationSearchTerm,
  addLocation,
  updateLocation,
  deleteLocation,
} from "./methods/methods";

import NavigationBar from "./components/NavigationBar";
import About from "./components/About";
import Search from "./components/Search";
import PaginationButtons from "./components/PaginationButtons";
import Assets from "./components/Assets";
import ByCategory from "./components/ByCategory";
import ByLocation from "./components/ByLocation";
import ManageAssets from "./components/ManageAssets";
import ManageCategories from "./components/ManageCategories";
import ManageLocations from "./components/ManageLocations";
import AssetForm from "./components/AssetForm";
import CategoryForm from "./components/CategoryForm";
import LocationForm from "./components/LocationForm";
import NotFound from "./components/NotFound";

import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/App.css";

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    assets: [],
    categories: [],
    locations: [],
    loading: true,
    error: null,
    searchTerm: "",
    filteredAssets: [],
    numberOfPages: 1,
    numberOfCatPages: 1,
    numberOfLocPages: 1,
    page: 1,
    categorySearchTerm: "",
    filteredCategories: [],
    locationSearchTerm: "",
    filteredLocations: [],
  });

  useEffect(() => {
    fetchAssets(dispatch);
    fetchCategories(dispatch);
    fetchLocations(dispatch);
  }, []);

  useEffect(() => {
    fetchFilteredAssets(dispatch, state.searchTerm, state.page);
  }, [state.searchTerm, state.page]);

  useEffect(() => {
    fetchFilteredCategories(dispatch, state.categorySearchTerm, state.page);
  }, [state.categorySearchTerm, state.page]);

  useEffect(() => {
    fetchFilteredLocations(dispatch, state.locationSearchTerm, state.page);
  }, [state.locationSearchTerm, state.page]);

  return (
    <BrowserRouter>
      <NavigationBar />
      <Container>
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/">
            <Tabs defaultActiveKey="assets" id="tabs">
              <Tab eventKey="assets" title="Assets">
                <Search
                  searchTerm={state.searchTerm}
                  dispatch={dispatch}
                  changeSearchTerm={changeSearchTerm}
                />
                <Assets
                  assets={state.filteredAssets}
                  loading={state.loading}
                  error={state.error}
                  dispatch={dispatch}
                  refreshAfterError={refreshAfterError}
                />
                <Jumbotron>
                  <PaginationButtons
                    numberOfPages={state.numberOfPages}
                    page={state.page}
                    setPage={setPage}
                    dispatch={dispatch}
                  />
                </Jumbotron>
              </Tab>
              <Tab eventKey="by-category" title="ByCategory">
                <ByCategory
                  assets={state.assets}
                  categories={state.filteredCategories}
                  loading={state.loading}
                  error={state.error}
                />
                <Jumbotron>
                  <PaginationButtons
                    numberOfPages={state.numberOfCatPages}
                    page={state.page}
                    setPage={setPage}
                    dispatch={dispatch}
                  />
                </Jumbotron>
              </Tab>
              <Tab eventKey="by-location" title="ByLocation">
                <ByLocation
                  assets={state.assets}
                  locations={state.filteredLocations}
                  loading={state.loading}
                  error={state.error}
                />
                <Jumbotron>
                  <PaginationButtons
                    numberOfPages={state.numberOfLocPages}
                    page={state.page}
                    setPage={setPage}
                    dispatch={dispatch}
                  />
                </Jumbotron>
              </Tab>
            </Tabs>
          </Route>

          <Route path="/assets">
            <ManageAssets
              assets={state.filteredAssets}
              loading={state.loading}
              error={state.error}
              dispatch={dispatch}
              refreshAfterError={refreshAfterError}
              searchTerm={state.searchTerm}
              changeSearchTerm={changeSearchTerm}
              deleteAsset={deleteAsset}
            />
            <Jumbotron>
              <PaginationButtons
                numberOfPages={state.numberOfPages}
                page={state.page}
                setPage={setPage}
                dispatch={dispatch}
              />
            </Jumbotron>
          </Route>

          <Route
            path="/asset"
            exact
            render={(props) => (
              <AssetForm
                {...props}
                create={true}
                categories={state.categories}
                locations={state.locations}
                dispatch={dispatch}
                addAsset={addAsset}
              />
            )}
          />

          <Route
            path="/asset/:id"
            render={(props) => (
              <AssetForm
                {...props}
                create={false}
                assetToUpdate={state.assets.find(
                  (x) => x._id === props.match.params.id
                )}
                categories={state.categories}
                locations={state.locations}
                dispatch={dispatch}
                updateAsset={updateAsset}
              />
            )}
          />

          <Route path="/categories">
            <ManageCategories
              categories={state.filteredCategories}
              loading={state.loading}
              error={state.error}
              dispatch={dispatch}
              refreshAfterError={refreshAfterError}
              searchTerm={state.categorySearchTerm}
              changeSearchTerm={changeCategorySearchTerm}
              deleteCategory={deleteCategory}
            />
             <Jumbotron>
                  <PaginationButtons
                    numberOfPages={state.numberOfCatPages}
                    page={state.page}
                    setPage={setPage}
                    dispatch={dispatch}
                  />
                </Jumbotron>
          </Route>

          <Route
            path="/category"
            exact
            render={(props) => (
              <CategoryForm
                {...props}
                create={true}
                dispatch={dispatch}
                addCategory={addCategory}
              />
            )}
          />

          <Route
            path="/category/:id"
            render={(props) => (
              <CategoryForm
                {...props}
                create={false}
                categoryToUpdate={state.categories.find(
                  (x) => x._id === props.match.params.id
                )}
                dispatch={dispatch}
                updateCategory={updateCategory}
              />
            )}
          />

          <Route path="/locations">
            <ManageLocations
              locations={state.filteredLocations}
              loading={state.loading}
              error={state.error}
              dispatch={dispatch}
              refreshAfterError={refreshAfterError}
              searchTerm={state.locationSearchTerm}
              changeSearchTerm={changeLocationSearchTerm}
              deleteLocation={deleteLocation}
            />
            <Jumbotron>
                <PaginationButtons
                  numberOfPages={state.numberOfLocPages}
                  page={state.page}
                  setPage={setPage}
                  dispatch={dispatch}
                />
              </Jumbotron>
          </Route>

          <Route
            path="/location"
            exact
            render={(props) => (
              <LocationForm
                {...props}
                create={true}
                dispatch={dispatch}
                addLocation={addLocation}
              />
            )}
          />

          <Route
            path="/location/:id"
            render={(props) => (
              <LocationForm
                {...props}
                create={false}
                locationToUpdate={state.locations.find(
                  (x) => x._id === props.match.params.id
                )}
                dispatch={dispatch}
                updateLocation={updateLocation}
              />
            )}
          />

          <Route path="/*" component={NotFound} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;

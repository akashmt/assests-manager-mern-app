const Location = require("../models/location");
const Asset = require("../models/asset");
const defineSearchQuery = require("../utils/define-search-query");
const calculatePaginationValues = require("../utils/calculate-pagination-values");

/** POST: Create a Location
 * FILTER: .save()
 */
exports.createLocation = async (req, res, next) => {
  try {
    const location = await new Location(req.body).save();
    res.status(200).json({ data: location });
  } catch (err) {
    next(err);
  }
};

/** GET: Read Locations
 * FILTER: .find().sort("name")
 */
exports.readLocations = async (req, res, next) => {
  try {
    const searchQuery = defineSearchQuery(req);
    const pagination = calculatePaginationValues(req);
    const allLocationsCount = await Location.estimatedDocumentCount();
    const filteredLocationsCount = searchQuery
      ? (await Location.find(searchQuery)).length
      : allLocationsCount;
    const locations = await Location.find(searchQuery)
    .skip(pagination.startIndex)
    .limit(pagination.limit)
    .sort("name");
    res.status(200).json({ 
      all: allLocationsCount,
      filtered: filteredLocationsCount,
      count: locations.length,
      page: pagination.page,
      limit: pagination.limit,
      previous: pagination.previous,
      next:
        pagination.nextPageIndex < filteredLocationsCount ? pagination.next : null,
      data: locations 
    });
  } catch (err) {
    next(err);
  }
};

/** GET: Read a Location
 * FILTER: .findById(req.params.id).sort("name")
 */
exports.readLocation = async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id).sort("name");
    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }
    res.status(200).json({ data: location });
  } catch (err) {
    next(err);
  }
};

/** PATCH: Update a Location
 * FILTER: .findById(req.params.id)
 * QUERY: set(req.body).save()
 */
/** PATCH updates parts, while PUT updates the whole resource
 * but.. in mongo/mongoose PUT and PACTH are the same
 * we will use PATCH for semantic reasons (and learning)
 */
exports.updateLocation = async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id);

    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }
    await location.set(req.body).save();
    res.status(200).json({ data: location });
  } catch (err) {
    next(err);
  }
};

/** DELETE: Delete a Location
 * FILTER: .findById(req.params.id)
 * QUERY: remove()
 */
exports.deleteLocation = async (req, res, next) => {
  try {
    const loc = await Location.findById(req.params.id);
    if (!loc) {
      return res.status(404).json({ error: "Location not found" });
    }
    const assets = await Asset.find({ location: loc.id });
    if (assets.length > 0) {
      return res
        .status(403)
        .json({ error: "Forbidden: Location is used in Asset documents" });
    }
    const deleted = await loc.remove();
    res.status(200).json({ data: deleted });
  } catch (err) {
    next(err);
  }
};

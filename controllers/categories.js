const Category = require("../models/category");
const Asset = require("../models/asset");
const defineSearchQuery = require("../utils/define-search-query");
const calculatePaginationValues = require("../utils/calculate-pagination-values");

/** POST: Create a Category
 * FILTER: .save()
 */
exports.createCategory = async (req, res, next) => {
  try {
    const category = await new Category(req.body).save();
    res.status(200).json({ data: category });
  } catch (err) {
    next(err);
  }
};

/** GET: Read Categories
 * FILTER: .find().sort("name")
 */
exports.readCategories = async (req, res, next) => {
  try {
    const searchQuery = defineSearchQuery(req);
    const pagination = calculatePaginationValues(req);
    const allCategoriesCount = await Category.estimatedDocumentCount();
    const filteredCategoriesCount = searchQuery
      ? (await Category.find(searchQuery)).length
      : allCategoriesCount;
    const categories = await Category.find(searchQuery)
      .skip(pagination.startIndex)
      .limit(pagination.limit)
      .sort("name");
    res.status(200).json({ 
      all: allCategoriesCount,
      filtered: filteredCategoriesCount,
      count: categories.length,
      page: pagination.page,
      limit: pagination.limit,
      previous: pagination.previous,
      next:
        pagination.nextPageIndex < filteredCategoriesCount ? pagination.next : null,
      data: categories });
  } catch (err) {
    next(err);
  }
};

/** GET: Read a Category
 * FILTER: .findById(req.params.id).sort("name")
 */
exports.readCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id).sort("name");
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json({ data: category });
  } catch (err) {
    next(err);
  }
};

/** PATCH: Update a Category
 * FILTER: .findById(req.params.id)
 * QUERY: set(req.body).save()
 */
/** PATCH updates parts, while PUT updates the whole resource
 * but.. in mongo/mongoose PUT and PACTH are the same
 * we will use PATCH for semantic reasons (and learning)
 */
exports.updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    await category.set(req.body).save();
    res.status(200).json({ data: category });
  } catch (err) {
    next(err);
  }
};

/** DELETE: Delete a Category |
 * FILTER: .findById(req.params.id)
 * QUERY: remove()
 */
exports.deleteCategory = async (req, res, next) => {
  try {
    const cat = await Category.findById(req.params.id);
    if (!cat) {
      return res.status(404).json({ error: "Category not found" });
    }
    const assets = await Asset.find({ category: cat.id });
    if (assets.length > 0) {
      return res
        .status(403)
        .json({ error: "Forbidden: Category is used in Asset documents" });
    }
    const deleted = await cat.remove();
    res.status(200).json({ data: deleted });
  } catch (err) {
    next(err);
  }
};

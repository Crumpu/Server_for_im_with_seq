const { Router } = require("express");
// ================================
const brandRouters = require("./brandRouters");
const customerRouters = require("./customerRouters");
const categoryRouters = require("./categoryRouters");
const typeRouters = require("./typeRouters");
const storeRouters = require("./storeRouters");
const orderRouters = require("./orderRouters");
const modelRouters = require("./modelRouters");
const itemRouters = require("./itemRouters");
const infoRouters = require("./infoRouters")


const router = new Router();

router.use("/brands", brandRouters);
router.use("/customers", customerRouters);
router.use("/categories", categoryRouters);
router.use("/types", typeRouters);
router.use("/stores", storeRouters);
router.use("/orders", orderRouters);
router.use("/models", modelRouters);
router.use("/items", itemRouters);
router.use("/info", infoRouters);


module.exports = router;

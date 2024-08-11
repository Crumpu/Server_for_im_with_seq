const { Router } = require("express");
// ================================
const brandRouters = require("./brandRouters");
const customerRouters = require("./customerRouters");
const categoryRouters = require("./categoryRouters");
const typeRouters = require("./typeRouters");
const storeRouters = require("./storeRouters");

const router = new Router();

router.use("/brands", brandRouters);
router.use("/customers", customerRouters);
router.use("/categories", categoryRouters);
router.use("/types", typeRouters);
router.use("/stores", storeRouters);

module.exports = router;

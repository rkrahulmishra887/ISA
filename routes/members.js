const express = require("express");

const router = express.Router();

module.exports = (params) => {
  const { membersService } = params;

  router.get("/", async (request, response, next) => {
    try {
      const members = await membersService.getList();

      const artwork = await membersService.getAllArtwork();

      return response.render("layout", {
        pageTitle: "Members",
        template: "members",
        members,
        artwork,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.get("/:shortname", async (request, response, next) => {
    try {
      const member = await membersService.getMember(request.params.shortname);
      const artwork = await membersService.getArtworkForMember(
        request.params.shortname
      );
      return response.render("layout", {
        pageTitle: "Members",
        template: "Members-detail",
        member,
        artwork,
      });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};

const axios = require("axios");

let BG_IMAGE_URL = "";
async function getImageUrl() {
  if (BG_IMAGE_URL) return BG_IMAGE_URL;
  return await axios
    .get("https://source.unsplash.com/collection/collectionid/1920x1080", {
      maxRedirects: 0
    })
    .catch(res => {
      if (BG_IMAGE_URL) return BG_IMAGE_URL;
      if (res && res.response) {
        if (res.response.status === 302) {
          if (res.response.headers && res.response.headers.location) {
            BG_IMAGE_URL = res.response.headers.location;
            return BG_IMAGE_URL;
          }
        }
      }
      return "";
    });
}

module.exports = (options = {}, context) => ({
  async extendPageData($page) {
    if ($page.frontmatter) {
      if ($page.frontmatter.home && $page.frontmatter.blog) {
        $page.frontmatter.bgImage = await getImageUrl();
      }
    }
  }
});

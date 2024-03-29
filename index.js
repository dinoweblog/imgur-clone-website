let tagContent = [
  {
    image: "images/tagImg1.png",
    title: "Space",
    content: "FEATURED 28,291 posts",
    divNo: 1,
    colorIs: "darkslategray",
  },
  {
    image: "images/tagImg2.jpg",
    title: "Imgur13",
    content: "7,842 posts",
    divNo: 2,
    colorIs: "darkslateblue",
  },
  {
    image: "images/tagImg3.jpg",
    title: "Vintage",
    content: "8,926 posts",
    divNo: 3,
    colorIs: "seagreen",
  },
  {
    image: "images/tagImg4.jpg",
    title: "Pokemon",
    content: "52,584 posts",
    divNo: 4,
    colorIs: "indianred",
  },
  {
    image: "images/tagImg5.jpg",
    title: "Black History Month",
    content: "184 posts",
    divNo: 5,
    colorIs: "#328d67",
  },
  {
    image: "images/tagImg6.jpg",
    title: "Science And Tech",
    content: "44,943 posts",
    divNo: 6,
    colorIs: "#e47d57",
  },
  {
    image: "images/tagImg7.jpg",
    title: "Staff Picks",
    content: "6,536 posts",
    divNo: 7,
    colorIs: "#132d31",
  },
  {
    image: "images/tagImg8.jpg",
    title: "Gaming",
    content: "298,228 posts",
    divNo: 8,
    colorIs: "#2b1a5a",
  },
  {
    image: "images/tagImg9.jpg",
    title: "Memes",
    content: "571,088 posts",
    divNo: 9,
    colorIs: "#ba519f",
  },
  {
    image: "images/tagImg10.jpg",
    title: "OC",
    content: "39,274 posts",
    divNo: 10,
    colorIs: "#ab80b8",
  },
];

let data = [];

async function fetchData(url) {
  await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Client-ID 72ebaa80e0288fb",
    },
  })
    .then(async (response) => {
      const res = await response.json();

      data = res.data;

      showData(data);
    })
    .catch((e) => {
      console.log(e);
    });
}

// clientID: 72ebaa80e0288fb
// clientSecret: a1aba82b2105a9b9634d1e446c1502e6cc41ad33

let url = "https://api.imgur.com/3/gallery/hot/viral/";
fetchData(url);

//show data
function showData(data) {
  let postDivContainer = document.getElementById("all_data_show");
  postDivContainer.innerHTML = null;

  // grid design starts
  let gridDeisgn = document.getElementById("waterfallDesign").style.display;

  // autoplay start
  let autoPlayIs = document.getElementById("autoplay").style.display;
  console.log("autoPlayIs:", autoPlayIs);

  if (gridDeisgn == "block") {
    postDivContainer.className = "all_data_show__waterfall";
  } else {
    postDivContainer.className = "all_data_show__grid";
  }

  data.forEach((item) => {
    let postBodyDiv = document.createElement("div");

    if (gridDeisgn == "block") {
      postBodyDiv.className = `item`;
    } else {
      postBodyDiv.className = `all_data_show__itemDiv`;
    }

    let postTextDiv = document.createElement("div");
    if (gridDeisgn == "block") {
      postTextDiv.className = `waterfall`;
    } else {
      postTextDiv.className = `all_item_show_grid`;
    }

    //post title div
    let postTitle = document.createElement("h2");
    postTitle.className = `all_item_show_title`;
    postTitle.textContent = item.title;

    // postdata div
    let postDataFlexDiv = document.createElement("div");
    postDataFlexDiv.className = `all_item_show_post`;

    //left side of post data
    let postDataLeftDiv = document.createElement("div");
    postDataLeftDiv.className = `all_item_show_postcontent`;
    let leftPostData = document.createElement("span");
    leftPostData.innerHTML = `⬆ ${item.score} ⬇`;

    //middle data div
    let middleData = document.createElement("h3");
    middleData.className = `all_item_show`;
    middleData.textContent = `🗨 ${item.comment_count}`;

    //right Data
    let rightData = document.createElement("h3");
    rightData.className = `all_item_show`;
    rightData.textContent = `👁 ${item.views}`;

    postDataLeftDiv.append(leftPostData);

    // append in postdata div
    postDataFlexDiv.append(postDataLeftDiv, middleData, rightData);

    // post text content div
    postTextDiv.append(postTitle, postDataFlexDiv);

    postBodyDiv.append(postTextDiv);

    if (item.images) {
      let extension = item.images[0].link.split(".")[3];

      if (extension == "mp4") {
        let video = document.createElement("video");
        video.src = item.images[0].link;

        if (autoPlayIs == "block") {
          video.autoplay = true;
        } else {
          video.autoplay = false;
        }

        video.muted = true;

        if (gridDeisgn == "block") {
          video.className = `waterfall_img`;
        } else {
          video.className = `all_item_show_img_grid`;
        }

        postBodyDiv.append(video);
      } else {
        let img = document.createElement("img");
        if (gridDeisgn == "block") {
          img.className = `waterfall_img`;
        } else {
          img.className = `all_item_show_img_grid`;
        }
        img.src = item.images[0].link;
        img.alt = "imgur";
        postBodyDiv.append(img);
      }

      postDivContainer.append(postBodyDiv);
    }
  });
}

// tag show div
tagContent.forEach((item) => {
  let tagDivContainer = document.getElementById("tag_div_img");

  let commonTagDiv = document.createElement("div");
  commonTagDiv.addEventListener("mouseover", () => {
    commonTagDiv.style.margin = "-6px 6px 0";
  });
  commonTagDiv.addEventListener("mouseout", () => {
    commonTagDiv.style.margin = "6px 6px 0";
  });

  commonTagDiv.className = `common_tag tag_div_img--tag${item.divNo}Div`;

  let tagImageDiv = document.createElement("div");
  tagImageDiv.className = `tag_image_div tag_image_div--tag${item.divNo}`;
  tagImageDiv.style.backgroundImage = `url(${item.image})`;

  let tagContentDiv = document.createElement("div");
  tagContentDiv.className = `tag_image_div_com tag_image_div_com--tag${item.divNo}`;
  tagContentDiv.style.backgroundColor = item.colorIs;

  let tagContent1 = document.createElement("p");
  tagContent1.className = `tag_image_div1`;
  tagContent1.textContent = item.title;

  let tagContent2 = document.createElement("p");
  tagContent2.className = `tag_image_div2`;
  tagContent2.textContent = item.content;

  tagContentDiv.append(tagContent1, tagContent2);

  commonTagDiv.append(tagImageDiv, tagContentDiv);

  tagDivContainer.append(commonTagDiv);
});

// on scroll style

let topDiv = document.getElementById("topDiv");
window.onscroll = () => {
  let windowScrollY = window.scrollY;
  if (windowScrollY > 312) {
    document.getElementById("nav_div").style.position = "relative";
    document.getElementById("postNavbar").style.position = "fixed";
    document.getElementById("postNavbar").style.top = 0;
    document.getElementById("postNavbar").style.backgroundColor = "#2e3035";
    document.getElementById("postNavbar").style.zIndex = 15;
  } else {
    document.getElementById("nav_div").style.position = "fixed";
    document.getElementById("postNavbar").style.position = "relative";
    document.getElementById("postNavbar").style.backgroundColor = "transparent";
  }
};

// input styling
//left side
document
  .getElementById("leftSortHeader")
  .addEventListener("click", function () {
    let val = document.getElementById("left_post_option").style.display;
    document.getElementById("left_post_option").style.display = "block";
    if (val === "block") {
      document.getElementById("left_post_option").style.display = "none";
    }
  });

function option_title(sortTitle) {
  document.getElementById(
    "leftSortHeader"
  ).textContent = `${sortTitle} \u00A0\u00A0 ⯆`;
  document.getElementById("left_post_option").style.display = "none";

  if (sortTitle === "most viral") {
    let url = "https://api.imgur.com/3/gallery/hot/viral/";
    fetchData(url);
  } else if (sortTitle === "highest scoring") {
    let url = "https://api.imgur.com/3/gallery/top/top/";
    fetchData(url);
  } else if (sortTitle === "user submitted") {
    let url = "https://api.imgur.com/3/gallery/user/rising/";
    fetchData(url);
  }
}

//right side
document
  .getElementById("rightSortHeader")
  .addEventListener("click", function () {
    let val = document.getElementById("right_post_nav_option").style.display;
    document.getElementById("right_post_nav_option").style.display = "block";
    if (val === "block") {
      document.getElementById("right_post_nav_option").style.display = "none";
    }
  });

function rightPostOption(sortTitle) {
  document.getElementById(
    "rightSortHeader"
  ).textContent = `${sortTitle} \u00A0\u00A0 ⯆`;
  document.getElementById("right_post_nav_option").style.display = "none";

  if (sortTitle === "newest") {
    let url = "https://api.imgur.com/3/gallery/hot/time/";
    fetchData(url);
  } else if (sortTitle === "popular") {
    let url = "https://api.imgur.com/3/gallery/top/viral/";
    fetchData(url);
  } else if (sortTitle === "best") {
    let url = "https://api.imgur.com/3/gallery/top/top/";
    fetchData(url);
  } else {
    let urls = [
      "https://api.imgur.com/3/gallery/hot/time/",
      "https://api.imgur.com/3/gallery/top/viral/",
      "https://api.imgur.com/3/gallery/top/top/",
      "https://api.imgur.com/3/gallery/user/rising/",
    ];

    let num = Math.floor(Math.random() * 4);
    let url = urls[num];
    fetchData(url);
  }
}

//debouncing section
let queryInputBox = document.getElementById("queryInputBox");
queryInputBox.onchange = debounceData;

let id;

function debounceData() {
  clearTimeout(id);
  id = setTimeout(async () => {
    let queryIs = queryInputBox.value;
    let queryUrl = `https://api.imgur.com/3/gallery/search?q=${queryIs}`;

    await fetch(queryUrl, {
      method: "GET",
      headers: {
        Authorization: "Client-ID 72ebaa80e0288fb",
      },
    })
      .then(async (response) => {
        const res = await response.json();

        data = res.data;

        data.splice(9, data.length);
        console.log("data:", data);

        showDebounceData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, 1000);
}

function showDebounceData(data) {
  let debounceDiv = document.getElementById("debounce_blank_div");
  debounceDiv.style.display = "block";

  data.forEach((item) => {
    let queryResult = document.createElement("p");
    queryResult.className = "queryResultItem";
    queryResult.textContent = item.title;

    queryResult.addEventListener("click", () => {
      window.location.href = item.link;
    });

    let br = document.createElement("br");

    debounceDiv.append(queryResult, br);
  });
}

document.getElementById("createNewPost").addEventListener("click", () => {
  window.location.href = "uploadPage.html";
});

// layout toggle

document.getElementById("waterfallDesign").addEventListener("click", () => {
  document.getElementById("waterfallDesign").style.display = "none";
  document.getElementById("gridDesign").style.display = "block";
  showData(data);
});

document.getElementById("gridDesign").addEventListener("click", () => {
  document.getElementById("waterfallDesign").style.display = "block";
  document.getElementById("gridDesign").style.display = "none";
  showData(data);
});

// autoplay toggle

document.getElementById("autoplay").addEventListener("click", () => {
  document.getElementById("autoplay").style.display = "none";
  document.getElementById("autoplayFalse").style.display = "block";
  showData(data);
});

document.getElementById("autoplayFalse").addEventListener("click", () => {
  document.getElementById("autoplay").style.display = "block";
  document.getElementById("autoplayFalse").style.display = "none";
  showData(data);
});

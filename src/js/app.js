import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables); // print on the console

  // Determine cover image
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";

  // Construct full name
  const fullName = `${variables.name || "Lucy"} ${variables.lastName ||
    "Boilett"}`;

  // Determine location
  const location = `${variables.city || "Miami"}, ${variables.country ||
    "USA"}`;

  // Social media links
  const socialMedia = {
    twitter: variables.twitter
      ? `<li><a href="https://twitter.com/${variables.twitter}"><i class="fab fa-twitter"></i></a></li>`
      : "",
    github: variables.github
      ? `<li><a href="https://github.com/${variables.github}"><i class="fab fa-github"></i></a></li>`
      : "",
    linkedin: variables.linkedin
      ? `<li><a href="https://linkedin.com/in/${variables.linkedin}"><i class="fab fa-linkedin"></i></a></li>`
      : "",
    instagram: variables.instagram
      ? `<li><a href="https://instagram.com/${variables.instagram}"><i class="fab fa-instagram"></i></a></li>`
      : ""
  };

  // Social media position
  const socialMediaClass =
    variables.socialMediaPosition === "left"
      ? "position-left"
      : "position-right";

  // Reset the website body with the new HTML output
  document.querySelector("#widget_content").innerHTML = `<div class="widget">
            ${cover}
          <img src="${variables.avatarURL}" class="photo" />
          <h1>${fullName}</h1>
          <h2>${variables.role || "Web Developer"}</h2>
          <h3>${location}</h3>
          <ul class="${socialMediaClass}">
            ${socialMedia.twitter}
            ${socialMedia.github}
            ${socialMedia.linkedin}
            ${socialMedia.instagram}
          </ul>
        </div>`;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should show the cover image
    includeCover: true,
    // this is the image's url that will be used as a background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (left or right)
    socialMediaPosition: "right",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};

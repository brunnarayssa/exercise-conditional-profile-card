import "../style/index.css";

function render(variables = {}) {
  console.log("These are the current variables: ", variables); // print on the console

  // Determina la imagen de fondo
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover === false) cover = "<div class='cover'></div>";

  // Construye el nombre completo
  const fullName = `${variables.name || "Lucy"} ${variables.lastName ||
    "Boilett"}`;

  // Determina la ubicación
  const location = `${variables.city || "Miami"}, ${variables.country ||
    "USA"}`;

  // Enlaces de redes sociales
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

  // Determina la clase de posición de las redes sociales
  const socialMediaClass =
    variables.socialMediaPosition === "position-left"
      ? "position-left"
      : "position-right";

  // Reinicia el contenido HTML de la página con la nueva salida HTML
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

// Cuando la página carga
window.onload = function() {
  window.variables = {
    includeCover: true,
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    socialMediaPosition: "position-right", // Cambia entre "position-left" y "position-right"
    twitter: "lucy_twitter",
    github: "lucy_github",
    linkedin: "lucy_linkedin",
    instagram: "lucy_instagram",
    name: "Lucy",
    lastName: "Boilett",
    role: "Web Developer",
    country: "USA",
    city: "Miami"
  };
  render(window.variables);

  // Escucha los cambios en los inputs
  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      const attribute = e.target.getAttribute("for");
      let values = {};
      values[attribute] =
        this.value === "" || this.value === "null"
          ? null
          : this.value === "true"
          ? true
          : this.value === "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // Rerender con nuevos valores
    });
  });
};

let travelData = [];

fetch('travel_recommendation_api.json')
  .then((Response) => Response.json())
  .then((data) => {
    travelData = data;
  })
  .catch((error) => console.error("Error loading JSON", error));

function searchDestinations() {
  const query = document.getElementById('searchInputId').value.toLowerCase();
  console.log(query + "AAAAAAAAAAAAAAAA");
  const results = [];

  for (const country of travelData) {
    // Buscar por país
    if (country.name.toLowerCase().includes(query)) {
      country.cities.forEach(city => {
        if (results.length < 2) results.push(city);
      });
    }

    // Buscar por ciudad o descripción
    country.cities.forEach(city => {
      const nameMatch = city.name.toLowerCase().includes(query);
      const descMatch = city.description.toLowerCase().includes(query);

      if ((nameMatch || descMatch) && !results.includes(city)) {
        if (results.length < 2) results.push(city);
      }
    });

    if (results.length >= 2) break; // Detener una vez tengamos 2 resultados
  }

  showResults(results);
}

function showResults(results) {
  const popup = document.getElementById("resultsPopup");
  popup.innerHTML = "";

  if (results.length === 0) {
    popup.style.display = "none";
    return;
  }

  results.forEach((result) => {
    const div = document.createElement("div");
    div.className = "result";
    div.innerHTML = `
          <img src="${result.imageUrl}" alt="${result.name}">
          <h3>${result.name}</h3>
          <p>${result.description}</p>
        `;
    popup.appendChild(div);
  });

  popup.style.display = "block";
}

function clearSearch() {
  document.getElementById("searchInputId").value = "";
  document.getElementById("resultsPopup").style.display = "none";
}

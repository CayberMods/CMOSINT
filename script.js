async function searchOSINT() {
    const query = document.getElementById("searchQuery").value;
    if (!query) {
        alert("Masukkan kata kunci terlebih dahulu!");
        return;
    }

    const apiKey = "";
    const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&location=Austin,Texas,United+States&hl=en&gl=us&google_domain=google.com&api_key=${apiKey}`;

    document.getElementById("output").textContent = "🔄 Sedang mencari...";

    try {
        const response = await fetch(url);
        const data = await response.json();

        let output = "";

        if (!data.organic_results || data.organic_results.length === 0) {
            output = "❌ Tidak ada hasil ditemukan.";
        } else {
            data.organic_results.forEach((result, index) => {
                let title = result.title || "No Title";
                let link = result.link || "#";
                let snippet = result.snippet || "No Description";

                output += `${index + 1}. 🔗 <a href="${link}" target="_blank">${title}</a>\n📜 ${snippet}\n\n`;
            });
        }

        document.getElementById("output").innerHTML = output.replace(/\n/g, "<br>");
    } catch (error) {
        document.getElementById("output").textContent = "❌ Error: " + error.message;
    }
}

<!DOCTYPE html>
<html>
<head>
    <title>Weather Search History Tracker</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 700px;
            margin: 30px auto;
            padding: 20px;
        }

        input, button {
            padding: 10px;
            margin: 5px;
        }

        .history-item {
            border: 1px solid #ddd;
            padding: 10px;
            margin-top: 8px;
            border-radius: 5px;
        }

        h2 {
            color: #333;
        }
    </style>
</head>
<body>

    <h2>Weather Search History Tracker</h2>

    <input type="text" id="cityInput" placeholder="Enter City Name">
    <button onclick="searchWeather()">Search</button>

    <h3>Search History</h3>
    <div id="history"></div>

    <script>
        // Load history on page load
        displayHistory();

        function searchWeather() {
            const city = document.getElementById("cityInput").value.trim();

            if (!city) {
                alert("Enter a city name");
                return;
            }

            // Create history record
            const record = {
                city: city,
                date: new Date().toLocaleString()
            };

            let history = JSON.parse(localStorage.getItem("weatherHistory")) || [];

            history.unshift(record);

            // Keep only last 20 searches
            history = history.slice(0, 20);

            localStorage.setItem("weatherHistory", JSON.stringify(history));

            displayHistory();

            document.getElementById("cityInput").value = "";
        }

        function displayHistory() {
            const historyDiv = document.getElementById("history");
            const history = JSON.parse(localStorage.getItem("weatherHistory")) || [];

            historyDiv.innerHTML = "";

            if (history.length === 0) {
                historyDiv.innerHTML = "<p>No search history yet.</p>";
                return;
            }

            history.forEach(item => {
                const div = document.createElement("div");
                div.className = "history-item";
                div.innerHTML = `
                    <strong>City:</strong> ${item.city}<br>
                    <strong>Searched:</strong> ${item.date}
                `;
                historyDiv.appendChild(div);
            });
        }
    </script>

</body>
</html>

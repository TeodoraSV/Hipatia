getData();

var map = L.map('mapid').setView([42, 25.5], 7);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


L.marker([42.56, 27.6]).addTo(map)
    .bindPopup('p')
    .openPopup();
async function getData() {
    const response = await fetch('/api');
    const data = await response.json();

    for (item of data) {
        const root = document.createElement('p');
        const mood = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');
        const image = document.createElement('img');

        mood.textContent = `mood: ${item.mood}`;
        geo.textContent = `${item.lat}°, ${item.lon}°`;
        const dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = dateString;
        image.src = item.image64;
        image.alt = 'Selfies';

        L.marker([item.lat, item.lon]).addTo(map)
            .bindPopup(mood.textContent+" "+date.textContent)
            .openPopup();
        root.append(mood, geo, date, image);

        document.body.append(root);
    }
    console.log(data);
}
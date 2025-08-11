const dscc = require('dscc');

function drawChart(data) {
  // Extract labels (dimension values)
  const labels = data.tables.DEFAULT.map(row => row.dimension[0]);

  // Extract metric values
  const values = data.tables.DEFAULT.map(row => row.metric[0]);

  // Clear previous chart
  document.getElementById('chart-container').innerHTML = '<canvas id="radarChart"></canvas>';

  const ctx = document.getElementById('radarChart').getContext('2d');

  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: labels,
      datasets: [{
        label: data.fields.metric[0].name,
        data: values,
        backgroundColor: 'rgba(54, 162, 235, 0.3)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          beginAtZero: true,
          suggestedMax: Math.max(...values) * 1.2
        }
      },
      plugins: {
        legend: {
          position: 'top'
        }
      }
    }
  });
}

// Render function
dscc.subscribeToData(drawChart, { transform: dscc.tableTransform });

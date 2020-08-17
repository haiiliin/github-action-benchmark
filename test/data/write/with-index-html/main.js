'use strict';

(function () {

  function setupData(data) {

    // Render header
    document.getElementById('last-update').textContent = new Date(data.lastUpdate).toString();
    const repoLink = document.getElementById('repository-link');
    repoLink.href = data.repoUrl;
    repoLink.textContent = data.repoUrl;

    // Render footer
    document.getElementById('dl-button').onclick = () => {
      const dataUrl = 'data:,' + JSON.stringify(data, null, 2);
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'benchmark_data.json';
      a.click();
    };

    // Prepare data points for charts
    return Object.keys(data.entries).map(name => ({
      name,
      xAxis: data.xAxis,
      dataSet: collectBenchesPerTestCasePerGroup(data.entries[name]),
    }));
  }

  function collectBenchesPerTestCasePerGroup(entries) {
    const map = new Map();
    for (const entry of entries) {
      const { commit, date, tool, benches, cpu } = entry;
      for (const bench of benches) {
        const result = { commit, date, tool, bench, cpu };
        const group = bench.group ? bench.group : null
        var gmap = map.get(group);
        if (gmap === undefined) {
          map.set(group, new Map());
          gmap = map.get(group);
        }
        const arr = gmap.get(bench.name);
        if (arr === undefined) {
          gmap.set(bench.name, [result]);
        } else {
          arr.push(result);
        }
      }
    }
    return map;
  }

  function renderGraph(parent, name, dataset, xAxis) {
    const canvas = document.createElement('canvas');
    canvas.className = 'benchmark-chart';
    parent.appendChild(canvas);
    const color = '#3572a5';
    const data = {
      labels: dataset.map(d => (xAxis === 'date') ? moment(d.commit.timestamp) : d.commit.id.slice(0, 7)),
      datasets: [
        {
          label: name,
          data: dataset.map(d => d.bench.value),
          borderColor: color,
          backgroundColor: color + '60', // Add alpha for #rrggbbaa
          spanGaps: true,
        }
      ],
    };
    const xAxes = {
      scaleLabel: {
        display: true,
        labelString: 'Commit ID',
      },
    }
    if (xAxis === 'date') {
      xAxes['type'] = 'time'
      xAxes['time'] = {
        minUnit: 'second'
      }
      xAxes.scaleLabel.labelString = 'Commit Time'
    }
    const yAxes = {
      scaleLabel: {
        display: true,
        labelString: dataset.length > 0 ? dataset[0].bench.unit : '',
      },
      ticks: {
        beginAtZero: true,
      }
    }
    const options = {
      scales: {
        xAxes: [xAxes],
        yAxes: [yAxes],
      },
      tooltips: {
        callbacks: {
          afterTitle: items => {
            const { index } = items[0];
            const data = dataset[index];
            const lines = [data.commit.message + '\n', data.commit.timestamp]
            if (data.cpu) {
              lines.push('\nCPU:')
              for (const [key, value] of Object.entries(data.cpu)) {
                lines.push(`  ${key}: ${value}`)
              }
            }
            return '\n' + lines.join('\n') + '\n';
          },
          label: item => {
            let label = Number.parseFloat(item.value).toPrecision(5);
            const { range, unit } = dataset[item.index].bench;
            label += ' ' + unit;
            if (range) {
              label += ' (' + range + ')';
            }
            return label;
          },
          afterLabel: item => {
            const { extra } = dataset[item.index].bench;
            return extra ? '\n' + extra : '';
          }
        }
      },
      onClick: (_mouseEvent, activeElems) => {
        if (activeElems.length === 0) {
          return;
        }
        // XXX: Undocumented. How can we know the index?
        const index = activeElems[0]._index;
        const url = dataset[index].commit.url;
        window.open(url, '_blank');
      },
    };
    new Chart(canvas, {
      type: 'line',
      data,
      options,
    });
  }

  function renderBenchSet(name, benchSets, main, xAxis) {
    const setElem = document.createElement('div');
    setElem.className = 'benchmark-set';
    main.appendChild(setElem);

    const nameElem = document.createElement('h1');
    nameElem.className = 'benchmark-title';
    nameElem.textContent = name;
    setElem.appendChild(nameElem);

    for (const [groupName, benchSet] of benchSets.entries()) {

      if (groupName) {
        const nameElem = document.createElement('h2');
        nameElem.className = 'benchmark-group';
        nameElem.textContent = groupName
        setElem.appendChild(nameElem);
      }
      const graphsElem = document.createElement('div');
      graphsElem.className = 'benchmark-graphs';
      setElem.appendChild(graphsElem);

      for (const [benchName, benches] of benchSet.entries()) {
        renderGraph(graphsElem, benchName, benches, xAxis)
      }
    }
  }

  function renderAllCharts(dataSets, byDate) {
    const main = document.getElementById('main');
    for (const { name, dataSet, xAxis } of dataSets) {
      renderBenchSet(name, dataSet, main, xAxis);
    }
  }

  renderAllCharts(setupData(window.BENCHMARK_DATA));
})();

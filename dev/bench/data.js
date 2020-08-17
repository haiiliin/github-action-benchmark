window.BENCHMARK_DATA = {
  "lastUpdate": 1597639724747,
  "repoUrl": "https://github.com/chrisjsewell/github-action-benchmark",
  "xAxis": "id",
  "oneChartGroups": [
    "group1"
  ],
  "entries": {
    "Python Benchmark with pytest-benchmark": [
      {
        "cpu": {
          "speed": "2.30",
          "cores": 2,
          "physicalCores": 2,
          "processors": 1
        },
        "commit": {
          "author": {
            "email": "chrisj_sewell@hotmail.com",
            "name": "Chris Sewell",
            "username": "chrisjsewell"
          },
          "committer": {
            "email": "chrisj_sewell@hotmail.com",
            "name": "Chris Sewell",
            "username": "chrisjsewell"
          },
          "distinct": true,
          "id": "d0837da489fe66132d279cd15fab347fec3ca21f",
          "message": "Update pytest.yml",
          "timestamp": "2020-08-17T05:43:46+01:00",
          "tree_id": "3e6cefefe59fae4988555ed837b7264f062dd205",
          "url": "https://github.com/chrisjsewell/github-action-benchmark/commit/d0837da489fe66132d279cd15fab347fec3ca21f"
        },
        "date": 1597639458923,
        "benches": [
          {
            "name": "bench.py::test_fib_10",
            "value": 44467.51853164901,
            "unit": "iter/sec",
            "range": "stddev: 0.0000042736",
            "group": null,
            "extra": "mean: 22.488 usec\nrounds: 30212"
          },
          {
            "name": "bench.py::test_fib_20",
            "value": 363.5768648936411,
            "unit": "iter/sec",
            "range": "stddev: 0.000063514",
            "group": "group1",
            "extra": "mean: 2.7505 msec\nrounds: 365"
          },
          {
            "name": "bench.py::test_fib_21",
            "value": 224.90422436265553,
            "unit": "iter/sec",
            "range": "stddev: 0.00013970",
            "group": "group1",
            "extra": "mean: 4.4463 msec\nrounds: 227"
          }
        ]
      },
      {
        "cpu": {
          "speed": "2.30",
          "cores": 2,
          "physicalCores": 2,
          "processors": 1
        },
        "commit": {
          "author": {
            "email": "chrisj_sewell@hotmail.com",
            "name": "Chris Sewell",
            "username": "chrisjsewell"
          },
          "committer": {
            "email": "chrisj_sewell@hotmail.com",
            "name": "Chris Sewell",
            "username": "chrisjsewell"
          },
          "distinct": true,
          "id": "5a066d0ec96ea1305b556d338387d3adb36091a9",
          "message": "Update README.md",
          "timestamp": "2020-08-17T05:48:08+01:00",
          "tree_id": "c863733f17892a0674ecae57c6d05e1e56a8f294",
          "url": "https://github.com/chrisjsewell/github-action-benchmark/commit/5a066d0ec96ea1305b556d338387d3adb36091a9"
        },
        "date": 1597639723208,
        "benches": [
          {
            "name": "bench.py::test_fib_10",
            "value": 53448.01197452296,
            "unit": "iter/sec",
            "range": "stddev: 0.0000095385",
            "group": null,
            "extra": "mean: 18.710 usec\nrounds: 38913"
          },
          {
            "name": "bench.py::test_fib_20",
            "value": 413.84224775860645,
            "unit": "iter/sec",
            "range": "stddev: 0.00028008",
            "group": "group1",
            "extra": "mean: 2.4164 msec\nrounds: 453"
          },
          {
            "name": "bench.py::test_fib_21",
            "value": 249.1564983756105,
            "unit": "iter/sec",
            "range": "stddev: 0.00060860",
            "group": "group1",
            "extra": "mean: 4.0135 msec\nrounds: 278"
          }
        ]
      }
    ]
  }
}
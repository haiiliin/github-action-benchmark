from fib import fib
import pytest

def test_fib_10(benchmark):
    benchmark(fib, 10)

@pytest.mark.benchmark(group="mygroup")
def test_fib_20(benchmark):
    benchmark(fib, 20)
